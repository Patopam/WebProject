import React from 'react';
import AddButton from '../../components/Buttons/add';
import Header from '../../components/Header/header';
import ReminderCard from '../../components/Cards/remainder';
import GoalProgressCard from '../../components/Cards/goal';
import EmotionWeek from '../../components/Cards/emotionWeek';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FeelingsCard from '../../components/Cards/FeelingsCard';
import Menu from '../../components/Menu/menu';
import '../dashboard/style.css';

function Dashboard() {
	// Funciones para manejar los clics
	const handleJournalClick = () => {
		console.log('Daily journal clicked');
	};

	const handleSpendClick = () => {
		console.log('Add spend clicked');
	};

	return (
		<div className='dashboard-container'>
			<Menu />
			<FeelingsCard />
			<Header title='Welcome Evan!' subtitle='How are you feeling today?' emoji='😊' />
			<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
			<CustomIconButton icon={<LogoutIcon />} ariaLabel='logut' />
			<ReminderCard title='Understanding yourself starts here!' />
			<GoalProgressCard spent={150000} total={200000} compact={true} />
			<EmotionWeek />
			<AddButton onClick={handleJournalClick} text={'DailyJournal'} />
			<AddButton onClick={handleSpendClick} text={'Add spending'} />
		</div>
	);
}

export default Dashboard;
