import { useLocation, useParams } from 'react-router-dom';
import SpendingForm from '../../components/Finance/spendingForm';

const AddSpending = () => {
	const location = useLocation();
	const { id } = useParams();
	const from = location.state?.from || '/finance';

	return (
		<div>
			<SpendingForm redirectTo={from} editId={id} />
		</div>
	);
};

export default AddSpending;
