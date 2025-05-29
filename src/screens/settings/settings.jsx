import { useState, useEffect } from 'react';
import Menu from '../../components/Menu/menu';
import Inputs from '../../components/Inputs/inputs';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import LogoutIcon from '@mui/icons-material/Logout';
import MobileNavBar from '../../components/Menu/mobileNavBar'; // Importamos la barra de navegación móvil
import { useNavigate } from 'react-router-dom';
import './settings.css';

function Settings() {
	// Detectar si estamos en móvil
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [showLogoutButton, setShowLogoutButton] = useState(true);
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

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};
		window.addEventListener('resize', handleResize);
		const handleIntersection = (entries) => {
			if (entries[0].isIntersecting) {
				setShowLogoutButton(false);
			} else {
				setShowLogoutButton(true);
			}
		};
		if (isMobile) {
			setTimeout(() => {
				const navbarElement = document.querySelector('.mobile-navbar');
				if (navbarElement) {
					const observer = new IntersectionObserver(handleIntersection, {
						threshold: 0.1,
					});
					observer.observe(navbarElement);
					return () => {
						observer.disconnect();
					};
				}
			}, 100);
		}
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile]);
	const handleSave = () => {
		localStorage.setItem('firstName', firstName);
		localStorage.setItem('lastName', lastName);
		localStorage.setItem('userName', userName);
		localStorage.setItem('email', email);
		localStorage.setItem('phoneNumber', phoneNumber);
	};

	const handleCancel = () => {
		console.log('Cancel clicked - navigating back');
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
			{isMobile && <MobileNavBar />}
		</div>
	);
}
export default Settings;
