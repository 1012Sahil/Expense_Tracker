import { useEffect, useState, useContext } from "react";
import classes from "./Expenses.module.css";
import ExpenseList from "./ExpenseList";
import ExpenseListContext from "../../store/expenseList-card-context";

const Expenses = (props) => {
  // write code to fetch expenseList from firebase.
  // After fetching data from Firebase, store this data in Context object for transactions
  const [allExpenseData, setExpenseData] = useState([]);
  //const [selectedYearTransactions, setSelYearTransactions] = useState([]);

  // Implement Context functionalities to store expense data.
  const listDataCtx = useContext(ExpenseListContext);

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
      setExpenseData(loadedExpenseData);
    };
    fetchExpenses().catch((error) => {
      // console.log("FETCH ERROR");
      // console.log(error);
    });
  }, []);

  /* We are using the useEffect hook to wrap our call to loadExpenseList fn in ExpenseListProvider. 
  We have combined this with the previous useEffect that managed the selectedYearTransactions, but 
  we don't need this anymore as we can just use our context object to manage this! 
  The code is giving us a warning that listDataCtx is not added as a dependency, but if we do that, 
  we end up creating an infinite loop that renders the component infinitely. So, we are ignoring the 
  warning as the current behaviour is what we require.*/
  useEffect(() => {
    if (allExpenseData.length !== 0) {
      // console.log("listDataCTX");
      // console.log(allExpenseData);
      listDataCtx.loadExpenseList(allExpenseData);
      // console.log(listDataCtx.allYearExpenses);
      // console.log(listDataCtx.allYearTransactions);
    }
  }, [allExpenseData]);
  // console.log("listDataCTX2");
  // console.log(listDataCtx.allYearExpenses);
  // console.log(listDataCtx.allYearTransactions);

  /*useEffect(() => {}, [allExpenseData, ]);*/
  //const filteredExpenseData = allExpenseData.filter(expense => expense.year === props.currentSelectedYear);
  return (
    <div className={classes.history}>
      <div className={classes.head}>
        <h2>Transaction History</h2>
      </div>
      <hr />
      <section className={classes.list}>
        {/* Pass only the data of the year selected. */}
        {listDataCtx.allYearTransactions.length > 0 &&
          listDataCtx.allYearExpenses.length > 0 && (
            <ExpenseList currentSelectedYear={props.currentSelectedYear} />
          )}
      </section>
    </div>
  );
};

export default Expenses;
