import Card from "../UI/Card";
import styles from "./ExpenseState.module.css";

const ExpenseState = (props) => {
  return (
    <section className={styles.state}>
      <div className={styles.balance}>
        <h3>YOUR BALANCE</h3>
        <p>$5000</p>
      </div>

      <div className={styles.curState}>
        <Card title="INCOME" amount="1000" customId="income"></Card>
        <Card title="EXPENSE" amount="500" customId="expense"></Card>
      </div>
    </section>
  );
};

export default ExpenseState;
