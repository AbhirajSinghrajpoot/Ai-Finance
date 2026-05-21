import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

// Returns computed budget usage and reasons why an alert would or would not send.
export async function GET() {
  try {
    const budgets = await db.budget.findMany({
      include: {
        user: {
          include: {
            accounts: { where: { isDefault: true } },
          },
        },
      },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const results = [];

    for (const budget of budgets) {
      const defaultAccount = budget?.user?.accounts?.[0];
      const summary = {
        budgetId: budget.id,
        userId: budget.userId,
        userEmail: budget?.user?.email || null,
        hasDefaultAccount: Boolean(defaultAccount),
        defaultAccountId: defaultAccount?.id || null,
        budgetAmount: budget.amount?.toNumber ? budget.amount.toNumber() : Number(budget.amount || 0),
        totalExpenses: 0,
        percentageUsed: 0,
        lastAlertSent: budget.lastAlertSent,
        canSend: false,
        reasons: [],
      };

      if (!defaultAccount) {
        summary.reasons.push("No default account for user");
        results.push(summary);
        continue;
      }

      const expenses = await db.transaction.aggregate({
        where: {
          userId: budget.userId,
          accountId: defaultAccount.id,
          type: "EXPENSE",
          date: { gte: startOfMonth, lte: endOfMonth },
        },
        _sum: { amount: true },
      });

      summary.totalExpenses = expenses._sum.amount ? expenses._sum.amount.toNumber() : 0;
      summary.percentageUsed = summary.budgetAmount > 0
        ? (summary.totalExpenses / summary.budgetAmount) * 100
        : 0;

      if (summary.budgetAmount <= 0) {
        summary.reasons.push("Budget amount is zero or invalid");
      }

      if (summary.percentageUsed < 85) {
        summary.reasons.push("Below 85% threshold");
      }

      if (
        budget.lastAlertSent &&
        budget.lastAlertSent.getMonth() === now.getMonth() &&
        budget.lastAlertSent.getFullYear() === now.getFullYear()
      ) {
        summary.reasons.push("Alert already sent this month");
      }

      summary.canSend =
        summary.budgetAmount > 0 &&
        summary.percentageUsed >= 85 &&
        summary.userEmail &&
        !summary.reasons.includes("Alert already sent this month");

      results.push(summary);
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error("Budget status debug failed:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
