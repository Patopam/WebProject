import React from 'react';
import MoodTracker from '../../components/Tables/mood';
import Menu from '../../components/Menu/menu';
import ReminderCard from '../../components/Cards/remainder';
import GoalProgressCard from '../../components/Cards/goal';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './emotions.css';
import { useNavigate } from 'react-router-dom';
function Emotions() {
	let navigate = useNavigate();
	const goLogin = () => {
		navigate('/log');
	};
	return (
		<div className='emotions-container'>
			<Menu />
			<div className='emotions-content'>
				<div className='emotions-header'>
					<Header2 title='My emotions' subtitle='Look at your history of your emotions.' />
					<div className='emotions-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				</div>

				<div className='emotions-main-grid'>
					<div className='emotions-left'>
						<MoodTracker />
					</div>
					<div className='emotions-right'>
						<ReminderCard />
						<GoalProgressCard />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Emotions;
