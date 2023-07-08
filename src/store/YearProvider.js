import { useState } from "react";
import YearContext from "./selectedYear-card-context";

const YearProvider = (props) => {
  const [allYearData, setAllYearData] = useState([]);
  const loadYearData = (value) => {
    setAllYearData(value);
  };

  const yearContext = {
    expenseStates: allYearData,
    loadYears: loadYearData,
  };

  return (
    <YearContext.Provider value={yearContext}>
      {props.children}
    </YearContext.Provider>
  );
};

export default YearProvider;
