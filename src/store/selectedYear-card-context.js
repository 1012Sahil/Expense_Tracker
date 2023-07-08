import React from "react";

// we only do this so that we can use VSCODE's auto fill code feature, which requires us to declare
// what this context might contain

/* If balance/income is declared for a new year, add that year's expenseState in this context.

We allow to update the balance and income of a particular year's state, but this feature
will be built at the last of all other functionalities and may well be skipped if project
gets complicated.*/
const YearContext = React.createContext({
  expenseStates: [], // an array of objects will store all states
  loadYears: (allExpenseStates) => {}, // the state will be stored as an object 
  // updateYearState: (balance, income) => {},
});

export default YearContext;
