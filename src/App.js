import {Fragment} from 'react';
import Expenses from './Components/Expenses/Expenses';
import ExpenseState from './Components/ExpenseState/ExpenseState';
import ExpenseForm from './Components/ExpenseForm/ExpenseForm';

const App = () => {
  return (
    <Fragment>
      <ExpenseForm />
      <h2>Expense Tracker</h2>
      <ExpenseState />
      <Expenses />
    </Fragment>
  );
}

export default App;
