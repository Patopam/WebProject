import React from 'react';
import Menu from '../../components/Menu/menu';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import JournalView from '../../components/Journal/journalView';
import './allJournal.css';

function AllJournal() {
	return (
		<div className='journal-container'>
			<Menu />
			<div className='journal-content'>
				<div className='journal-header'>
					<Header title='All my journals' subtitle='Look back at what you’ve felt, written and lived.' />
					<div className='journal-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>

				<div className='journal-view'>
					<JournalView />
				</div>
			</div>
		</div>
	);
}

export default AllJournal;
