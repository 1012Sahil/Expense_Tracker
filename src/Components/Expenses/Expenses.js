import { Fragment } from "react";
import classes from "./Expenses.module.css";
import ExpenseList from "./ExpenseList";
// show only last 3-4 expenses unless specifically indicated
// For full history, click the button below and a modal should show the full history sorted by year
const Expenses = (props) => {
  return (
    <Fragment>
      <div className={classes.history}>
      <h2>Recent Transaction History</h2>
      <button type="button">Show Full History</button>
        <hr/>
      </div>
      <section>
        <ExpenseList />
      </section>
    </Fragment>
  );
};

export default Expenses;
