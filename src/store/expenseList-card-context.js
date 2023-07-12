import React from "react";

/* allYearExpenses will store data in each index as follows:
{
    year: '2019 (say)',
    yearExpense: '5000'
} */

// t in t_year and t_id stands for transaction

const ExpenseListContext = React.createContext({
  allYearTransactions: [],
  allYearExpenses: [], // holds total expenses for all years in an array of objects
  loadExpenseList: (expenseList) => {}, // loads the entire list
  addNewTransaction: (newTransaction) => {}, // adds a single transaction after submission of form
  deleteTransaction: ( t_year, t_id) => {}, // deletes an existing expense and also deleted from firebase
});

export default ExpenseListContext;
