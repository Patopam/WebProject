import './journal.css';
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '../../components/Menu/menu';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import JournalForm from '../../components/Journal/journalForms';
import ReminderCard from '../../components/Cards/remainder';
import ImageCarousel from '../../components/Cards/imageCarousel';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import { useNavigate } from 'react-router-dom';

function Journal() {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	const goLogin = () => {
		navigate('/log');
	};

	const goSettings = () => {
		navigate('/settings');
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='journal-container'>
			{!isMobile && <Menu />}
			<div className='journal-content'>
				{/* Solo íconos para desktop */}
				<div className='journal-header'>
					<Header2 title='My journal' subtitle='Write your thoughts of the day.' />
					{!isMobile && (
						<div className='journal-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>

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
			{isMobile && <MobileNavBar className='mobile-navbar' />}
		</div>
	);
}

export default Journal;
