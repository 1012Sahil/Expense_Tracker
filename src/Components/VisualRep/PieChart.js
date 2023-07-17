import { useState, useEffect, useContext } from "react";
import { ResponsivePie } from "@nivo/pie";
import styles from "./PieChart.module.css";
import ExpenseListContext from "../../store/expenseList-card-context";

const PieChart = (props) => {
  /* Install a third party npm package to render Pie charts. */
  /* I have decided to use nivo (a npm package used for charting) for my project. 
  It is important to note that for the chart to properly render, I need to define the height of 
  the parent component */
  const [curSelectedYear, setSelectedYear] = useState(null);
  const listDataCtx = useContext(ExpenseListContext);

  useEffect(() => {
    setSelectedYear(props.currentSelectedYear);
  }, [props]);

  /* Get the selected year's data and convert it into an array of object, which has these properties (as per Nivo's requirements)
  {value, id, label, color} */
  // console.log(listDataCtx.allYearTransactions);
  const selectedYearDataIndex = listDataCtx.allYearTransactions.findIndex(
    (data) => data.year === curSelectedYear
  );
  if (selectedYearDataIndex === -1) return;
  const selectedYearData =
    listDataCtx.allYearTransactions[selectedYearDataIndex].transactions;
  // console.log(selectedYearData);
  // the categories with their expenses will be stored as follows -
  const pieData = new Map([
    ["Bills", 0],
    ["Entertainment", 0],
    ["Utilities", 0],
    ["Rent", 0],
    ["Sustenance", 0],
    ["Lifestyle", 0],
    ["Miscellaneous", 0],
  ]);

  for (const expense of selectedYearData) {
    const expenseType = expense.type;
    let expenseAmount = +expense.amount;
    const expenseCategory = expense.category;
    if (expenseType === "income") {
      expenseAmount *= -1;
    }
    const curValue = +pieData.get(expenseCategory);
    pieData.set(expenseCategory, curValue + expenseAmount);
  }
  // Let the id be same as category, as each category is unique
  const dataToPieChart = [];
  for (const [key, value] of pieData.entries()) {
    const slice = {};
    slice.label = key;
    slice.id = key;
    slice.value = +value;
    dataToPieChart.push(slice);
  }

  // All is needed to do is configure the pie chart
  // Also remember to show some comments about the user's expense habits based on the data we have

  return (
    <div className={styles.pie}>
      <h2>CATEGORY-WISE EXPENSE BREAKDOWN</h2>
      <ResponsivePie
        data={dataToPieChart}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat=" > $.7~g"
        sortByValue={true}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeInnerRadiusOffset={13}
        activeOuterRadiusOffset={10}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0.6"]],
        }}
        arcLinkLabelsSkipAngle={3}
        arcLinkLabelsTextColor="#fefefe"
        arcLinkLabelsStraightLength={30}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        arcLabelsSkipAngle={5}
        arcLabelsTextColor="black"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        motionConfig={{
          mass: 4,
          tension: 220,
          friction: 25,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
        theme={{
          labels: {
            text: {
              fontSize: 16,
              fill: "#000000",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
