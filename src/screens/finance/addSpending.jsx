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
		<div>
			<div>
				<h2>Add spending</h2>
				<CloseIcon onClick={handleClose} />
			</div>

			<div>
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

			<button>
				<SendIcon />
				<span>Save</span>
			</button>
		</div>
	);
};

export default AddSpending;
