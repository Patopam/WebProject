import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditInput from '../../components/Inputs/EditInput';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const AddGoal = () => {
	const navigate = useNavigate();

	// Estados para los campos
	const [startDate, setStartDate] = useState('');
	const [finishDate, setFinishDate] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');

	// Cerrar modal o pantalla
	const handleClose = () => {
		navigate('/finance');
	};

	// Guardar datos (aún no implementado, solo consola)
	const handleSave = () => {
		console.log({
			startDate,
			finishDate,
			price,
			description,
		});
	};

	return (
		<div>
			{/* Botón de cerrar */}
			<div onClick={handleClose}>
				<CloseIcon />
			</div>

			<h2>Set new goal</h2>

			{/* Campos del formulario */}
			<EditInput
				label='Add start date'
				value={startDate}
				editable={true}
				onChange={(e) => setStartDate(e.target.value)}
			/>

			<EditInput
				label='Add start finish'
				value={finishDate}
				editable={true}
				onChange={(e) => setFinishDate(e.target.value)}
			/>

			<EditInput label='Add price' value={price} editable={true} onChange={(e) => setPrice(e.target.value)} />

			<EditInput
				label='Description'
				value={description}
				editable={true}
				onChange={(e) => setDescription(e.target.value)}
			/>

			{/* Botón guardar */}
			<button onClick={handleSave}>
				<SendIcon /> Save
			</button>
		</div>
	);
};

export default AddGoal;
