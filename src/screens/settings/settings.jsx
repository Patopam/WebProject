import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/menu';
import Inputs from '../../components/Inputs/Inputs';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MobileNavBar from '../../components/Menu/mobileNavBar'; // Importamos la barra de navegación móvil
import { useNavigate } from 'react-router-dom';
import './settings.css';

function Settings() {
	// Detectar si estamos en móvil
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [showLogoutButton, setShowLogoutButton] = useState(true);

	// Initialize state from localStorage or with default values
	const [firstName, setFirstName] = useState(() => {
		return localStorage.getItem('firstName') || 'Name';
	});

	const [lastName, setLastName] = useState(() => {
		return localStorage.getItem('lastName') || 'LastName';
	});

	const [userName, setUserName] = useState(() => {
		return localStorage.getItem('userName') || 'UserName';
	});

	const [email, setEmail] = useState(() => {
		return localStorage.getItem('email') || '';
	});

	const [phoneNumber, setPhoneNumber] = useState(() => {
		return localStorage.getItem('phoneNumber') || '';
	});

	const navigate = useNavigate();

	// Use effect para manejar el responsive y la visualización del botón de logout
	useEffect(() => {
		// Función para actualizar el estado de isMobile
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		// Agregar event listener para el cambio de tamaño
		window.addEventListener('resize', handleResize);

		// Configurar el observer para la barra de navegación móvil
		const handleIntersection = (entries) => {
			// Si la navbar está visible (intersecting), ocultar el botón de logout
			if (entries[0].isIntersecting) {
				setShowLogoutButton(false);
			} else {
				// Si la navbar no es visible, mostrar el botón
				setShowLogoutButton(true);
			}
		};

		// Crear un observador para la barra de navegación móvil si estamos en móvil
		if (isMobile) {
			setTimeout(() => {
				const navbarElement = document.querySelector('.mobile-navbar');
				if (navbarElement) {
					const observer = new IntersectionObserver(handleIntersection, {
						threshold: 0.1, // Disparar cuando al menos el 10% de la navbar es visible
					});
					observer.observe(navbarElement);

					// Este timeout es necesario para asegurarnos de que el componente esté montado
					return () => {
						observer.disconnect();
					};
				}
			}, 100);
		}

		// Limpiar event listener cuando el componente se desmonta
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile]);

	// Save current field values to state and localStorage
	const handleSave = () => {
		// Save all user data to localStorage
		localStorage.setItem('firstName', firstName);
		localStorage.setItem('lastName', lastName);
		localStorage.setItem('userName', userName);
		localStorage.setItem('email', email);
		localStorage.setItem('phoneNumber', phoneNumber);

		console.log('Changes saved successfully');
	};

	const handleCancel = () => {
		console.log('Cancel clicked - navigating back');
		// Navigate to the previous page
		navigate(-1);
	};

	const handleLogout = () => {
		console.log('Logout clicked');
		navigate('/log');
	};

	return (
		<div className='settings-container'>
			{/* Mostrar el menú lateral solo en pantallas grandes */}
			{!isMobile && <Menu />}

			<div className='settings-content'>
				{/* Añadir el botón de logout en pantallas móviles */}
				{isMobile && showLogoutButton && (
					<div className='settings-mobile-logout'>
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={handleLogout} />
					</div>
				)}

				<div className='settings-header'>
					<Header2 title='Settings' subtitle='User profile' showEmoji={false} />

					{/* Mostrar el botón de logout en dispositivos de escritorio */}
					{isMobile && (
						<div className='settings-icons'>
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={handleLogout} />
						</div>
					)}
				</div>

				<div className='profile-section'>
					<div className='profile-info'>
						<h2 className='profile-name'>
							{firstName} {lastName}
						</h2>
						<p className='profile-subtitle'>{userName}</p>
					</div>
				</div>

				<div className='divider'></div>

				<div className='form-grid'>
					<div className='form-column'>
						<p className='input-label'>First Name</p>
						<Inputs
							type='text'
							placeholder='eg. Alaa'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className='form-column'>
						<p className='input-label'>Last Name</p>
						<Inputs
							type='text'
							placeholder='eg. Mohamed'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
				</div>

				<div className='full-width'>
					<p className='input-label'>User Name</p>
					<Inputs
						type='text'
						placeholder='eg. alaa.mohamed'
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>

				<div className='divider'></div>

				<div className='form-grid'>
					<div className='form-column'>
						<p className='input-label'>Email Address</p>
						<div className='input-with-icon'>
							<Inputs type='email' placeholder='' value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
					</div>
					<div className='form-column'>
						<p className='input-label'>Phone Number</p>
						<div className='input-with-icon'>
							<Inputs type='tel' placeholder='' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
						</div>
					</div>
				</div>

				<div className='buttons-container'>
					<button className='cancel-button' onClick={handleCancel}>
						Cancel
					</button>
					<button className='save-button' onClick={handleSave}>
						Save Changes
					</button>
				</div>
			</div>

			{/* Mostrar la barra de navegación móvil solo en pantallas pequeñas y medianas */}
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Settings;
