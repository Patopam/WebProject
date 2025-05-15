import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { addSpend } from '../../services/firebaseUtils';

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

const AddSpending = () => {
	const fechaActual = new Date().toLocaleDateString();

	const id = useSelector((state) => state.userId.id);
	const navigate = useNavigate();

	const [date, setDate] = useState(fechaActual);
	const [category, setCategory] = useState('Write here....');
	const [price, setPrice] = useState('$20.000');
	const [description, setDescription] = useState('Write here....');

	const [editDate, setEditDate] = useState(false);
	const [editCategory, setEditCategory] = useState(false);
	const [editPrice, setEditPrice] = useState(false);
	const [editDesc, setEditDesc] = useState(false);

	const handleClose = () => navigate(-1);
	const setSpend = () => {
		addSpend({
			uid: id,
			startDate: date,
			price: price,
			category: category,
			description: description,
		});
		navigate(-1);
	};

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<h2 style={styles.title}>Add spending</h2>
				<CloseIcon onClick={handleClose} style={styles.closeIcon} />
			</div>

			<div style={styles.formWrapper}>
				<div style={styles.inputContainer}>
					<EditInput
						label='Add date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
						editable={editDate}
						onEditClick={() => setEditDate(!editDate)}
					/>
				</div>

				<div style={styles.inputContainer}>
					<EditInput
						label='Add Category'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						editable={editCategory}
						onEditClick={() => setEditCategory(!editCategory)}
					/>
				</div>

				<div style={styles.inputContainer}>
					<EditInput
						label='Add Price'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						editable={editPrice}
						onEditClick={() => setEditPrice(!editPrice)}
					/>
				</div>

				<div style={styles.inputContainer}>
					<EditInput
						label='Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						editable={editDesc}
						onEditClick={() => setEditDesc(!editDesc)}
					/>
				</div>
			</div>

			<div style={styles.buttonContainer}>
				<button style={styles.saveButton} onClick={setSpend}>
					<span style={styles.saveIcon}>▶</span>
					<span>Save</span>
				</button>
			</div>
		</div>
	);
};

// Styles for the EditInput component
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

// Main component styles
const styles = {
	container: {
		backgroundColor: '#D8D4F2',
		minHeight: '100vh',
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		boxSizing: 'border-box',
		fontFamily: "'Manrope', sans-serif",
		position: 'relative',
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: '20px',
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

	formWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
		boxSizing: 'border-box',
	},

	inputContainer: {
		width: '100%',
		boxSizing: 'border-box',
	},

	buttonContainer: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		marginTop: '30px',
	},

	saveButton: {
		backgroundColor: '#AFA8D1',
		color: '#333',
		border: 'none',
		borderRadius: '10px',
		padding: '12px 24px',
		fontWeight: 500,
		fontSize: '16px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
		width: '140px',
	},

	saveIcon: {
		marginRight: '8px',
		fontSize: '14px',
	},
};

export default AddSpending;
