import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import MoodTracker from '../../components/Tables/mood';
import Menu from '../../components/Menu/menu';
import Skeleton from '@mui/material/Skeleton';
import ImageCarousel from '../../components/Cards/imageCarousel';
import RecommendationDay from '../../components/Cards/recommendationDay';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import MobileNavBar from '../../components/Menu/mobileNavBar'; // Importamos la barra de navegación móvil
import './emotions.css';
import { useNavigate } from 'react-router-dom';

function Emotions() {
	const [ultimaEmocion, setUltimaEmocion] = useState('');
	const uid = useSelector((state) => state.userId.id);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [showButtons, setShowButtons] = useState(true);
	let navigate = useNavigate();

	useEffect(() => {
		if (!uid) return;

		const fetchLastEmotion = async () => {
			try {
				const journalsRef = collection(db, `users/${uid}/journals`);
				const q = query(journalsRef, orderBy('date', 'desc'), limit(1));
				const querySnapshot = await getDocs(q);

				if (!querySnapshot.empty) {
					const data = querySnapshot.docs[0].data();
					const traducciones = {
						feliz: 'happy',
						triste: 'sad',
						enojado: 'angry',
						estresado: 'stressed',
						confundido: 'confused',
						ansioso: 'anxious',
					};
					const emocionOriginal = data.emotion?.toLowerCase?.() || '';
					const emocionTraducida = traducciones[emocionOriginal] || emocionOriginal || 'neutral';
					setUltimaEmocion(emocionTraducida);
				}
			} catch (error) {
				console.error('Error fetching last emotion:', error);
			}
		};

		fetchLastEmotion();

		// Función para actualizar el estado de isMobile cuando cambia el tamaño de la ventana
		const handleResize = () => {
			const mobile = window.innerWidth <= 1024;
			setIsMobile(mobile);
			setShowButtons(!mobile); // Siempre mostrar botones en desktop
		};

		// Llamar handleResize una vez para inicializar correctamente
		handleResize();

		// Agregar event listener para el cambio de tamaño
		window.addEventListener('resize', handleResize);

		// Definir un punto de entrada para el observador de intersección
		const handleIntersection = (entries) => {
			// Si la navbar está visible (intersecting), ocultar los botones
			if (entries[0].isIntersecting) {
				setShowButtons(false);
			} else {
				// Si estamos en móvil pero la navbar no es visible, mostrar los botones
				setShowButtons(isMobile);
			}
		};

		// Crear un observador para la barra de navegación móvil
		if (isMobile) {
			const navbarElement = document.querySelector('.mobile-navbar');
			if (navbarElement) {
				const observer = new IntersectionObserver(handleIntersection, {
					threshold: 0.1, // Disparar cuando al menos el 10% de la navbar es visible
				});
				observer.observe(navbarElement);

				// Limpiar observador
				return () => {
					observer.disconnect();
				};
			}
		}

		// Limpiar event listener cuando el componente se desmonta
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [uid, isMobile]);

	const goLogin = () => {
		navigate('/log');
	};

	const goSettings = () => {
		navigate('/settings');
	};

	return (
		<div className='emotions-container'>
			{/* Mostrar el menú lateral solo en pantallas grandes */}
			{!isMobile && <Menu />}

			<div className='emotions-content'>
				{/* Mobile/iPad icons above header - solo mostrar si showButtons es true */}
				{isMobile && showButtons && (
					<div className='emotions-mobile-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				)}

				<div className='emotions-header'>
					<Header2 title='My emotions' subtitle='Look at your history of your emotions.' />
					{/* Desktop icons - only show on non-mobile */}
					{!isMobile && (
						<div className='emotions-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='emotions-main-grid'>
					<div className='emotions-left'>
						<MoodTracker />
					</div>
					<div className='emotions-right'>
						{ultimaEmocion ? (
							<RecommendationDay emotion={ultimaEmocion} />
						) : (
							<Skeleton
								variant='rectangular'
								animation='wave'
								width='100%'
								height='14.875rem'
								sx={{ borderRadius: '1.5rem', backgroundColor: '#fdd1bc' }}
							/>
						)}
						<div className='journal-carousel'>
							<ImageCarousel />
						</div>
					</div>
				</div>
			</div>

			{/* Mostrar la barra de navegación móvil solo en pantallas pequeñas y medianas */}
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Emotions;
