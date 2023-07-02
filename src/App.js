import { Fragment, useState } from "react";
import Expenses from "./Components/Expenses/Expenses";
import ExpenseState from "./Components/ExpenseState/ExpenseState";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";
import PieChart from "./Components/VisualRep/PieChart";
import "./App.css";

const App = () => {
  const [formVisibility, setFormVisibility] = useState(false);

  // show the ExpenseForm only when add new transaction button is clicked
  const formVisibilityHandler = (event) => {
    setFormVisibility((prevState) => {
      return !prevState;
    });
  };
  return (
    <Fragment>
      <h2>Expense Tracker</h2>
      <section className="main">
        <div className="left">
          <PieChart></PieChart>
        </div>
        <div className="right">
          {!formVisibility && (
            <button
              type="button"
              id="form-control"
              onClick={formVisibilityHandler}
            >
              ADD NEW TRANSACTION
            </button>
          )}
          {formVisibility && <ExpenseForm onClose={formVisibilityHandler} />}
          <ExpenseState />
          <Expenses />
        </div>
      </section>
    </Fragment>
  );
};

export default App;
