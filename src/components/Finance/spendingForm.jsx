import { useState } from 'react';
import EditInput from '../Inputs/EditInput';
import { useSelector } from 'react-redux';
import { addSpend } from '../../services/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const categoryOptions = ['Food', 'Sweets', 'Coffee', 'Entertainment', 'Shopping', 'Experiences', 'Other'];

const SpendingForm = () => {
	const navigate = useNavigate();
	const id = useSelector((state) => state.userId.id);
	const fechaActual = new Date().toLocaleDateString();

	const [date, setDate] = useState(fechaActual);
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState('$20.000');
	const [description, setDescription] = useState('Write here...');

	const [editDate, setEditDate] = useState(false);
	const [editPrice, setEditPrice] = useState(false);
	const [editDesc, setEditDesc] = useState(false);

	const handleClose = () => navigate(-1);

	const handleSubmit = async () => {
		const amount = Number(price.replace(/\D/g, ''));
		if (!category || isNaN(amount)) {
			toast.error('Por favor selecciona una categoría y un valor válido.');
			return;
		}

		try {
			await addSpend({
				uid: id,
				startDate: date,
				category,
				amount,
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

			{/* Select fijo de categorías */}
			<div style={{ margin: '16px 0' }}>
				<label style={{ fontWeight: 'bold' }}>Category</label>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					style={{ width: '100%', padding: '10px', borderRadius: '10px', marginTop: '8px' }}
				>
					<option value=''>Select a category</option>
					{categoryOptions.map((option) => (
						<option key={option}>{option}</option>
					))}
				</select>
			</div>

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
