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
import ExpensesTable from '../../components/Tables/expensesTable';
import expensesData from '../../Data/expensesData';

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

				<div className='dashboard-grid'>
					{/* Fila 1 */}
					<ReminderCard title='Understanding yourself starts here!' />
					<FeelingsCard />
					<GoalProgressCard spent={150000} total={200000} compact={true} />

					{/* Fila 2 */}
					<ExpensesTable data={expensesData} />
					<EmotionWeek />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
