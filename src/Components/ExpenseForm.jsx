import React, { useState, useEffect } from "react";
import { useBudget } from "../Context/BudgetContext";
import { toast } from "react-toastify";

const ExpenseForm = ({ selectedExpense, setSelectedExpense }) => {
  const { dispatch } = useBudget();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    if (selectedExpense) {
      setAmount(selectedExpense.amount);
      setCategory(selectedExpense.category);
      setDate(selectedExpense.date);
      setDescription(selectedExpense.description);
      setType(selectedExpense.type || "expense");
    } else {
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setType("expense");
    }
  }, [selectedExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedExpense) {
      // dispatch action to edit expense from selected data from the list
      if (!amount || !category || !date || !description) {
        toast("Please fill in all required fields");
        return;
      }
      dispatch({
        type: "EDIT_EXPENSE",
        payload: {
          id: selectedExpense.id,
          updatedExpense: {
            amount: parseFloat(amount),
            category,
            date,
            description,
            type,
          },
        },
      });
      toast.success("Successfully edited!");
      setSelectedExpense(null);
    } else {
      if (type === "expense") {
        if (!amount || !category || !date || !description) {
          toast("Please fill in all required fields");
          return;
        }
        // dispatch action when user slected expense
        dispatch({
          type: "ADD_EXPENSE",
          payload: {
            id: Date.now(),
            amount: parseFloat(amount),
            category,
            date,
            description,
            type,
          },
        });
        toast.success("Successfully added!");
      } else if (type === "income") {
        if (!amount) {
          toast("Please fill amount fields");
          return;
        }
        // dispatch action when user slected income
        dispatch({
          type: "ADD_INCOME",
          payload: {
            amount: parseFloat(amount),
            type,
          },
        });
        toast.success("Successfully added!");
      }
    }
    // Reset form fields
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setType("expense");
  };

  const handleCancel = () => {
    // if adding or edited
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setType("expense");
    setSelectedExpense(null);
  };

  const handleClear = () => {
    // dispatch action when user delete all data
    dispatch({
      type: "CLEAR",
    });
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setType("expense");
    setSelectedExpense(null);
    toast.success("Successfully Clear !");
  };

  return (
    <section className="containerForm">
      <form onSubmit={handleSubmit} method="POST">
        <div className="form-row">
          {type === "expense" && (
            <div className="form-row">
              <label>
                Amount
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>

              <label>
                Category
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>

              <label>
                Date
                <input
                  type="date"
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <label>
                Description
                <input
                  type="text"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
          )}

          {type === "income" && (
            <div className="amount">
              <label>
                Amount
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
            </div>
          )}
        </div>

        <div className="button-row">
          <button type="submit">{selectedExpense ? "Update " : "Add "}</button>
          <button type="button" className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="clear" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="radio-row">
          <label>
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            Income
          </label>
        </div>
      </form>
    </section>
  );
};

export default ExpenseForm;
