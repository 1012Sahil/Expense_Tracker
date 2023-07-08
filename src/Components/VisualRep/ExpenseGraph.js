import { Fragment, useEffect, useState } from "react";

const ExpenseGraph = (props) => {
  /* Extract the expense list in this file and store the entire list in ExpenseList-card-context for
further use to render last transactions added in that year and also to the pieChart.js for rendering
that year's expense Chart.*/
  // will store expense list after importing from firebase
  const [importedExpenseList, setExpenseList] = useState([]);
  useEffect(() => {
    const fetchExpenseList = async () => {
      const response = await fetch(
        "https://expense-tracker-8d43a-default-rtdb.firebaseio.com/expenseList.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedExpenseList = {};
      // in firebase, each node has a unique id and our data is nested inside this node
      // here key denotes the year
      for (const key in responseData) {
        // each year we have some transactions, each assigned a id, that's how firebase stores data
        const transactionsForYear = [];
        for (const transactionId in responseData[key]) {
          const transaction = {
            id: transactionId, // need id to assign a unique key to react components
            desc: responseData[key][transactionId].desc,
            category: responseData[key][transactionId].category,
            amount: responseData[key][transactionId].amount,
            type: responseData[key][transactionId].type,
          };
          transactionsForYear.push(transaction);
        }
        loadedExpenseList[key] = transactionsForYear;
      }
      //console.log(loadedExpenseList);
      // use context API to use this list in other components to avoid props drilling
      setExpenseList(loadedExpenseList);
    };
    fetchExpenseList().catch((error) => {
      // use a state to keep track of error states.
    });
  }, []);

  return <Fragment></Fragment>;
};

export default ExpenseGraph;
