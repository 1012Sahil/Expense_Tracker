import styles from './Card.module.css';

const Card = props => {
    return (
        <div className={styles.Card}>
            <h3>{props.title}</h3>
            <p>${props.amount}</p>
        </div>
    )
};

export default Card;