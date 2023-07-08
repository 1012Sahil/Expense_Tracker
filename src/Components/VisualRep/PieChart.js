import { useState, useEffect } from "react";

const PieChart = (props) => {
  const [curSelectedYear, setSelectedYear] = useState(null);
  useEffect(() => {
    setSelectedYear(props.currentSelectedYear);
  }, [props]);
  return <p>LEFT PART</p>;
};

export default PieChart;
