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
		<div className='journal-container' role='main' aria-label='Página principal del diario personal'>
			{!isMobile && <Menu role='navigation' aria-label='Menú principal de navegación' />}
			<div className='journal-content'>
				<div className='journal-header'>
					<Header2
						title='My journal'
						subtitle='Write your thoughts of the day.'
						role='banner'
						aria-label='Encabezado de la sección de diario'
					/>
					{!isMobile && (
						<div className='journal-icons' role='toolbar' aria-label='Herramientas de usuario'>
							<CustomIconButton
								icon={<AccountCircleIcon />}
								ariaLabel='Ir a configuración del perfil de usuario'
								onClick={goSettings}
							/>
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='Cerrar sesión y regresar al login' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='journal-main-grid' role='region' aria-label='Contenido principal del diario'>
					{isMobile && (
						<div className='journal-scroll-cards' role='complementary' aria-label='Tarjetas de recordatorios'>
							<ReminderCard aria-label='Tarjeta con recordatorios importantes' />
						</div>
					)}

					<div className='journal-left' role='region' aria-label='Formulario de entrada del diario'>
						<JournalForm compact aria-label='Formulario para escribir nueva entrada en el diario personal' />
					</div>

					{!isMobile && (
						<div className='journal-right' role='complementary' aria-label='Panel lateral con información adicional'>
							<div className='journal-reminder' role='region' aria-label='Sección de recordatorios'>
								<ReminderCard aria-label='Tarjeta con recordatorios y consejos diarios' />
							</div>
							<div className='journal-carousel' role='region' aria-label='Galería de imágenes inspiracionales'>
								<ImageCarousel aria-label='Carrusel de imágenes motivacionales para inspirar tu escritura' />
							</div>
						</div>
					)}
				</div>
			</div>
			{isMobile && <MobileNavBar className='mobile-navbar' role='navigation' aria-label='Barra de navegación móvil' />}
		</div>
	);
}

export default Journal;
