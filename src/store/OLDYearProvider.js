import YearContext from "./selectedYear-card-context";
import { useReducer } from "react";

const defaultState = {
  expenseStates: [],
};

// The reducer function for the useReducer Hook user below
const yearReducer = (state, action) => {
  // We want a brand new array instead of editing the original one as react might not know about
  // the change in memory we would do.
  if (action.type === "ADD") {
    let updatedStates;
    /* If the year provided already exists with us, we will simply update this to new State 
    as we will assume the user intends to do this! Later, I can determine whether I want it handled 
    separately or not, whether to show an error fo trying to add an existing error. */
    // Check if the year already exists or not
    const existingYearStateIndex = state.expenseStates.findIndex(
      (yearState) => yearState.year === +action.newState.year
    );
    console.log("INDEX");
    console.log(existingYearStateIndex);

    // If year is already part of expenseStates, we will get a value, otherwise null!
    const existingYearState = state.expenseStates[existingYearStateIndex];
    console.log("EXISTING YS");
    console.log(existingYearState);

    if (existingYearState) {
      // year exists already, update to new info
      //existingYearState.id = action.newState.id;
      const updatedState = {
        ...existingYearState,
        income: +action.newState.income,
        balance: +action.newState.balance,
      };

      console.log("IF - UpdatedSTates");
      //existingYearState.income = action.newState.income;
      //existingYearState.balance = action.newState.balance;
      // updated state will have all prevous year data but this year data is updated
      updatedStates = [...state.expenseStates];
      updatedStates[existingYearStateIndex] = updatedState;
    } else {
      console.log("ELSE - REDUCER");
      console.log(action.newState);
      // a new year indeed
      updatedStates = state.expenseStates.concat(action.newState);
      console.log("ELSE - UpdatedSTates");
      console.log(updatedStates);
    }
    return {
      expenseStates: updatedStates,
    };
  }
  // in case of wrong action, return the default state,
  // something which will never happen here as we define the action to be taken
  console.log("AFTER ADD ACTION");
  return defaultState;
};

const YearProvider = (props) => {
  const [allYearStates, dispatchStateAction] = useReducer(
    yearReducer,
    defaultState
  );
  // eState will be an object which holds the expenseState of the year
  const addExpenseStateHandler = (newState) => {
    // Will Add a new year along with its balance and income
    // The dispatch function will execute the reducer function passing these as arguments.
    console.log("NEW STATE");
    console.log(newState);
    dispatchStateAction({ type: "ADD", newState: newState });
  };
  // This will be used to trigger all the functions and update our states
  const yearContext = {
    expenseStates: allYearStates.expenseStates,
    addYear: addExpenseStateHandler,
  };
  return (
    <YearContext.Provider value={yearContext}>
      {props.children}
    </YearContext.Provider>
  );
};

export default YearProvider;
