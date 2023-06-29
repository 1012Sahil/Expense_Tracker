import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  return (
    <section>
      <h2>Add New Transaction</h2>
      <form className={classes["form-control"]}>
        <label htmlFor="category">Transaction category</label>
        <select id="category">
        <option hidden disabled selected value></option>
          <option>Entertainment</option>
          <option>Rent</option>
          <option>Bills</option>
          <option>Utilities</option>
          <option>Sustenance</option>
          <option>Lifestyle</option>
          <option>Miscellaneous</option>
        </select>
        <label htmlFor="year">Year</label>
        <input type="number" placeholder='YYYY' min="2000" max="2030" id="year" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" />
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" />
        <label htmlFor="type"></label>
        <label htmlFor="type">Expense Type</label>
        <select id="type">
          <option value="add">Expense</option>
          <option value="subtract">Income</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </section>
  );
};

export default ExpenseForm;
