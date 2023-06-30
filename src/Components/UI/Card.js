import styles from './Card.module.css';

const Card = props => {
    const customclass = props.customId;
    return (
        <div className={`${styles.Card} ${customclass.length !== 0 ? styles[`${customclass}`] : ''}`}>
            <h3>{props.title}</h3>
            <p>${props.amount}</p>
        </div>
    )
};

export default Card;