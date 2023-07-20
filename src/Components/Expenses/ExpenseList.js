import { Fragment, useContext, useEffect, useState } from "react";
import Tile from "../UI/Tile";
import classes from "./ExpenseList.module.css";
import ExpenseListContext from "../../store/expenseList-card-context";

const ExpenseList = (props) => {
  const listDataCtx = useContext(ExpenseListContext);
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
  console.log("ELIST CTX");
  console.log(listDataCtx.allYearExpenses);
  console.log(listDataCtx.allYearTransactions);
  const [selectedYearExpenseList, setExpenseList] = useState([]);
  useEffect(() => {
    const filteredExpenseData = listDataCtx.allYearTransactions.filter(
      (expense) => expense.year === props.currentSelectedYear
    );
    // We fixed our use of optional chaining when our selectedYearExpenseList goes undefined until
    // we first load data to context, by making sure list is rendered after context data is first loaded
    setExpenseList(filteredExpenseData[0]?.transactions);
    //console.log("LIST");
  }, [listDataCtx, props]);
  // console.log("FROM EXPENSE LIST : ", selectedYearExpenseList?.length);

  // function to handle delete on firebase and from context API
  // As we can't directly use an async function in a reducer function's dispatch logic, we will issue a HTTP
  // request here only!
  /*const expenseDeleteHandler = async (id) => {
    listDataCtx.deleteTransaction(currentSelectedYear, id);
  };*/
  const expenseDeleteHandler = (id) => {};

  let listElements;
  if (selectedYearExpenseList?.length > 0) {
    listElements = selectedYearExpenseList.map((listElement) => (
      <Tile
        expenseId={listElement.id}
        key={listElement.id}
        expenseTitle={listElement.desc}
        expenseAmount={listElement.amount}
        expenseType={listElement.type}
        expenseCategory={listElement.category}
        onDelete={expenseDeleteHandler}
      />
    ));
  }
  // console.log("LIST ELEMENTS");
  // console.log(listElements);
  return (
    <Fragment>
      <ul className={classes.list}>{listElements}</ul>
    </Fragment>
  );
};

export default ExpenseList;
