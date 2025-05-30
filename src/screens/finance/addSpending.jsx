import { useLocation } from 'react-router-dom';
import SpendingForm from '../../components/Finance/spendingForm';

const AddSpending = () => {
	const location = useLocation();
	const from = location.state?.from || '/finance';

	return (
		<div>
			<SpendingForm redirectTo={from} />
		</div>
	);
};

export default AddSpending;
