import {Fragment} from 'react';
import Expenses from './Components/Expenses/Expenses';
import ExpenseState from './Components/ExpenseState/ExpenseState';

const App = () => {
  return (
    <Fragment>
      <h2>Expense Tracker</h2>
      <ExpenseState />
      <Expenses />
    </Fragment>
  );
}

export default App;
