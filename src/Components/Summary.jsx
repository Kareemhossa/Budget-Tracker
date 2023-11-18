// SummaryView.js
import React from "react";
import { useBudget } from "../Context/BudgetContext";

const Summary = () => {
  const { state } = useBudget();
  //  total expenses
  const totalBudget = state.budget;
  const totalExpense = state.expenses.reduce(
    (total, expenses) => total + expenses.amount,
    0
  );

  const remainingBudget = totalBudget - totalExpense;

  return (
    <section className="containersummary">
      {/**<h2>Summary</h2>*/}
      <div className="card">
        <div className="cardBox defult">
          <p> $ {totalBudget}</p>
          <p>Total Budget</p>
        </div>
        <div className="cardBox primary">
          <p> ${totalExpense}</p>
          <p>Total Expenses</p>
        </div>
        <div className="cardBox warning">
          <p>${remainingBudget}</p>
          <p>Remaining Budget</p>
        </div>
      </div>
    </section>
  );
};

export default Summary;
