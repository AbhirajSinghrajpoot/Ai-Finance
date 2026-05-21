"use client";

import { AddTransactionForm } from "../_components/transaction-form";

export default function ClientTransactionPage({ accounts, categories, editMode, initialData }) {
  return (
    <AddTransactionForm
      accounts={accounts}
      categories={categories}
      editMode={editMode}
      initialData={initialData}
    />
  );
}
