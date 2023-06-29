import { Fragment } from "react";
import Tile from "../UI/Tile";

const ExpenseList = (props) => {
  return (
    <Fragment>
      <ul>
        <Tile expenseTitle="Groceries" expenseAmount="5"></Tile>
      </ul>
    </Fragment>
  );
};

export default ExpenseList;
