import { Fragment } from "react";
import Tile from "../UI/Tile";
import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
  return (
    <Fragment>
      <ul className={classes.list}>
        <Tile expenseTitle="Groceries" expenseAmount="5"></Tile>
        <Tile expenseTitle="Groceries" expenseAmount="5"></Tile>
        <Tile expenseTitle="Groceries" expenseAmount="5"></Tile>
        <Tile expenseTitle="Groceries" expenseAmount="5"></Tile>
      </ul>
    </Fragment>
  );
};

export default ExpenseList;
