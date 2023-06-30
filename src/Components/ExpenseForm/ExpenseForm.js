import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  return (
    <section>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="category">Transaction category</label>
          <select id="category">
            <option hidden disabled selected value></option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Bills">Bills</option>
            <option value="Utilities">Utilities</option>
            <option value="Sustenance">Sustenance</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div className={classes.control}> 
          <label htmlFor="year">Year</label>
          <input
            type="number"
            placeholder="YYYY"
            min="2000"
            max="2030"
            id="year"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" />
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" step="10"/>
        </div>
        <div className={classes.control}>
          <label htmlFor="type">Expense Type</label>
          <select id="type">
            <option value="add">Expense</option>
            <option value="subtract">Income</option>
          </select>
        </div>
        <div className={classes.actions}>
          <button type="button">Cancel</button>
          <button type="submit">Add Transaction</button>
        </div>
      </form>
    </section>
  );
};

export default ExpenseForm;
