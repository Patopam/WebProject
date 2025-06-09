import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGoals } from '../../services/firebaseUtils';
import { useSnackbar } from 'notistack';
import { Box, Button, Typography, IconButton, styled, TextField } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function GoalForm({ redirectTo = '/finance' }) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const uid = useSelector((state) => state.userId.id);

	const localToday = new Date();
	localToday.setHours(0, 0, 0, 0);
	const [startDate, setStartDate] = useState(localToday);
	const [endDate, setEndDate] = useState(localToday);
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const handleClose = () => navigate(-1);

	const handleSubmit = async () => {
		const amount = Number(price.replace(/\D/g, ''));
		if (isNaN(amount)) {
			enqueueSnackbar('Please enter a valid numeric value.', {
				variant: 'error',
			});
			return;
		}

		try {
			await addGoals({
				uid,
				startDate,
				endDate,
				amount,
				description,
			});

			enqueueSnackbar('Goal saved successfully!', { variant: 'success' });

			setTimeout(() => {
				navigate(redirectTo);
			}, 1800);
		} catch (err) {
			console.error(err);
			enqueueSnackbar('Error saving goal.', { variant: 'error' });
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
						<Typography sx={{ fontSize: 18, fontWeight: 600 }}>Set new goal</Typography>
					</TitleGroup>
					<IconButton onClick={handleClose}>
						<CloseIcon sx={{ color: '#000' }} />
					</IconButton>
				</HeaderSection>

				<StyledInput
					label='Start Date'
					type='date'
					variant='outlined'
					fullWidth
					value={startDate.toISOString().split('T')[0]}
					onChange={(e) => setStartDate(new Date(e.target.value))}
				/>

				<StyledInput
					label='End Date'
					type='date'
					variant='outlined'
					fullWidth
					value={endDate.toISOString().split('T')[0]}
					onChange={(e) => setEndDate(new Date(e.target.value))}
				/>

				<StyledInput
					label='Value'
					variant='outlined'
					fullWidth
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder='$50.000'
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
						<span>Save</span>
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
