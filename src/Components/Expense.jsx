import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Expense = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  // Select data for expense selection and set in expense form to edit
  const handleExpenseEdit = (expense) => {
    setSelectedExpense(expense);
  };

  return (
    <div>
      <ExpenseForm
        selectedExpense={selectedExpense}
        setSelectedExpense={setSelectedExpense}
      />
      <ExpenseList edit={handleExpenseEdit} />
    </div>
  );
};

export default Expense;
