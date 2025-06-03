import { useState, useEffect } from 'react';
import Menu from '../../components/Menu/menu';
import Inputs from '../../components/Inputs/inputs';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import LogoutIcon from '@mui/icons-material/Logout';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import { useNavigate } from 'react-router-dom';
import './settings.css';

function Settings() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [firstName, setFirstName] = useState(() => localStorage.getItem('firstName') || 'Name');
	const [lastName, setLastName] = useState(() => localStorage.getItem('lastName') || 'LastName');
	const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'UserName');
	const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
	const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('phoneNumber') || '');
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleSave = () => {
		localStorage.setItem('firstName', firstName);
		localStorage.setItem('lastName', lastName);
		localStorage.setItem('userName', userName);
		localStorage.setItem('email', email);
		localStorage.setItem('phoneNumber', phoneNumber);
	};

	const handleCancel = () => navigate(-1);
	const handleLogout = () => navigate('/log');

	return (
		<div className='settings-container'>
			{!isMobile && <Menu />}
			<div className='settings-content'>
				<div className='settings-header'>
					<Header2 title='Settings' subtitle='User profile' showEmoji={false} />
					{/* Ícono de logout solo en desktop */}
					{!isMobile && (
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
							<Inputs type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
					</div>
					<div className='form-column'>
						<p className='input-label'>Phone Number</p>
						<div className='input-with-icon'>
							<Inputs type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
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
