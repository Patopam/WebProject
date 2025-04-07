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
import ExpensesTable from '../../components/Tables/expensesTable';
import expensesData from '../../Data/expensesData';
import './style.css';

function Dashboard() {
	const handleJournalClick = () => {
		console.log('Daily journal clicked');
	};

	const handleSpendClick = () => {
		console.log('Add spend clicked');
	};

	return (
		<div className='dashboard-container'>
			<Menu />
			<div className='dashboard-content'>
				<div className='dashboard-header'>
					<Header title='Welcome Evan!' subtitle='How are you feeling today?' emoji='😊' />
					<div className='dashboard-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>

				<div className='dashboard-buttons'>
					<AddButton onClick={handleJournalClick} text={'Daily journal'} />
					<AddButton onClick={handleSpendClick} text={'Add spend'} />
				</div>

				{/* Top row with three equal cards */}
				<div className='dashboard-cards-row'>
					<ReminderCard />
					<FeelingsCard compact={true} />
					<GoalProgressCard spent={150000} total={200000} compact={true} />
				</div>

				{/* Bottom row with expenses table on left and emotion week on right */}
				<div className='dashboard-bottom-row'>
					<div className='expenses-container'>
						<ExpensesTable data={expensesData} dashboard={true} />
					</div>
					<div className='emotion-container'>
						<EmotionWeek dashboard={true} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
