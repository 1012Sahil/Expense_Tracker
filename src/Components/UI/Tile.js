import { useContext } from "react";
import classes from "./Tile.module.css";
import ExpenseListContext from "../../store/expenseList-card-context";

const Tile = (props) => {
  const listDataCtx = useContext(ExpenseListContext);
  // function to handle delete on firebase and from context API
  // As we can't directly use an async function in a reducer function's dispatch logic, we will issue a HTTP
  // request here only!
  const deleteExpense = async (id) => {
    console.log("YEAR PASSED TO DELETE" + props.expenseYear);
    listDataCtx.deleteTransaction(props.expenseYear, id);
    console.log("FETCH CALLED" + id + props.expenseYear);
    const response = await fetch(
      `https://expense-tracker-8d43a-default-rtdb.firebaseio.com/expenseList/${props.expenseYear}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };

  const expenseDeleteHandler = (id) => {
    deleteExpense(id).catch((error) => {
      console.log("DELETE OPERATION FAILED!");
    });
  };

  // The border right color should indicate whether the transaction was an expense or an income one.
  const tileClasses =
    props.expenseType === "income"
      ? `${classes.tile} ${classes.income}`
      : `${classes.tile}`;
  return (
    <div className={`${tileClasses}`}>
      <span
        onClick={() => {
          expenseDeleteHandler(props.expenseId);
        }}
      >
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </span>
      <div>
        <p className={classes.title}>{props.expenseTitle}</p>
        <p className={classes.category}>{props.expenseCategory}</p>
      </div>
      <p className={classes.amount}>${props.expenseAmount}</p>
    </div>
  );
};

export default Tile;
