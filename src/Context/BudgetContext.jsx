import { createContext, useContext } from "react";
import { useBudgetReducer } from "./BudgetReducer";

//context components use to get the state
const BudgetContext = createContext();

// Context provider component is wraps the components we want to give access to the state
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useBudgetReducer();
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

// custom hook to consume the context
export const useBudget = () => {
  return useContext(BudgetContext);
};
