import { useContext } from "react";
import { ResponsiveLine } from "@nivo/line";
import ExpenseListContext from "../../store/expenseList-card-context";
import YearContext from "../../store/selectedYear-card-context";
import classes from "./ExpenseGraph.module.css";

const ExpenseGraph = (props) => {
  /* Use the expense data from context API to show a line chart. The line chart will show each year's
  Expense, Income, Balance and also whether we went under or over budget!
  */
  // const [importedExpenseList, setExpenseList] = useState([]);
  const listDataCtx = useContext(ExpenseListContext);
  const yearCtx = useContext(YearContext);
  const t_amountData = listDataCtx.allYearExpenses;
  const t_listData = listDataCtx.allYearTransactions;

  if (t_amountData.length < 0 || yearCtx.expenseStates.length < 0) {
    return;
  }

  const lineChartData = [];
  // Will store surplus/loss in a map
  // set to store years for which atleast one expense is available
  const expenseYearSet = new Set();
  const surplusCalc = new Map();
  /* Make sure that you don't show data in line chart of those years that doesn't have any expenses. */

  // The Expense Data
  const expenseAmountData = [];
  for (const expense of t_amountData) {
    const existingExpenseListYearIndex = t_listData.findIndex(
      (data) => data.year === expense.year
    );
    // if no transaction exists for this year, don't
    if (t_listData[existingExpenseListYearIndex].transactions.length === 0) {
      continue;
    }
    expenseYearSet.add(expense.year);
    expenseAmountData.push({
      x: expense.year,
      y: expense.expenseAmount,
    });
    // first I will add the expense in negative, then add the balance to it
    surplusCalc.set(expense.year, -expense.expenseAmount);
  }
  // sort expense data
  expenseAmountData.sort((a, b) => a.x - b.x);
  // console.log(expenseAmountData);
  // Balance and Income Data
  const incomeData = [];
  const balanceData = [];
  for (const data of yearCtx.expenseStates) {
    if (!expenseYearSet.has(data.year)) {
      continue;
    }
    incomeData.push({
      x: data.year,
      y: data.income,
    });

    balanceData.push({
      x: data.year,
      y: data.balance,
    });
    // first I will add the expense in negative, then add the balance to it
    let expenseAmount = surplusCalc.get(data.year);
    if (expenseAmount === undefined) {
      expenseAmount = 0;
    }

    surplusCalc.set(data.year, expenseAmount + data.balance);
  }
  // sort the arrays acc to year before passing to line chart
  incomeData.sort((a, b) => a.x - b.x);
  balanceData.sort((a, b) => a.x - b.x);
  // console.log("INCOME DATA");
  // console.log(incomeData);
  // console.log(balanceData);

  // Calculating Surplus or Loss Each Year by iterating the map
  const surplusData = [];
  surplusCalc.forEach((surplus, year) => {
    surplusData.push({
      x: year,
      y: surplus,
    });
  });
  // sort surplus data acc to year
  surplusData.sort((a, b) => a.x - b.x);
  // console.log("surplus");
  // console.log(surplusData);
  // Setting data nodes for line chart
  lineChartData.push({
    id: "EXPENSES",
    data: expenseAmountData,
  });
  lineChartData.push({
    id: "BALANCE",
    data: balanceData,
  });
  lineChartData.push({
    id: "INCOME",
    data: incomeData,
  });
  lineChartData.push({
    id: "SURPLUS",
    data: surplusData,
  });

  // console.log(lineChartData);

  return (
    <div className={classes.lineChart}>
      <h2>INCOME AND EXPENSE TRENDS</h2>
      <ResponsiveLine
        data={lineChartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "YEAR",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "AMOUNT",
          legendOffset: -55,
          legendPosition: "middle",
        }}
        enableGridY={false}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        theme={{
          tooltip: {
            container: {
              background: "#331D2C",
              fontSize: 12,
            },
          },
          labels: {
            text: {
              fontSize: 16,
              fill: "#FFFFFF",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          axis: {
            ticks: {
              line: {
                stroke: "#FFFFFF",
              },
              text: {
                fill: "#FFFFFF",
              },
            },
            legend: {
              text: {
                fill: "#FFFFFF",
                fontSize: 12,
                letterSpacing: 2,
              },
            },
          },
          legends: {
            text: {
              fill: "#ffffff",
              textColor: "#FFFFFF",
            },
          },
          crosshair: {
            line: {
              stroke: "#ffffff",
              strokeWidth: 1,
              strokeOpacity: 0.8,
            },
          },
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default ExpenseGraph;
