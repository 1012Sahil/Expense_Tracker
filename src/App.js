import { useState } from "react";
import "./App.css";
import Expenses from "./Components/Expenses/Expenses";
import ExpenseState from "./Components/ExpenseState/ExpenseState";
import YearProvider from "./store/YearProvider";
import ExpenseListProvider from "./store/ExpenseListProvider";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";
import PieChart from "./Components/VisualRep/PieChart";
import ExpenseGraph from "./Components/VisualRep/ExpenseGraph";

const App = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [currentSelectedYear, setCurrentYear] = useState(null);
  // show the ExpenseForm only when add new transaction button is clicked
  const formVisibilityHandler = (event) => {
    setFormVisibility((prevState) => {
      return !prevState;
    });
  };

  const selectedYearAssigner = (year) => {
    setCurrentYear(year);
  };

  const submitTransactionHandler = async (formData) => {
    /* Whenever a new transaction is added, add it to the context object so we don't need to reload the page or fetch details 
  from Firebase repeatedely. */
    // If a new year is added that previously didn't exist, we used string literals for that also
    await fetch(
      `https://expense-tracker-8d43a-default-rtdb.firebaseio.com/expenseList/${formData.year}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: +formData.amount,
          desc: formData.desc,
          category: formData.category,
          type: formData.type,
        }),
      }
    );
  };

  // console.log("FROM APP JS");
  // console.log(currentSelectedYear);

  /* When React renders a component that subscribes to this Context object it will read the current context
value from the closest matching Provider above it in the tree. */
  return (
    <ExpenseListProvider>
    <YearProvider>
        <h1>Money Minder</h1>
        <section className="main">
          <div className="left">
            <PieChart currentSelectedYear={currentSelectedYear}></PieChart>
            <ExpenseGraph></ExpenseGraph>
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
            <ExpenseState onYearSelect={selectedYearAssigner} />
            <Expenses currentSelectedYear={currentSelectedYear} />
          </div>
        </section>
    </YearProvider>
    </ExpenseListProvider>
  );
};

export default App;
