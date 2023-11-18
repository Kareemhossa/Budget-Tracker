// ExpenseList component
import React from "react";
import { useBudget } from "../Context/BudgetContext";
import { toast } from "react-toastify";

const ExpenseList = ({ edit }) => {
  const { state, dispatch } = useBudget();

  const handleEdit = (expense) => {
    edit(expense);
  };

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
    toast.success("Successfully Delete !");
  };

  return (
    <section className="contanierlist">
      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>
                <div>
                  <button className="edit" onClick={() => handleEdit(expense)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ExpenseList;
