import classes from "./Expenses.module.css";
import ExpenseList from "./ExpenseList";
// show only last 3-4 expenses unless specifically indicated
// For full history, click the button below and a modal should show the full history sorted by year
const Expenses = (props) => {
  return (
    <div className={classes.history}>
      <div className={classes.head}>
        <h2>Recent Transaction History</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
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
