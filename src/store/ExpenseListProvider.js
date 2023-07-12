import { useReducer } from "react";
import ExpenseListContext from "./expenseList-card-context";

// Default state
const defaultListData = {
  allYearTransactions: [],
  allYearExpenses: [],
};

// Reducer function for the useReducer hook
// The state parameter just keeps track of the last snapshot.
const listDataReducer = (state, action) => {
  if (action.type === "LOAD") {
    // here state is empty at first and this is only executed on first render
    const newList = [...action.expenseList];
    let expenseAmountForEachYear = [];
    /* If expenseAmount is positive, we spent money overall. If it is negative, we gained money in 
    month instead. The latter is highly unlikely, but may happen.*/
    for (const ind in newList) {
      const year = +newList[ind].year;
      let expenseAmount = 0;
      for (const t_id in newList[ind].transactions) {
        if (newList[ind].transactions[t_id].type === "income") {
          expenseAmount -= newList[ind].transactions[t_id].amount;
        } else expenseAmount += newList[ind].transactions[t_id].amount;
      }
      expenseAmountForEachYear.push({
        year: year,
        expenseAmount: expenseAmount,
      });
    }
    return {
      allYearTransactions: newList,
      allYearExpenses: expenseAmountForEachYear,
    };
  }

  if (action.type === "ADD") {
    // Either the transaction belongs to an existing year, or it is the first transaction of a year.
    let updatedListData;
    let updatedList = state.allYearTransactions;
    let updatedExpenseAmountData = state.allYearExpenses;
    let yearOfTransaction = action.newTransaction.year;
    let amountToBeAdded = action.newTransaction.amount;
    if (action.newTransaction.type === "income") {
      amountToBeAdded *= -1; // as this amount reduces our expense for year.
    }

    const existingExpenseAmountIndex = state.allYearExpenses.findIndex(
      (data) => data.year === yearOfTransaction
    );

    if (existingExpenseAmountIndex) {
      updatedExpenseAmountData[existingExpenseAmountIndex].expenseAmount +=
        amountToBeAdded;
      const existingExpenseListYearIndex = updatedList.findIndex(
        (data) => data.year === yearOfTransaction
      );
      updatedList[existingExpenseListYearIndex].transactions.push(
        action.newTransaction
      );
    } else {
      // first transaction of year
      updatedList.push(action.newTransaction);
      updatedExpenseAmountData.push({
        year: yearOfTransaction,
        expenseAmount: amountToBeAdded,
      });
    }
    updatedListData = {
      allYearExpenses: updatedList,
      allYearTransactions: updatedExpenseAmountData,
    };
    return updatedListData;
  }

  if (action.type === "DELETE") {
    // First study how to delete data from firebase.
    // just counter the things we did in "ADD", but also delete data from Firebase.
  }
  return defaultListData;
};

const ExpenseListProvider = (props) => {
  const [loadedTransactionData, dispatchListAction] = useReducer(
    listDataReducer,
    defaultListData
  );

  // Will load the data to context object on first fetch from Firebase and also calculate
  // expense amount for each year
  // expenseList is an array of objects
  const initializeExpenseData = (expenseList) => {
    dispatchListAction({ type: "LOAD", expenseList: expenseList });
  };

  // Will add a new transaction for a particular year so as to prevent refetching from Firebase.
  // newTransaction will be an object holding transaction data, this will have been posted to Firebase also.
  const addNewTransaction = (newTransaction) => {
    dispatchListAction({ type: "ADD", newTransaction: newTransaction });
  };

  // Will delete an existing transaction from list and also from firebase (A challenge)
  const deleteSelectedTransaction = (t_year, t_id) => {
    dispatchListAction({ type: "DELETE", t_year: t_year, t_id: t_id });
  };

  // add proper function pointers after reducer is built
  const expenseListContext = {
    allYearTransactions: loadedTransactionData.allYearTransactions,
    allYearExpenses: loadedTransactionData.allYearExpenses,
    loadExpenseList: initializeExpenseData,
    addNewTransaction: addNewTransaction,
    deleteTransaction: deleteSelectedTransaction,
  };
  return (
    <ExpenseListContext.Provider value={expenseListContext}>
      {props.children}
    </ExpenseListContext.Provider>
  );
};

export default ExpenseListProvider;
