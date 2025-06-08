import { useState, useEffect } from 'react';
import JournalForm from '../../components/Journal/journalForms';
import { Box, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';

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
		padding: '18px',
	},
	'@media (max-width: 425px)': {
		padding: '18px',
	},
}));

function ExpandedJournal() {
	const location = useLocation();
	const redirectTo = location.state?.redirectTo || '/journal';

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

	return (
		<ExpandedJournalContainer>
			<JournalForm compact={false} redirectTo={redirectTo} />
		</ExpandedJournalContainer>
	);
}

export default ExpandedJournal;
