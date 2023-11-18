import { useReducer, useEffect } from "react";

const initialState = {
  budget: 0,
  expenses: [
    {
      id: 1,
      amount: 0,
      category: "Example Category",
      date: "2023-01-01",
      description: "Example description",
    },
  ],
};

// reduceer function used to update /delete /add  the state based on the action
const budgetReducer = (state, action) => {
  switch (action.type) {
    case "ADD_INCOME":
      return {
        ...state,
        budget: state.budget + action.payload.amount,
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "EDIT_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id
            ? { ...expense, ...action.payload.updatedExpense }
            : expense
        ),
      };
    case "CLEAR":
      return {
        budget: 0,
        expenses: [],
      };
    default:
      return state;
  }
};

// custom hook to handle update the state
export const useBudgetReducer = () => {
  // the key in localStorage
  const localStorageKey = "budgetAppData";
  // Load data from local storage or use initial state
  const storedState =
    JSON.parse(localStorage.getItem(localStorageKey)) || initialState;
  const [state, dispatch] = useReducer(budgetReducer, storedState);

  // Save data to local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};
