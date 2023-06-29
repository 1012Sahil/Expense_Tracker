import { Fragment } from "react";
import classes from "./Expenses.module.css";
import ExpenseList from "./ExpenseList";
// show only last 3-4 expenses unless specifically indicated
const Expenses = (props) => {
  return (
    <Fragment>
      <div className={classes.history}>
      <h2>Recent Transaction History</h2>
        <hr/>
      </div>
        
      <section>
        <ExpenseList />
      </section>
    </Fragment>
  );
};

export default Expenses;
