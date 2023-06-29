import Card from '../UI/Card';
import Budget from './Budget';

const ExpenseState = props => {
    return (
        <section>
            <Budget />
            <div>
                <Card title="INCOME" amount="1000"></Card>
                <Card title="EXPENSE" amount="500"></Card>
            </div>
        </section>
    );
};

export default ExpenseState;