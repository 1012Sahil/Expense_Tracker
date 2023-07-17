import { useEffect, useState, useContext, Fragment } from "react";
import Card from "../UI/Card";
import styles from "./ExpenseState.module.css";
import YearContext from "../../store/selectedYear-card-context";
import ExpenseListContext from "../../store/expenseList-card-context";

const ExpenseState = (props) => {
  // use state for managing the selected year
  // on first render, display the data of latest year and if a new year is added, display that
  const [selectedYear, setSelectedYear] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [yearData, setYearData] = useState([]);
  /* show only those years that are stored in the database. For this, fetch from firebase the years 
  and use array.map() function to provide the options based on the available years.

  By the useEffect hook, make sure that when page first renders, the expense state of most recent year 
  is shown.
  */
  // Using the Context API, I'm storing all the year data into a context object so that I
  // can use it in other components without prop drilling
  const yearCtx = useContext(YearContext);
  const listDataCtx = useContext(ExpenseListContext);

  useEffect(() => {
    const fetchYears = async () => {
      const response = await fetch(
        "https://expense-tracker-8d43a-default-rtdb.firebaseio.com/expenseStatus.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setIsLoading(false);
      const loadedExpenseStates = [];
      // in firebase, each node has a unique id and our data is nested inside this node
      let latestYear = 0;
      for (const key in responseData) {
        latestYear = Math.max(latestYear, +responseData[key].year);
        loadedExpenseStates.push({
          id: key,
          year: +responseData[key].year,
          income: +responseData[key].Income,
          balance: +responseData[key].Budget,
        });
      }
      setYearData(loadedExpenseStates);
      setSelectedYear(latestYear);
    };
    fetchYears().catch((error) => {
      // use a state to keep track of error states.
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  /* One of the most difficult steps till yet was to send data to the context object correctly from a 
component that renders due to state changes and useEffect after first fetching data from Firebase. 
We will first set the yearData and only after it is set, we will provide data to the yearCtx in another
useEffect hook.*/
  useEffect(() => {
    if (yearData.length !== 0) {
      // console.log("YEAR CTX");
      yearCtx.loadYears(yearData);
      // console.log(yearCtx.expenseStates);
    }
  }, [yearData, yearCtx]);

  // send the selected year to App.js
  useEffect(() => {
    props.onYearSelect(selectedYear);
  }, [props, selectedYear]);

  // /* If on first render or if no data available, render the below */
  // if (yearData.length === 0) {
  //   // if this is not taken care of, page will return error as selected years will be left null
  //   // and selectedYearExpenses is not defined properly
  //   return <p>No Data Found!</p>;
  // }

  // first sort year data according to year
  const sortedYearData = yearData.sort((a, b) => a.year - b.year);

  // this list will contain the options mapped to the available years
  const options = sortedYearData.map((state) => (
    <option key={state.id} value={+state.year}>
      {state.year}
    </option>
  ));
  console.log(yearData);
  console.log(selectedYear);

  // show data of the selected Year
  let selectedYearExpenses = yearData.find(
    (selectedYearStatus) => selectedYearStatus.year === selectedYear
  );

  /* The below assumes that the feature to add a new year status is not implemented. The code may need 
  to be modified if we add that functionality */
  let expensesAmountForYear;
  if (listDataCtx.allYearExpenses.length > 0) {
    const expenseDataForSelectedYear = listDataCtx.allYearExpenses.findIndex(
      (data) => data.year === selectedYear
    );
    expensesAmountForYear =
      listDataCtx.allYearExpenses[expenseDataForSelectedYear].expenseAmount;
  }

  // console.log("AFTER");
  // console.log(expenseStates);
  // console.log(selectedYearExpenses);

  const componentData = (
    <Fragment>
      <div className={styles["year-control"]}>
        <div className={styles.balance}>
          <h3>YOUR BALANCE</h3>
          {/* We are using optional chaining below so that our code doesn't encounter an error. Basically, 
          we only read the balance and income properties of selectedYearExpenses iff they exist.
          If we hadn't use optional chaining, an error would have occured - indicating that income 
          or balance couldn't be read! '?.' optional chaining is done by us this ? */}
          <p>${selectedYearExpenses?.balance}</p>
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
      {error && <p>{error}</p>}
      <div className={styles.curState}>
        <Card
          title="INCOME"
          amount={selectedYearExpenses?.income}
          customId="income"
        ></Card>
        <Card
          title="EXPENSE"
          amount={expensesAmountForYear}
          customId="expense"
        ></Card>
      </div>
    </Fragment>
  );

  return (
    <section className={styles.state}>
      {!isLoading && yearData.length !== 0 && componentData}
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {!isLoading && yearData.length === 0 && <p>No Data Found!</p>}
    </section>
  );
};

export default ExpenseState;
