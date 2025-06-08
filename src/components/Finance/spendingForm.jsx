import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addSpend, evaluateGoalsStatus } from '../../services/firebaseUtils';
import { useSnackbar } from 'notistack';
import {
	Box,
	Button,
	Typography,
	IconButton,
	Select,
	MenuItem,
	styled,
	TextField,
	InputLabel,
	FormControl,
	OutlinedInput,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const categoryOptions = ['Food', 'Sweets', 'Entertainment', 'Shopping', 'Experiences', 'Other'];

export default function SpendingForm({ redirectTo: defaultRedirect = '/finance', editId: defaultEditId = null }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { enqueueSnackbar } = useSnackbar();
	const uid = useSelector((state) => state.userId.id);

	const editId = location.state?.editId || defaultEditId;
	const redirectTo = location.state?.redirectTo || defaultRedirect;

	const localToday = new Date();
	localToday.setHours(12, 0, 0, 0);
	const [date, setDate] = useState(localToday);
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (!editId) return;
		const loadData = async () => {
			try {
				const docRef = doc(db, 'users', uid, 'Spends', editId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					const loadedDate = data.date?.toDate() || localToday;
					loadedDate.setHours(12, 0, 0, 0);
					setDate(loadedDate);
					setCategory(data.category || '');
					setPrice(data.amount?.toString() || '');
					setDescription(data.description || '');
				}
			} catch (err) {
				console.error('Error loading data for editing:', err);
			}
		};
		loadData();
	}, [editId, uid]);

	const handleClose = () => navigate(-1);

	const handleSubmit = async () => {
		const amount = Number(price.replace(/\D/g, ''));
		if (!category || isNaN(amount)) {
			enqueueSnackbar('Please select a category and a valid value.', { variant: 'error' });
			return;
		}
		try {
			const fixedDate = new Date(date);
			fixedDate.setHours(12, 0, 0, 0);

			if (editId) {
				const docRef = doc(db, 'users', uid, 'Spends', editId);
				await updateDoc(docRef, {
					date: fixedDate,
					category,
					amount,
					description,
				});
				enqueueSnackbar('Spending updated successfully', { variant: 'success' });
			} else {
				await addSpend({ uid, startDate: fixedDate, category, amount, description });
				enqueueSnackbar('Spending saved successfully', { variant: 'success' });
			}

			await evaluateGoalsStatus({ uid });

			setTimeout(() => {
				navigate(redirectTo);
			}, 1800);
		} catch (err) {
			console.error(err);
			enqueueSnackbar('Error saving expense', { variant: 'error' });
		}
	};

	return (
		<ScreenWrapper>
			<FormCard>
				<HeaderSection>
					<TitleGroup>
						<IconCircle>
							<AttachMoneyIcon sx={{ color: '#fff', fontSize: 20 }} />
						</IconCircle>
						<Typography sx={{ fontSize: 18, fontWeight: 600 }}>{editId ? 'Edit spending' : 'Add spending'}</Typography>
					</TitleGroup>
					<IconButton onClick={handleClose}>
						<CloseIcon sx={{ color: '#000' }} />
					</IconButton>
				</HeaderSection>

				<StyledInput
					label='Date'
					type='date'
					variant='outlined'
					fullWidth
					value={date.toISOString().split('T')[0]}
					onChange={(e) => {
						const selected = new Date(e.target.value);
						selected.setHours(12, 0, 0, 0);
						setDate(selected);
					}}
				/>

				<FormControl fullWidth>
					<InputLabel>Category</InputLabel>
					<StyledSelect
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						input={<OutlinedInput label='Category' />}
					>
						<MenuItem value=''>
							<em>Select a category</em>
						</MenuItem>
						{categoryOptions.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</StyledSelect>
				</FormControl>

				<StyledInput
					label='Price'
					variant='outlined'
					fullWidth
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder='$20.000'
				/>

				<StyledInput
					label='Description'
					variant='outlined'
					fullWidth
					multiline
					minRows={3}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Write here...'
				/>

				<SaveButtonWrapper>
					<SaveButton onClick={handleSubmit}>
						<IconCircle bgcolor='#837AD8'>
							<SendIcon sx={{ color: '#fff', fontSize: 20 }} />
						</IconCircle>
						<span>{editId ? 'Save changes' : 'Save'}</span>
					</SaveButton>
				</SaveButtonWrapper>
			</FormCard>
		</ScreenWrapper>
	);
}

const ScreenWrapper = styled(Box)({
	backgroundColor: '#DFDFF4',
	minHeight: '100vh',
	padding: '40px 20px',
	boxSizing: 'border-box',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const FormCard = styled(Box)({
	backgroundColor: '#B8B8D9',
	padding: '32px',
	borderRadius: '24px',
	width: '100%',
	maxWidth: '700px',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	fontFamily: '"Manrope", sans-serif',
});

const HeaderSection = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '1rem',
});

const TitleGroup = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
});

const IconCircle = styled(Box)(({ bgcolor = '#837AD8' }) => ({
	backgroundColor: bgcolor,
	width: '2rem',
	height: '2rem',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInput = styled(TextField)({
	backgroundColor: '#E6E4F6',
	borderRadius: '12px',
	'& .MuiOutlinedInput-root': {
		borderRadius: '12px',
	},
});

const StyledSelect = styled(Select)({
	backgroundColor: '#E6E4F6',
	borderRadius: '12px',
});

const SaveButtonWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	marginTop: '12px',
});

const SaveButton = styled(Button)({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	padding: '12px 20px',
	backgroundColor: '#837AD8',
	borderRadius: '12px',
	cursor: 'pointer',
	fontSize: '16px',
	fontWeight: 500,
	textTransform: 'none',
	color: '#fff',
	fontFamily: '"Manrope", sans-serif',
	'&:hover': {
		backgroundColor: '#6F64D8',
		opacity: 0.95,
	},
});
