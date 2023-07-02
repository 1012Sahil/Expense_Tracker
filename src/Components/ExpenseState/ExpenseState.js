import { useEffect, useState } from "react";
//import Select from 'react-select'
import Card from "../UI/Card";
import styles from "./ExpenseState.module.css";

const ExpenseState = (props) => {
  // use state for managing the selected year
  // on first render, display the data of latest year and if a new year is added, display that
  const [selectedYear, setSelectedYear] = useState();
  const [expenseStates, setExpenseStates] = useState([]);
  /* show only those years that are stored in the database. For this, fetch from firebase the years 
  and use array.map() function to provide the options based on the available years.
  
  By the useEffect hook, make sure that when page first renders, the expense state of most recent year 
  is shown.
  */

  useEffect(() => {
    const fetchYears = async () => {
      const response = await fetch(
        "https://expense-tracker-8d43a-default-rtdb.firebaseio.com/expenseStatus.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedExpenseStates = [];
      // in firebase, each node has a unique id and our data is nested inside this node
      let latestYear = 0;
      for (const key in responseData) {
        latestYear = Math.max(latestYear, +responseData[key].year)
        loadedExpenseStates.push({
          id: key,
          year: +responseData[key].year,
          income: +responseData[key].Income,
          balance: +responseData[key].Budget,
        });
      }

      setSelectedYear(latestYear);
      setExpenseStates(loadedExpenseStates);

      //console.log(latestYear);
      //console.log(loadedExpenseStates);
    };
    fetchYears().catch((error) => {
      // use a state to keep track of error states.
    });
  }, []);

  // this list will contain the options mapped to the available years
  const options = expenseStates.map((state) => (
    <option key={state.id} value={+state.year}>
      {state.year}
    </option>
  ));
  // console.log("BEFORE");
  // console.log(expenseStates);
  // console.log(selectedYear);


  // show data of the selected Year
  let selectedYearExpenses = expenseStates.find(
    (selectedYearStatus) => selectedYearStatus.year === selectedYear
  );
/* If on first render or if no data available, render the below */
if (expenseStates.length === 0) { // if this is not taken care of, page will return error 
  selectedYearExpenses = {balance: 0, income: 0};
}

  // console.log("AFTER");
  // console.log(expenseStates);
  // console.log(selectedYearExpenses);

  return (
    <section className={styles.state}>
      <div className={styles["year-control"]}>
        <div className={styles.balance}>
          <h3>YOUR BALANCE</h3>
          <p>{selectedYearExpenses.balance}</p>
        </div>
        <div className={styles.yearSelector}>
          <label htmlFor="year">Select Year</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(event) => {
              setSelectedYear(+event.target.value);
            }}
          >
            {options}
          </select>
        </div>
      </div>
      <div className={styles.curState}>
        <Card
          title="INCOME"
          amount={selectedYearExpenses.income}
          customId="income"
        ></Card>
        <Card title="EXPENSE" amount="2500" customId="expense"></Card>
      </div>
    </section>
  );
};

export default ExpenseState;