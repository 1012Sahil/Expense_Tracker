import { Fragment } from "react";
import Tile from "../UI/Tile";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  // Write code for deletion of transactions in a year.
  // Only render the transaction of a particular year.

  /* To get the selected year, we are going to use prop drilling and two-way binding instead of context
  as we only are going to deal with this one small variable. It is also a nice way of showing different
  concepts of React and showing my knowledge. We will use a variable and pass as follows : 
  
  App -> ExpenseState -> assign value and complete two-way binding -> App
                                                                    /    \
                                                                   /      \
                                                           PieChart    Expenses -> ExpenseList
   
  */
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
