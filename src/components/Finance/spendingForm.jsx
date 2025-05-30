import { useState } from 'react';
import EditInput from '../Inputs/EditInput';
import { useSelector } from 'react-redux';
import { addSpend } from '../../services/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const SpendingForm = () => {
	const navigate = useNavigate();
	const id = useSelector((state) => state.userId.id);
	const fechaActual = new Date().toLocaleDateString();

	const [date, setDate] = useState(fechaActual);
	const [category, setCategory] = useState('Write here...');
	const [price, setPrice] = useState('$20.000');
	const [description, setDescription] = useState('Write here...');

	const [editDate, setEditDate] = useState(false);
	const [editCategory, setEditCategory] = useState(false);
	const [editPrice, setEditPrice] = useState(false);
	const [editDesc, setEditDesc] = useState(false);

	const handleClose = () => navigate(-1);

	const handleSubmit = async () => {
		try {
			await addSpend({
				uid: id,
				startDate: date,
				category,
				price,
				description,
			});
			toast.success('¡Gasto guardado con éxito!');
			navigate('/finance');
		} catch (err) {
			console.error(err);
			toast.error('Hubo un error al guardar el gasto.');
		}
	};

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h2>Add spending</h2>
				<CloseIcon onClick={handleClose} />
			</div>

			<EditInput
				label='Add date'
				value={date}
				onChange={(e) => setDate(e.target.value)}
				editable={editDate}
				onEditClick={() => setEditDate(!editDate)}
			/>
			<EditInput
				label='Add Category'
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				editable={editCategory}
				onEditClick={() => setEditCategory(!editCategory)}
			/>
			<EditInput
				label='Add Price'
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

export default SpendingForm;
