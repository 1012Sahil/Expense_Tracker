import classes from "./Expenses.module.css";
import ExpenseList from "./ExpenseList";
// show only last 3-4 expenses unless specifically indicated
// For full history, click the button below and a modal should show the full history sorted by year
const Expenses = (props) => {
  // write code to fetch expenseList from firebase.

  return (
    <div className={classes.history}>
      <div className={classes.head}>
        <h2>Recent Transaction History</h2>
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <hr />
      <section className={classes.list}>
        <ExpenseList />
      </section>
    </div>
  );
};

export default Expenses;