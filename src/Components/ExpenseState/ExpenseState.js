import Card from "../UI/Card";
import styles from "./ExpenseState.module.css";

const ExpenseState = (props) => {
  return (
    <section className={styles.state}>
      <div className={styles['year-control']}>
        <div className={styles.balance}>
          <h3>YOUR BALANCE</h3>
          <p>$5000</p>
        </div>
        <div className={styles.yearSelector} >
          <label htmlFor="year">Select Year</label>
          <select id="year">
            <option hidden disabled selected value></option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
          </select>
        </div>
      </div>

      <div className={styles.curState}>
        <Card title="INCOME" amount="1000" customId="income"></Card>
        <Card title="EXPENSE" amount="500" customId="expense"></Card>
      </div>
    </section>
  );
};

export default ExpenseState;
