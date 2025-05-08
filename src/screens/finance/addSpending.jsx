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

			{/* Row with two inputs */}
			<div style={dateRowContainer}>
				<div style={dateInputContainer}>
					<EditInput
						label='Add date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
						editable={editDate}
						onEditClick={() => setEditDate(!editDate)}
					/>
				</div>
				<div style={dateInputContainer}>
					<EditInput
						label='Add Category'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						editable={editCategory}
						onEditClick={() => setEditCategory(!editCategory)}
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

export default AddSpending;

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
};

const title = {
	fontSize: '24px',
	fontWeight: 'bold',
	color: '#333',
	margin: 0,
};

const closeIcon = {
	cursor: 'pointer',
	fontSize: '24px',
};

const dateRowContainer = {
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between',
	gap: '40px',
	marginBottom: '8px',
};

const dateInputContainer = {
	flex: 1,
	maxWidth: 'calc(50% - 20px)',
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
