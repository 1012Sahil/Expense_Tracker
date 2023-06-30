import { Fragment } from "react";
import Expenses from "./Components/Expenses/Expenses";
import ExpenseState from "./Components/ExpenseState/ExpenseState";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";
import PieChart from './Components/VisualRep/PieChart';
import "./App.css";

// show the ExpenseForm only when add new transaction button is clicked

const App = () => {
  return (
    <Fragment>
      <h2>Expense Tracker</h2>
      <section className="main">
        <div className="left">
          <PieChart></PieChart>
        </div>
        <div className="right">
          <button type="button" id="form-control">ADD NEW TRANSACTION</button>
      <ExpenseForm />
      <ExpenseState />
      <Expenses />
    </div>
      </section>
      
    </Fragment>
    
  );
};

export default App;
