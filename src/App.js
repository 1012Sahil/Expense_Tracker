import { Fragment } from "react";
import Expenses from "./Components/Expenses/Expenses";
import ExpenseState from "./Components/ExpenseState/ExpenseState";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";
import "./App.css";

const App = () => {
  return (
    <div>
      <h2>Expense Tracker</h2>
      <ExpenseForm />
      <ExpenseState />
      <Expenses />
    </div>
  );
};

export default App;
