import React from 'react';
import MoodTracker from '../../components/Tables/mood';
import Menu from '../../components/Menu/menu';
import ReminderCard from '../../components/Cards/remainder';
import GoalProgressCard from '../../components/Cards/goal';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';

function Emotions() {
	return (
		<div className='emotions-container'>
			<Menu />
			<MoodTracker />
			<ReminderCard />
			<GoalProgressCard />
			<div className='header-section'>
				<Header title='Welcome Evan!' subtitle='How are you feeling today?' emoji='😊' />
				<div className='icon-buttons'>
					<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
					<CustomIconButton icon={<LogoutIcon />} ariaLabel='logut' />
				</div>
			</div>
		</div>
	);
}

export default Emotions;
