import classes from './Tile.module.css';

const Tile = props => {
    const expenseDeleteHandler = event => {

    };
// delete should only be visible on hover
    return (
        <div className={classes.tile}>
            <span onClick={expenseDeleteHandler}>Delete</span>
            <p>{props.expenseTitle}</p>
            <p>${props.expenseAmount}</p>
        </div>
    )
};

export default Tile;