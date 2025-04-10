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
				<div style={closeIconContainer}>
					<CloseIcon onClick={handleClose} style={closeIcon} />
				</div>
			</div>

			{/* Row with two inputs */}
			<div style={dateRowContainer}>
				<div style={dateInputContainer}>
					<EditInput
						label='Add start date'
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						editable={editStart}
						onEditClick={() => setEditStart(!editStart)}
					/>
				</div>
				<div style={dateInputContainer}>
					<EditInput
						label='Add start finish'
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						editable={editEnd}
						onEditClick={() => setEditEnd(!editEnd)}
					/>
				</div>
			</div>

			{/* Single inputs */}
			<div style={singleInputContainer}>
				<EditInput
					label='Add Price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					editable={editPrice}
					onEditClick={() => setEditPrice(!editPrice)}
				/>
			</div>

			<div style={singleInputContainer}>
				<EditInput
					label='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					editable={editDesc}
					onEditClick={() => setEditDesc(!editDesc)}
				/>
			</div>

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
	minHeight: '100vh',
	padding: '50px 80px',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	width: '100%',
	fontFamily: "'Manrope', sans-serif",
	position: 'relative',
	boxSizing: 'border-box',
};

const header = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	marginBottom: '16px',
	paddingRight: '10px', // Añadido para mejor alineación
};

const title = {
	fontSize: '24px',
	fontWeight: 'bold',
	color: '#333',
	margin: 0,
};

// Contenedor para mejor control sobre el icono
const closeIconContainer = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '40px',
	height: '40px',
};

const closeIcon = {
	cursor: 'pointer',
	fontSize: '24px',
	color: '#333',
};

const dateRowContainer = {
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between',
	gap: '40px', // Increased gap between the date fields
	marginBottom: '8px',
};

const dateInputContainer = {
	flex: 1,
	maxWidth: 'calc(50% - 20px)', // Make sure each input takes up less than half to account for the gap
};

const singleInputContainer = {
	width: '100%',
	marginBottom: '8px',
};

const saveButton = {
	backgroundColor: '#AFA8D1',
	color: '#333',
	border: 'none',
	borderRadius: '10px',
	padding: '12px 24px',
	fontWeight: 500,
	fontSize: '16px',
	marginTop: '24px',
	alignSelf: 'center',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};
