import classes from './Tile.module.css';

const Tile = props => {
    const expenseDeleteHandler = event => {

    };

    return (
        <div className={classes.tile}>
            <span onClick={expenseDeleteHandler}>Delete Button</span>
            <p>{props.expenseTitle}</p>
            <p>${props.expenseAmount}</p>
        </div>
    )
};

export default Tile;