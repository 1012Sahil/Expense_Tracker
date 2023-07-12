import { Fragment, useEffect, useState } from "react";
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
  // The selectedYearExpenseList already possesses the selectedYear as a key-value
  const [selectedYearExpenseList, setExpenseList] = useState([]);
  /* This component is rendering two times each time, fix this */
  useEffect(() => {
    setExpenseList(props.selectedYearTransactions);
    console.log("LIST");
    console.log(props.selectedYearTransactions);
  }, [props.selectedYearTransactions]);
  // console.log("FROM EXPENSE LIST");
  // console.log(props.currentSelectedYear);
  let listElements;
  if (selectedYearExpenseList.length > 0) {
    listElements = selectedYearExpenseList[0].transactions.map(
      (listElement) => (
        <Tile
          key={listElement.id}
          expenseTitle={listElement.desc}
          expenseAmount={listElement.amount}
          expenseType={listElement.type}
        />
      )
    );
  }
  console.log("LIST ELEMENTS");
  console.log(listElements);
  return (
    <Fragment>
      <ul className={classes.list}>
        {listElements}
      </ul>
    </Fragment>
  );
};

export default ExpenseList;
