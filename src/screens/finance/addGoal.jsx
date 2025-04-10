import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditInput from '../../components/Inputs/EditInput';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const AddGoal = () => {
	const navigate = useNavigate();

	const [startDate, setStartDate] = useState('April 09 2025');
	const [endDate, setEndDate] = useState('April 30 2025');
	const [price, setPrice] = useState('$50.000');
	const [description, setDescription] = useState('Write here....');

	const [editStart, setEditStart] = useState(false);
	const [editEnd, setEditEnd] = useState(false);
	const [editPrice, setEditPrice] = useState(false);
	const [editDesc, setEditDesc] = useState(false);

	const handleClose = () => navigate('/finance');

	return (
		<div style={container}>
			<div style={header}>
				<h2 style={title}>Set new goal</h2>
				<CloseIcon onClick={handleClose} style={closeIcon} />
			</div>

			{/* Fila con dos inputs */}
			<div style={inputRow}>
				<EditInput
					label='Add start date'
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					editable={editStart}
					onEditClick={() => setEditStart(!editStart)}
				/>
				<EditInput
					label='Add start finish'
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					editable={editEnd}
					onEditClick={() => setEditEnd(!editEnd)}
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

export default AddGoal;

const container = {
	backgroundColor: '#D8D4F2',
	height: '100vh',
	padding: '50px 80px',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	with: '100%',
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
	justifyContent: 'space-between',
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
