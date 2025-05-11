import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/menu';
import Inputs from '../../components/Inputs/Inputs';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './settings.css';

function Settings() {
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
		console.log('Cancel clicked');
		// Reset form to values from localStorage
		setFirstName(localStorage.getItem('firstName') || 'Name');
		setLastName(localStorage.getItem('lastName') || 'LastName');
		setUserName(localStorage.getItem('userName') || 'UserName');
		setEmail(localStorage.getItem('email') || '');
		setPhoneNumber(localStorage.getItem('phoneNumber') || '');
	};

	const handleLogout = () => {
		console.log('Logout clicked');
		navigate('/log');
	};

	return (
		<div className='settings-container'>
			<Menu />
			<div className='settings-content'>
				<div className='settings-header'>
					<Header2 title='Settings' subtitle='User profile' showEmoji={false} />
					<div className='settings-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={handleLogout} />
					</div>
				</div>

				<div className='profile-section'>
					<div className='profile-avatar'>
						<img src='/api/placeholder/80/80' alt='User Profile' className='avatar-image' />
					</div>
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
		</div>
	);
}

export default Settings;
