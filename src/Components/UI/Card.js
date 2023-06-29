import { Fragment } from "react";

const Card = props => {
    return (
        <Fragment>
            <h3>{props.title}</h3>
            <p>${props.amount}</p>
        </Fragment>
    )
};

export default Card;