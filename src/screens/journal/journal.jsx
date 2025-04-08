import React from 'react';
import Menu from '../../components/Menu/menu';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './journal.css';

function Journal() {
	return (
		<div className='journal-container'>
			<Menu />
			<div className='journal-content'>
				<div className='journal-header'>
					<Header title='My journal' subtitle='Write your thoughts of the day.' />
					<div className='journal-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Journal;
