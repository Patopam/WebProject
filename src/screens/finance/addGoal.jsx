import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { addGoals } from '../../services/firebaseUtils';
import { useSelector } from 'react-redux';
const AddGoal = () => {
	const fechaActual = new Date().toLocaleDateString();

	const id = useSelector((state) => state.userId.id);
	const navigate = useNavigate();

	const [startDate, setStartDate] = useState(fechaActual);
	const [endDate, setEndDate] = useState(fechaActual);
	const [price, setPrice] = useState('$50.000');
	const [description, setDescription] = useState('Write here....');

	const [editStart, setEditStart] = useState(false);
	const [editEnd, setEditEnd] = useState(false);
	const [editPrice, setEditPrice] = useState(false);
	const [editDesc, setEditDesc] = useState(false);

	const setGoal = () => {
		addGoals({
			uid: id,
			startDate: startDate,
			endDate: endDate,
			price: price,
			description: description,
		});
		navigate(-1);
	};
	const handleClose = () => {
		navigate(-1);
	};

	// Custom EditInput component that fixes truncation issues
	const EditInput = ({ label, value, onChange, editable, onEditClick }) => {
		return (
			<div style={inputStyles.container}>
				<div style={inputStyles.labelContainer}>
					<label style={inputStyles.label}>{label}</label>
					<button style={inputStyles.editButton} onClick={onEditClick}>
						Edit
					</button>
				</div>

				<div style={inputStyles.inputWrapper}>
					{editable ? (
						<input style={inputStyles.input} value={value} onChange={onChange} autoFocus />
					) : (
						<div style={inputStyles.displayValue}>{value}</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<h2 style={styles.title}>Set new goal</h2>
				<CloseIcon onClick={handleClose} style={styles.closeIcon} />
			</div>

			<div style={styles.dateRowContainer}>
				<div style={styles.dateInputContainer}>
					<EditInput
						label='Add start date'
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						editable={editStart}
						onEditClick={() => setEditStart(!editStart)}
					/>
				</div>
				<div style={styles.dateInputContainer}>
					<EditInput
						label='Add end date'
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						editable={editEnd}
						onEditClick={() => setEditEnd(!editEnd)}
					/>
				</div>
			</div>

			{/* Single inputs */}
			<div style={styles.singleInputContainer}>
				<EditInput
					label='Add Price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					editable={editPrice}
					onEditClick={() => setEditPrice(!editPrice)}
				/>
			</div>

			<div style={styles.singleInputContainer}>
				<EditInput
					label='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					editable={editDesc}
					onEditClick={() => setEditDesc(!editDesc)}
				/>
			</div>

			<button style={styles.saveButton} onClick={setGoal}>
				<SendIcon style={{ fontSize: '20px' }} />
				<span style={{ marginLeft: '8px' }}>Save</span>
			</button>
		</div>
	);
};

const inputStyles = {
	container: {
		width: '100%',
		borderRadius: '10px',
		backgroundColor: '#C1BBE5',
		padding: '12px 16px',
		boxSizing: 'border-box',
	},
	labelContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '8px',
	},
	label: {
		fontWeight: '500',
		fontSize: '14px',
		color: '#333',
	},
	editButton: {
		backgroundColor: 'transparent',
		border: 'none',
		color: '#333',
		fontWeight: '500',
		fontSize: '14px',
		cursor: 'pointer',
		padding: '0',
	},
	inputWrapper: {
		width: '100%',
		overflow: 'hidden',
	},
	input: {
		width: '100%',
		backgroundColor: 'transparent',
		border: 'none',
		borderBottom: '1px solid #9991C8',
		fontSize: '16px',
		padding: '4px 0',
		color: '#333',
		outline: 'none',
		boxSizing: 'border-box',
	},
	displayValue: {
		width: '100%',
		fontSize: '16px',
		color: '#333',
		padding: '4px 0',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
};

const styles = {
	container: {
		backgroundColor: '#D8D4F2',
		minHeight: '100vh',
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
		width: '100%',
		fontFamily: "'Manrope', sans-serif",
		position: 'relative',
		boxSizing: 'border-box',

		'@media (min-width: 768px)': {
			padding: '50px 80px',
		},
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: '16px',
	},

	title: {
		fontSize: '24px',
		fontWeight: 'bold',
		color: '#333',
		margin: 0,
	},

	closeIcon: {
		cursor: 'pointer',
		fontSize: '24px',
	},

	dateRowContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		gap: '16px',

		'@media (min-width: 768px)': {
			flexDirection: 'row',
			gap: '40px',
		},
	},

	dateInputContainer: {
		width: '100%',

		'@media (min-width: 768px)': {
			flex: 1,
			maxWidth: 'calc(50% - 20px)',
		},
	},

	singleInputContainer: {
		width: '100%',
		marginBottom: '8px',
	},

	saveButton: {
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
		justifyContent: 'center',
		cursor: 'pointer',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
		width: '140px',
	},
};

export default AddGoal;
