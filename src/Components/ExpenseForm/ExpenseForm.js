import { useState, useRef } from "react";
import classes from "./ExpenseForm.module.css";

// functions to check validity of form input data
const yearValidityChecker = (value) => value >= 2000 && value <= 2030;
const categoryValidityChecker = (value) => value !== "";
const amountValidityChecker = (value) => value > 0;
const descValidityChecker = (value) => value.trim().length >= 3;

const ExpenseForm = (props) => {
  /* As we only need to read the data and not change it, only show error if any, we can use refs here 
  to reduce the complexity of using multiple states or using a reducer */
  // Assuming form is valid initially
  const [formInputsValidity, setFormValidity] = useState({
    category: true,
    year: true,
    desc: true,
    amount: true,
    expenseType: true,
  });

  /* Consider moving the form to another component to refactor code */

  const categoryInputRef = useRef();
  const yearInputRef = useRef();
  const descInputRef = useRef();
  const amountInputRef = useRef();
  const typeInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredCategory = categoryInputRef.current.value;
    const enteredYear = yearInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const entererdAmount = amountInputRef.current.value;

    /* If type = expense, I want to reduce the amount from the balance and add it to expense.
    If type = income, I want to reduce expense by amount.
    If somehow expense is negative, then we have net profit in that year and show the surplus.
    If expense exceeds balance, we have gone over the budget.
    If expense is non*ngative but less than balance, we have saved the miney this year. 
    All the above trends can be deduced from our data, and is a great example of how data becomes information.
    We can then use data from the years and make more observations. */

    const enteredCategoryIsValid = categoryValidityChecker(enteredCategory);
    const enteredYearIsValid = yearValidityChecker(enteredYear);
    // type is always valid as it can't be left blank
    const enteredDescIsValid = descValidityChecker(enteredDesc);
    const entererdAmountIsValid = amountValidityChecker(entererdAmount);

    const formIsValid =
      enteredCategoryIsValid &&
      enteredDescIsValid &&
      enteredYearIsValid &&
      entererdAmountIsValid;

    if (!formIsValid) {
      // DON'T SUBMIT DATA IF FORM IS INVALID!
      // any value is not valid will be stroed as false and invalid indication will be shown by invalid class
      setFormValidity({
        expenseType: enteredType,
        amount: entererdAmountIsValid,
        year: enteredYearIsValid,
        category: enteredCategoryIsValid,
        desc: enteredDescIsValid,
      });
      return;
    }
    // if input is valid, then set the data as follows, as data is not null nor false, it will be treated as true
    setFormValidity({
      expenseType: enteredType,
      amount: entererdAmount,
      year: enteredYear,
      category: enteredCategory,
      desc: enteredDesc,
    });

    // close form
    props.onClose();
    // SUBMIT DATA -> pass the data in form of an object to the app.js file, where you connect to firebase and send data
    props.onConfirm({
      type: enteredType,
      amount: entererdAmount,
      year: enteredYear,
      category: enteredCategory,
      desc: enteredDesc,
    });
  };
  return (
    <section>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div
          className={`${classes.control} ${
            !formInputsValidity.category ? classes.invalid : ""
          }`}
        >
          <label htmlFor="category">Transaction category</label>
          <select id="category" ref={categoryInputRef}>
            <option disabled value="" hidden></option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Sustenance">Sustenance</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          {!formInputsValidity.category && <p>Please select a category.</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formInputsValidity.year ? classes.invalid : ""
          }`}
        >
          <label htmlFor="year">Year</label>
          <input
            type="number"
            placeholder="YYYY"
            ref={yearInputRef}
            min="2000"
            max="2030"
            id="year"
          />
          {!formInputsValidity.year && <p>Please select a valid year.</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formInputsValidity.desc ? classes.invalid : ""
          }`}
        >
          <label htmlFor="description">Description</label>
          <input type="text" id="description" ref={descInputRef} />
          {!formInputsValidity.year && <p>Add a description !</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formInputsValidity.amount ? classes.invalid : ""
          }`}
        >
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" ref={amountInputRef} />
          {!formInputsValidity.year && <p>Amount must be greater than zero!</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="type">Expense Type</label>
          <select id="type" ref={typeInputRef}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button type="submit" /*onClick={props.onClose}*/>
            Add Transaction
          </button>
        </div>
      </form>
    </section>
  );
};

export default ExpenseForm;