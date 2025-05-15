import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/menu';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './journal.css';
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

	// Efecto para detectar el tamaño de la pantalla
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 1024;
			setIsMobile(mobile);
			// En desktop siempre mostramos los botones en el header
			if (!mobile) {
				setShowButtons(false);
			} else {
				setShowButtons(true);
			}
		};

		// Inicializar
		handleResize();

		// Listener para cambios de tamaño
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// Efecto para manejar la visibilidad de los botones basado en la navbar
	useEffect(() => {
		if (!isMobile) return;

		const navbarElement = document.querySelector('.mobile-navbar');
		if (!navbarElement) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				setShowButtons(!entry.isIntersecting); // ocultar si está visible
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
