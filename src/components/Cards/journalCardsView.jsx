import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { updateJournal } from '../../services/firebaseUtils';
import { db } from '../../services/firebase';
import { useSnackbar } from 'notistack';

import { Box, Button, Typography, IconButton, TextField, styled } from '@mui/material';

import EditNoteIcon from '@mui/icons-material/EditNote';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function JournalCardView({ journalId }) {
	const uid = useSelector((state) => state.userId.id);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [originalData, setOriginalData] = useState({ title: '', description: '' }); // nuevo estado

	useEffect(() => {
		const fetchJournalById = async () => {
			if (!uid || !journalId) return;
			try {
				const docRef = doc(db, 'users', uid, 'journals', journalId);
				const snapshot = await getDoc(docRef);
				if (snapshot.exists()) {
					const data = snapshot.data();
					setTitle(data.title || '');
					setDescription(data.description || '');
					setDate(data.date?.toDate().toDateString() || 'Unknown date');
					setOriginalData({
						title: data.title || '',
						description: data.description || '',
					});
				}
			} catch (err) {
				console.error('Error loading journal:', err);
			}
		};

		fetchJournalById();
	}, [uid, journalId]);

	const handleSave = async () => {
		try {
			await updateJournal({ uid, journalId, title, description });
			enqueueSnackbar('Journal updated successfully', { variant: 'success' });
			setTimeout(() => {
				navigate('/Alljournal');
			}, 1500);
		} catch (err) {
			console.error(err);
			enqueueSnackbar('Error updating journal', { variant: 'error' });
		}
	};

	const handleExit = () => {
		const hasChanges = title !== originalData.title || description !== originalData.description;

		if (hasChanges) {
			enqueueSnackbar('You have unsaved changes. Leaving now will discard them.', { variant: 'warning' });
			return;
		}
		navigate('/Alljournal');
	};

	return (
		<ScreenWrapper>
			<FormCard>
				<HeaderSection>
					<TitleGroup>
						<IconCircle>
							<EditNoteIcon sx={{ color: '#fff', fontSize: 20 }} />
						</IconCircle>
						<Typography sx={{ fontSize: 18, fontWeight: 600, color: '#000' }}>Edit Journal</Typography>
					</TitleGroup>
					<IconButton onClick={handleExit}>
						<CloseIcon sx={{ color: '#000' }} />
					</IconButton>
				</HeaderSection>

				<StyledInput label='Date' variant='outlined' fullWidth value={date} disabled />

				<StyledInput
					label='Title'
					variant='outlined'
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Enter a title'
				/>

				<StyledInput
					label='Description'
					variant='outlined'
					fullWidth
					multiline
					minRows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Write what you feel...'
				/>

				<SaveButtonWrapper>
					<SaveButton onClick={handleSave}>
						<IconCircle bgcolor='#4B4B4B'>
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
	backgroundColor: '#F5F5F5',
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

const IconCircle = styled(Box)(({ bgcolor = '#4B4B4B' }) => ({
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
	backgroundColor: '#4B4B4B',
	borderRadius: '12px',
	cursor: 'pointer',
	fontSize: '16px',
	fontWeight: 500,
	textTransform: 'none',
	color: '#fff',
	fontFamily: '"Manrope", sans-serif',
	'&:hover': {
		backgroundColor: '#333',
		opacity: 0.95,
	},
});
