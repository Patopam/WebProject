import React from 'react';
import Menu from '../../components/Menu/menu';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './calendar.css';

function Calendar() {
	return (
		<div className='calendar-container'>
			<Menu />
			<div className='calendar-content'>
				<div className='calendar-header'>
					<Header title='My calendar' subtitle='Calendar view of your emotions.' />
					<div className='calendar-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Calendar;
