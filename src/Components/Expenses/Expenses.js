import classes from "./Expenses.module.css";
import ExpenseList from "./ExpenseList";
import { useEffect, useState } from "react";
// show only last 3-4 expenses unless specifically indicated
// For full history, click the button below and a modal should show the full history sorted by year
const Expenses = (props) => {
  // write code to fetch expenseList from firebase.
  // After fetching data from Firebase, store this data in Context object for transactions
  const [allExpenseData, setExpenseData] = useState([]);
  const [selectedYearTransactions, setSelYearTransactions] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        "https://expense-tracker-8d43a-default-rtdb.firebaseio.com/expenseList.json"
      );
      if (!response.ok) {
        throw new Error("ERROR! Could not fetch data");
      }
      const responseData = await response.json();
      /* the data will be stored as follows ->
      An array of objects with two keys : year and transactions, the value of year will be the year as a num
      and the value of transactions will be an array of objects, each object holding each transaction.
      */
      const loadedExpenseData = [];
      for (const year in responseData) {
        const allTransactionsOfYear = [];
        for (const key in responseData[year]) {
          const transaction = {
            id: key,
            amount: +responseData[year][key].amount,
            category: responseData[year][key].category,
            desc: responseData[year][key].desc,
            type: responseData[year][key].type,
          };
          allTransactionsOfYear.push(transaction);
        }
        const yearData = {
          year: +year,
          transactions: allTransactionsOfYear,
        };
        loadedExpenseData.push(yearData);
      }
      //console.log("LOADED EXPENSE DATA");
      //console.log(loadedExpenseData);
      setExpenseData(loadedExpenseData);
    };
    fetchExpenses().catch((error) => {});
  }, []);

   useEffect(() => {
    const filteredExpenseData = allExpenseData.filter(expense => expense.year === props.currentSelectedYear);
    setSelYearTransactions(filteredExpenseData);
  }, [allExpenseData, props.currentSelectedYear]);
  //const filteredExpenseData = allExpenseData.filter(expense => expense.year === props.currentSelectedYear);
  return (
    <div className={classes.history}>
      <div className={classes.head}>
        <h2>Transaction History</h2>
      </div>
      <hr />
      <section className={classes.list}>
        {/* Pass only the data of the year selected. */}
        {allExpenseData.length > 0 && (
          <ExpenseList
            selectedYearTransactions={selectedYearTransactions}
          />
        )}
      </section>
    </div>
  );
};

export default Expenses;
