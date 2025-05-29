import { useEffect, useState } from 'react';
import './journal.css';
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
	const [showButtons, setShowButtons] = useState(true);
	const goLogin = () => {
		navigate('/log');
	};
	const goSettings = () => {
		navigate('/settings');
	};

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 1024;
			setIsMobile(mobile);
			if (!mobile) {
				setShowButtons(false);
			} else {
				setShowButtons(true);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	useEffect(() => {
		if (!isMobile) return;
		const navbarElement = document.querySelector('.mobile-navbar');
		if (!navbarElement) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				setShowButtons(!entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.1,
			}
		);
		observer.observe(navbarElement);
		return () => {
			observer.disconnect();
		};
	}, [isMobile]);

	return (
		<div className='journal-container'>
			{!isMobile && <Menu />}
			<div className='journal-content'>
				{isMobile && showButtons && (
					<div className='journal-mobile-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				)}

				<div className='journal-header'>
					<Header2 title='My journal' subtitle='Write your thoughts of the day.' />
					{/* Iconos desktop en el header */}
					{!isMobile && (
						<div className='journal-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
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

			{/* Barra de navegación móvil */}
			{isMobile && <MobileNavBar className='mobile-navbar' />}
		</div>
	);
}
export default Journal;
