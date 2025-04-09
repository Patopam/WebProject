import { useNavigate } from 'react-router-dom';
import EditInput from '../../components/Inputs/EditInput';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const AddSpending = () => {
	const navigate = useNavigate();

	const handleClose = () => navigate('/finance');

	return (
		<div>
			<div>
				<h2>Add spending</h2>
				<CloseIcon onClick={handleClose} />
			</div>

			<div>
				<EditInput label='Add date' />
				<EditInput label='Add Category' />
			</div>

			<EditInput label='Add Price' />

			<EditInput label='Description' />

			<button>
				<SendIcon />
				<span>Save</span>
			</button>
		</div>
	);
};

export default AddSpending;
