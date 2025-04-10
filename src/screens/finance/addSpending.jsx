import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditInput from '../../components/Inputs/EditInput';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const AddSpending = () => {
	const navigate = useNavigate();

	const [date, setDate] = useState('April 09 2025');
	const [category, setCategory] = useState('Write here....');
	const [price, setPrice] = useState('$20.000');
	const [description, setDescription] = useState('Write here....');

	const [editDate, setEditDate] = useState(false);
	const [editCategory, setEditCategory] = useState(false);
	const [editPrice, setEditPrice] = useState(false);
	const [editDesc, setEditDesc] = useState(false);

	const handleClose = () => navigate('/finance');

	return (
		<div style={container}>
			<div style={header}>
				<h2 style={title}>Add spending</h2>
				<CloseIcon onClick={handleClose} style={closeIcon} />
			</div>

			<div style={inputRow}>
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

			<button style={saveButton}>
				<SendIcon style={{ fontSize: '20px' }} />
				<span style={{ marginLeft: '8px' }}>Save</span>
			</button>
		</div>
	);
};

export default AddSpending;

const container = {
	backgroundColor: '#D8D4F2',
	height: '100vh',
	padding: '50px 80px',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	fontFamily: "'Manrope', sans-serif",
	position: 'relative',
};

const header = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const title = {
	fontSize: '24px',
	fontWeight: 'bold',
	color: '#333',
};

const closeIcon = {
	cursor: 'pointer',
	fontSize: '20px',
};

const inputRow = {
	display: 'flex',
	gap: '24px',
};

const saveButton = {
	backgroundColor: '#AFA8D1',
	color: '#333',
	border: 'none',
	borderRadius: '10px',
	padding: '12px 24px',
	fontWeight: 500,
	fontSize: '16px',
	alignSelf: 'center',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
};
