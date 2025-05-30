import { useState } from 'react';
import EditInput from '../Inputs/EditInput';
import { useSelector } from 'react-redux';
import { addGoals } from '../../services/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const GoalForm = () => {
	const navigate = useNavigate();
	const id = useSelector((state) => state.userId.id);
	const fechaActual = new Date().toLocaleDateString();

	const [startDate, setStartDate] = useState(fechaActual);
	const [endDate, setEndDate] = useState(fechaActual);
	const [price, setPrice] = useState('$50.000');
	const [description, setDescription] = useState('Write here...');

	const [editStart, setEditStart] = useState(false);
	const [editEnd, setEditEnd] = useState(false);
	const [editPrice, setEditPrice] = useState(false);
	const [editDesc, setEditDesc] = useState(false);

	const handleClose = () => navigate(-1);

	const handleSubmit = async () => {
		const amount = Number(price.replace(/\D/g, ''));
		if (isNaN(amount)) {
			toast.error('Please enter a valid numeric value.');
			return;
		}

		try {
			await addGoals({
				uid: id,
				startDate,
				endDate,
				amount,
				description,
			});
			toast.success('Goal saved successfully!');
			navigate('/finance');
		} catch (err) {
			console.error(err);
			toast.error('Error saving goal.');
		}
	};

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h2>Set new goal</h2>
				<CloseIcon onClick={handleClose} />
			</div>

			<EditInput
				label='Start date'
				value={startDate}
				onChange={(e) => setStartDate(e.target.value)}
				editable={editStart}
				onEditClick={() => setEditStart(!editStart)}
			/>
			<EditInput
				label='End date'
				value={endDate}
				onChange={(e) => setEndDate(e.target.value)}
				editable={editEnd}
				onEditClick={() => setEditEnd(!editEnd)}
			/>
			<EditInput
				label='Price'
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				editable={editPrice}
				onEditClick={() => setEditPrice(!editPrice)}
			/>
			<EditInput
				label='Description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				editable={editDesc}
				onEditClick={() => setEditDesc(!editDesc)}
			/>

			<button onClick={handleSubmit}>Guardar</button>
		</div>
	);
};

export default GoalForm;
