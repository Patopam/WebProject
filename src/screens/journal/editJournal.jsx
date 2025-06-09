import { Box, styled } from '@mui/material';
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

export default function EditJournal() {
	const [setIsMobile] = useState(window.innerWidth <= 1024);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 1024);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<Container>
			<JournalForm compact={false} />
		</Container>
	);
}
