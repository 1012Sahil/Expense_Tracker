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

  const submitTransactionHandler = async (formData) => {
    await fetch(
      `https://expense-tracker-8d43a-default-rtdb.firebaseio.com/expenseList/${formData.year}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: formData.amount,
          desc: formData.desc,
          category: formData.category,
          type: formData.type,
        }),
      }
    );
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
          {formVisibility && (
            <ExpenseForm
              onClose={formVisibilityHandler}
              onConfirm={submitTransactionHandler}
            />
          )}
          <ExpenseState />
          <Expenses />
        </div>
      </section>
    </Fragment>
  );
};

export default App;
