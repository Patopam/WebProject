import { useNavigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import JournalForm from '../../components/Journal/journalForms';
import { useEffect, useState } from 'react';

const Container = styled(Box)(() => ({
	backgroundColor: '#fff8e1',
	minHeight: '100vh',
	padding: '2rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	boxSizing: 'border-box',
}));

const BackButton = styled(Box)(() => ({
	position: 'absolute',
	top: '24px',
	left: '24px',
	backgroundColor: '#f6d776',
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
	'&:hover': {
		backgroundColor: '#facd69',
	},
}));

export default function EditJournal() {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 1024);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<Container>
			{isMobile && (
				<BackButton onClick={() => navigate(-1)}>
					<ArrowBackIcon sx={{ color: '#000' }} />
				</BackButton>
			)}
			<JournalForm compact={false} />
		</Container>
	);
}
