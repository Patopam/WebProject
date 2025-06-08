import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '../../components/Menu/menu';
import Inputs from '../../components/Inputs/Inputs';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import LogoutIcon from '@mui/icons-material/Logout';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import { useNavigate } from 'react-router-dom';
import { updateUserData, getUserData, updateUserPassword } from '../../services/firebaseUtils';
import { setUserName } from '../../redux/UserSlice/NameSlice';
import { FaRegEyeSlash } from 'react-icons/fa';
import './settings.css';

function Settings() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [showCurrentPasswordInput, setShowCurrentPasswordInput] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const [originalName, setOriginalName] = useState('');
	const [originalEmail, setOriginalEmail] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.userId.id);
	const userName = useSelector((state) => state.userName.name);

	const showMessage = (message, isError = false) => {
		if (isError) {
			setErrorMessage(message);
			setSuccessMessage('');
		} else {
			setSuccessMessage(message);
			setErrorMessage('');
		}

		setTimeout(() => {
			setSuccessMessage('');
			setErrorMessage('');
		}, 3000);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const loadUserData = async () => {
			if (!userId) {
				showMessage('User not authenticated', true);
				return;
			}

			setLoading(true);
			try {
				const userData = await getUserData(userId);
				if (userData) {
					setName(userData.name || '');
					setEmail(userData.email || '');
					setOriginalName(userData.name || '');
					setOriginalEmail(userData.email || '');
				} else {
					showMessage('No user data found', true);
				}
			} catch (error) {
				console.error('Error loading user data:', error);
				showMessage('Error loading user data: ' + error.message, true);
			} finally {
				setLoading(false);
			}
		};

		loadUserData();
	}, [userId]);

	useEffect(() => {
		const emailChanged = email.trim() !== originalEmail;
		setShowCurrentPasswordInput(emailChanged);
		if (!emailChanged) {
			setCurrentPassword('');
		}
	}, [email, originalEmail]);

	const validateInputs = () => {
		const nameChanged = name.trim() !== originalName;
		const emailChanged = email.trim() !== originalEmail;
		const passwordChanged = newPassword.trim() !== '';

		if (!nameChanged && !emailChanged && !passwordChanged) {
			showMessage('No changes to save', true);
			return false;
		}

		if (nameChanged && !name.trim()) {
			showMessage('Name cannot be empty', true);
			return false;
		}

		if (emailChanged && !email.trim()) {
			showMessage('Email cannot be empty', true);
			return false;
		}

		if (emailChanged && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			showMessage('Please enter a valid email address', true);
			return false;
		}

		if (emailChanged && !currentPassword.trim()) {
			setShowCurrentPasswordInput(true);
			showMessage('Current password is required to update email', true);
			return false;
		}

		if (passwordChanged) {
			if (newPassword.length < 6) {
				showMessage('Password must be at least 6 characters long', true);
				return false;
			}
			if (newPassword !== confirmPassword) {
				showMessage('Passwords do not match', true);
				return false;
			}
		}

		return true;
	};

	const handleSave = async () => {
		if (!userId) {
			showMessage('User not authenticated', true);
			return;
		}

		if (!validateInputs()) {
			return;
		}

		setIsSaving(true);

		try {
			const nameChanged = name.trim() !== originalName;
			const emailChanged = email.trim() !== originalEmail;
			const passwordChanged = newPassword.trim() !== '';

			if (nameChanged || emailChanged) {
				await updateUserData({
					uid: userId,
					name: name.trim(),
					email: email.trim(),
					currentPassword: emailChanged ? currentPassword : null,
				});

				if (nameChanged) {
					dispatch(setUserName(name.trim()));
				}

				setOriginalName(name.trim());
				setOriginalEmail(email.trim());
			}

			if (passwordChanged) {
				await updateUserPassword(newPassword);
				setNewPassword('');
				setConfirmPassword('');
			}

			setCurrentPassword('');
			setShowCurrentPasswordInput(false);

			showMessage('Settings saved successfully!');
		} catch (error) {
			console.error('Error saving settings:', error);

			let errorMsg = 'Error saving settings: ';
			if (error.message.includes('Current password is required')) {
				setShowCurrentPasswordInput(true);
				errorMsg += 'Please enter your current password to update email.';
			} else if (error.message.includes('Current password is incorrect')) {
				errorMsg += 'Current password is incorrect.';
			} else if (error.message.includes('log in again')) {
				errorMsg += 'Please log out and log in again to update your email.';
			} else {
				errorMsg += error.message;
			}

			showMessage(errorMsg, true);
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setName(originalName);
		setEmail(originalEmail);
		setNewPassword('');
		setConfirmPassword('');
		setCurrentPassword('');
		setShowCurrentPasswordInput(false);
		setSuccessMessage('');
		setErrorMessage('');
		navigate(-1);
	};

	const handleLogout = () => navigate('/log');

	if (loading) {
		return (
			<div className='settings-container'>
				{!isMobile && <Menu />}
				<div className='settings-content'>
					<div className='loading-container'>
						<p>Loading user data...</p>
					</div>
				</div>
				{isMobile && <MobileNavBar />}
			</div>
		);
	}

	return (
		<div className='settings-container'>
			{!isMobile && <Menu />}
			<div className='settings-content'>
				<div className='settings-header'>
					<Header2 title='Settings' subtitle='User profile' showEmoji={false} />
					{!isMobile && (
						<div className='settings-icons'>
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={handleLogout} />
						</div>
					)}
				</div>

				{successMessage && <div className='message success-message'>{successMessage}</div>}
				{errorMessage && <div className='message error-message'>{errorMessage}</div>}

				<div className='profile-section'>
					<div className='profile-info'>
						<h2 className='profile-name'>{name || 'User'}</h2>
						<p className='profile-subtitle'>{email}</p>
					</div>
				</div>

				<div className='divider'></div>

				<div className='full-width'>
					<p className='input-label'>Name</p>
					<Inputs type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div className='full-width'>
					<p className='input-label'>Email Address</p>
					<Inputs
						type='email'
						placeholder={originalEmail || 'Enter your email'}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				{showCurrentPasswordInput && (
					<div className='full-width'>
						<p className='input-label'>Current Password</p>
						<Inputs
							type='password'
							icon={<FaRegEyeSlash />}
							placeholder='Enter your current password'
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
						<small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block' }}>
							Required to update email address
						</small>
					</div>
				)}

				<div className='divider'></div>

				<div className='form-grid'>
					<div className='form-column'>
						<p className='input-label'>New Password</p>
						<Inputs
							type='password'
							icon={<FaRegEyeSlash />}
							placeholder='Enter new password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</div>
					<div className='form-column'>
						<p className='input-label'>Confirm Password</p>
						<Inputs
							type='password'
							icon={<FaRegEyeSlash />}
							placeholder='Confirm new password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
				</div>

				<div className='buttons-container'>
					<button className='cancel-button' onClick={handleCancel} disabled={isSaving}>
						Cancel
					</button>
					<button className='save-button' onClick={handleSave} disabled={isSaving}>
						{isSaving ? 'Saving...' : 'Save Changes'}
					</button>
				</div>
			</div>
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Settings;
