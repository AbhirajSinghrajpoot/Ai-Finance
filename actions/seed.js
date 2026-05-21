"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

// Helper to generate random amount within a range
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to get random category with amount
function getRandomCategory(type) {
  const CATEGORIES = {
    INCOME: [
      { name: "salary", range: [5000, 8000] },
      { name: "freelance", range: [1000, 3000] },
      { name: "investments", range: [500, 2000] },
      { name: "other-income", range: [100, 1000] },
    ],
    EXPENSE: [
      { name: "housing", range: [1000, 2000] },
      { name: "transportation", range: [100, 500] },
      { name: "groceries", range: [200, 600] },
      { name: "utilities", range: [100, 300] },
      { name: "entertainment", range: [50, 200] },
      { name: "food", range: [50, 150] },
      { name: "shopping", range: [100, 500] },
      { name: "healthcare", range: [100, 1000] },
      { name: "education", range: [200, 1000] },
      { name: "travel", range: [500, 2000] },
    ],
  };
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions(clerkUserId, accountId) {
  try {
    // Get user from Clerk ID
    let user = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return { success: false, error: "User not found. Please sign in first." };
    }

    // Get account - either use provided accountId or find first account
    let account;
    
    if (accountId) {
      // Use provided account ID - don't check userId, just get the account
      account = await db.account.findUnique({
        where: { id: accountId },
      });
      
      if (!account) {
        return { success: false, error: `Account with ID ${accountId} not found in database` };
      }
      
      console.log("✓ Found account:", account.id, "for user:", user.id);
    } else {
      // Find first account of user
      account = await db.account.findFirst({
        where: { userId: user.id },
      });

      if (!account) {
        account = await db.account.create({
          data: {
            name: "My First Account",
            type: "CURRENT",
            balance: 0,
            isDefault: true,
            userId: user.id,
          },
        });
      }
    }

    console.log("✓ Using account:", account.id);

    // Generate 90 days of transactions
    const transactions = [];
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Generate 1-3 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        // 40% chance of income, 60% chance of expense
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${
            type === "INCOME" ? "Received" : "Paid for"
          } ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: account.userId,
          accountId: account.id,
          createdAt: date,
          updatedAt: date,
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    console.log(`Processing ${transactions.length} transactions...`);

    // Insert transactions in batches and update account balance
    await db.$transaction(async (tx) => {
      // Clear existing transactions
      await tx.transaction.deleteMany({
        where: { accountId: account.id },
      });

      console.log("✓ Cleared existing transactions");

      // Insert new transactions
      await tx.transaction.createMany({
        data: transactions,
      });

      console.log("✓ Inserted new transactions");

      // Update account balance
      await tx.account.update({
        where: { id: account.id },
        data: { balance: totalBalance },
      });

      console.log("✓ Updated account balance");
    });

    return {
      success: true,
      message: `✓ Created ${transactions.length} transactions with total balance: ${totalBalance}`,
      data: {
        userId: account.userId,
        accountId: account.id,
        transactionCount: transactions.length,
        finalBalance: totalBalance,
      },
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: error.message };
  }
}