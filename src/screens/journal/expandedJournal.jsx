import React from 'react';
import JournalForm from '../../components/Journal/journalForms';
import { Box, styled } from '@mui/material';

const ExpandedJournalContainer = styled(Box)({
	padding: '24px',
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#fff8e1',
});

function ExpandedJournal() {
	return (
		<ExpandedJournalContainer>
			<JournalForm compact={false} />
		</ExpandedJournalContainer>
	);
}

export default ExpandedJournal;
