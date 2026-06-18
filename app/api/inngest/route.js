import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlerts, generateDailyReports, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransactions } from "@/lib/inngest/functions";

// Expose Inngest functions to the Inngest dev server
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkBudgetAlerts,
    triggerRecurringTransactions,
    processRecurringTransaction,
    generateMonthlyReports,
    generateDailyReports,
  ],
});