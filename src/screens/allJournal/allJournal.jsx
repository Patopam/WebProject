import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/menu';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import JournalView from '../../components/Journal/journalView';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import './allJournal.css';
import { useNavigate } from 'react-router-dom';

function AllJournal() {
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

		// Inicializar
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	useEffect(() => {
		if (!isMobile) return;
		const handleIntersection = (entries) => {
			if (entries[0].isIntersecting) {
				// Si la navbar es visible, ocultamos los botones superiores
				setShowButtons(false);
			} else {
				// Si la navbar no es visible, mostramos los botones superiores
				setShowButtons(true);
			}
		};

		// Dar tiempo para que el DOM esté listo
		const timer = setTimeout(() => {
			const navbarElement = document.querySelector('.mobile-navbar');
			if (navbarElement) {
				const observer = new IntersectionObserver(handleIntersection, {
					threshold: 0.1,
				});
				observer.observe(navbarElement);
				return () => observer.disconnect();
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [isMobile]);

	return (
		<div className='journal-container'>
			{/* Menú lateral solo visible en desktop */}
			{!isMobile && <Menu />}
			<div className='journal-content'>
				{/* Iconos móviles encima del header */}
				{isMobile && showButtons && (
					<div className='journal-mobile-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				)}
				<div className='journal-header'>
					<Header2 title='All my journals' subtitle='Look back at what you’ve felt, written and lived.' />
					{/* Iconos desktop en el header */}
					{!isMobile && (
						<div className='journal-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>
				<div className='journal-view'>
					<JournalView />
				</div>
			</div>
			{/* Barra de navegación móvil */}
			{isMobile && <MobileNavBar className='mobile-navbar' />}
		</div>
	);
}
export default AllJournal;
