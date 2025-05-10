import React from 'react';
import Menu from '../../components/Menu/menu';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './journal.css';
import JournalForm from '../../components/Journal/journalForms';
import ReminderCard from '../../components/Cards/remainder';
import ImageCarousel from '../../components/Cards/imageCarousel';
import { useNavigate } from 'react-router-dom';
function Journal() {
	let navigate = useNavigate();
	const goLogin = () => {
		navigate('/log');
	};
	return (
		<div className='journal-container'>
			<Menu />
			<div className='journal-content'>
				<div className='journal-header'>
					<Header2 title='My journal' subtitle='Write your thoughts of the day.' />
					<div className='journal-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				</div>

				{/* Grid principal */}
				<div className='journal-main-grid'>
					<div className='journal-left'>
						<JournalForm compact />
					</div>

					<div className='journal-right'>
						<div className='journal-reminder'>
							<ReminderCard />
						</div>
						<div className='journal-carousel'>
							<ImageCarousel />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Journal;
