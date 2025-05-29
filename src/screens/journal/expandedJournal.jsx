import { useState, useEffect } from 'react';
import JournalForm from '../../components/Journal/journalForms';
import { Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ExpandedJournalContainer = styled(Box)(() => ({
	padding: '24px',
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#fff8e1',

	'@media (max-width: 1024px)': {
		padding: '16px',
	},
	'@media (max-width: 767px)': {
		padding: '12px',
	},
	'@media (max-width: 425px)': {
		padding: '8px',
	},
}));

const BackButtonContainer = styled(Box)(() => ({
	position: 'absolute',
	top: '24px',
	left: '24px',
	zIndex: 10,
	display: 'none',

	'@media (max-width: 1024px)': {
		display: 'flex',
		top: '16px',
		left: '16px',
	},

	'@media (max-width: 425px)': {
		top: '12px',
		left: '12px',
	},
}));

const BackButton = styled(Box)(() => ({
	backgroundColor: '#fde3a7',
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
	'@media (max-width: 425px)': {
		width: '36px',
		height: '36px',
	},
}));

function ExpandedJournal() {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<ExpandedJournalContainer>
			{isMobile && (
				<BackButtonContainer>
					<BackButton onClick={handleBack}>
						<ArrowBackIcon sx={{ color: '#000', fontSize: 24 }} />
					</BackButton>
				</BackButtonContainer>
			)}
			<JournalForm compact={false} />
		</ExpandedJournalContainer>
	);
}
export default ExpandedJournal;
