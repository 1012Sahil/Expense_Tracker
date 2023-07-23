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
    // console.log("NEW TRANSACTION");
    // console.log(action.newTransaction);
    let updatedExpenseAmountData = state.allYearExpenses;
    let yearOfTransaction = +action.YOT;
    let amountToBeAdded = +action.newTransaction.amount;
    if (action.newTransaction.type === "income") {
      amountToBeAdded *= -1; // as this amount reduces our expense for year.
    }
    // error is here, index returned is -1
    const existingExpenseAmountIndex = updatedExpenseAmountData.findIndex(
      (data) => data.year === yearOfTransaction
    );

    if (existingExpenseAmountIndex !== -1) {
      updatedExpenseAmountData[existingExpenseAmountIndex].expenseAmount +=
        amountToBeAdded;
      const existingExpenseListYearIndex = updatedList.findIndex(
        (data) => data.year === yearOfTransaction
      );
      updatedList[existingExpenseListYearIndex].transactions.push(
        action.newTransaction
      );
    } else {
      const newTransactionArray = [];
      newTransactionArray.push(action.newTransaction);
      // first transaction of year
      updatedList.push({
        year: yearOfTransaction,
        transactions: newTransactionArray,
      });
      updatedExpenseAmountData.push({
        year: yearOfTransaction,
        expenseAmount: +amountToBeAdded,
      });
    }
    updatedListData = {
      allYearExpenses: updatedExpenseAmountData,
      allYearTransactions: updatedList,
    };
    return updatedListData;
  }

  if (action.type === "DELETE") {
    // just counter the things we did in "ADD".
    // First study how to delete data from firebase.
    // we will have year and id of the expense to be deleted
    let updatedListData;
    const updatedList = state.allYearTransactions;
    // console.log("NEW TRANSACTION");
    // console.log(action.newTransaction);
    const updatedExpenseAmountData = state.allYearExpenses;
    const yearOfTransaction = +action.t_year;
    // console.log("YOT" + yearOfTransaction);
    let amountToBeSubtracted = 0;

    // remove from list
    const existingExpenseListYearIndex = updatedList.findIndex(
      (data) => data.year === yearOfTransaction
    );

    console.log("DELETE - ", existingExpenseListYearIndex);

    updatedList[existingExpenseListYearIndex].transactions.forEach((obj) => {
      if (obj.id === action.t_id) {
        amountToBeSubtracted = obj.amount;
        if (obj.type === "income") {
          amountToBeSubtracted *= -1;
        }
        updatedList[existingExpenseListYearIndex].transactions.splice(
          updatedList[existingExpenseListYearIndex].transactions.indexOf(obj),
          1
        );
      }
    });

    // remove from expense data
    // error is here, index returned is -1
    const existingExpenseAmountIndex = updatedExpenseAmountData.findIndex(
      (data) => data.year === yearOfTransaction
    );

    if (existingExpenseAmountIndex !== -1) {
      updatedExpenseAmountData[existingExpenseAmountIndex].expenseAmount -=
        amountToBeSubtracted;
    }
    updatedListData = {
      allYearExpenses: updatedExpenseAmountData,
      allYearTransactions: updatedList,
    };
    return updatedListData;
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
  const addNewTransaction = (YOT, newTransaction) => {
    // YOT is year of transaction
    dispatchListAction({
      type: "ADD",
      YOT: YOT,
      newTransaction: newTransaction,
    });
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
