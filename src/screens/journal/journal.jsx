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
		<div className='journal-container' role='main' aria-label='principal journal area'>
			{!isMobile && <Menu role='navigation' aria-label='Menu' />}
			<div className='journal-content'>
				<div className='journal-header'>
					<Header2
						title='My journal'
						subtitle='Write your thoughts of the day.'
						role='banner'
						aria-label='Diary header with title and subtitle'
					/>
					{!isMobile && (
						<div className='journal-icons' role='toolbar' aria-label='Login and settings icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='go to user settings' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='log out' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='journal-main-grid' role='region' aria-label='diary main content area'>
					{isMobile && (
						<div className='journal-scroll-cards' role='complementary' aria-label='cards with important reminders'>
							<ReminderCard aria-label='cards with important remainder' />
						</div>
					)}

					<div className='journal-left' role='region' aria-label='form area for writing journal entries'>
						<JournalForm compact aria-label='form' />
					</div>

					{!isMobile && (
						<div
							className='journal-right'
							role='complementary'
							aria-label='aditional content area with reminders and images'
						>
							<div className='journal-reminder' role='region' aria-label='reminder card with daily tips'>
								<ReminderCard aria-label='Card with important information' />
							</div>
							<div className='journal-carousel' role='region' aria-label='gallery of motivational images'>
								<ImageCarousel aria-label='images carrusel' />
							</div>
						</div>
					)}
				</div>
			</div>
			{isMobile && <MobileNavBar className='mobile-navbar' role='navigation' aria-label='navigation bar' />}
		</div>
	);
}

export default Journal;
