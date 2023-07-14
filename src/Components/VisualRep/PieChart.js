import { useState, useEffect, useContext } from "react";
import ExpenseListContext from "../../store/expenseList-card-context";

const PieChart = (props) => {
  /* Install a third party npm package to render Pie charts. */
  const [curSelectedYear, setSelectedYear] = useState(null);
  const listDataCtx = useContext(ExpenseListContext);
  useEffect(() => {
    setSelectedYear(props.currentSelectedYear);
  }, [props]);
  return <p>LEFT PART</p>;
};

export default PieChart;
