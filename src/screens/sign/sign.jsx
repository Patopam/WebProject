import { Typography, Container, Stack, Box } from '@mui/material';
import BotonStart from '../../components/Buttons/buttonStart';
import BotonStartGoogle from '../../components/Buttons/buttonStartGoogle';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import Inputs from '../../components/Inputs/Inputs';
import { FaRegEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { saveUserData } from '../../services/firebaseUtils';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/UserSlice/UserSlice';
import { setUserName } from '../../redux/UserSlice/NameSlice';
import './sign.css';

function Sign() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		document.body.classList.add('sign-mode');
		return () => document.body.classList.remove('sign-mode');
	}, []);

	const handleGoogleSignUp = () => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const user = result.user;
				await saveUserData({
					uid: user.uid,
					name: user.displayName,
					email: user.email,
				});
				dispatch(setUserId(user.uid));
				dispatch(setUserName(user.displayName));
				navigate('/dashboard');
			})
			.catch((error) => alert(error.message));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				await saveUserData({
					uid: user.uid,
					name: name,
					email: email,
				});
				dispatch(setUserId(user.uid));
				dispatch(setUserName(name));
				navigate('/log');
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<Container className='Container-sign'>
			<Box className='Sign-header'>
				<Typography variant='h2' className='Sign-title' sx={{ fontStyle: 'normal', fontWeight: 400 }}>
					Register
				</Typography>
				<Typography className='Sign-subtitle'>
					Join Sense and take control of your <br />
					emotional and financial habit.
				</Typography>
			</Box>

			<form onSubmit={handleSubmit} className='Sign-form'>
				<Stack spacing={2}>
					<Inputs value={name} onChange={(e) => setName(e.target.value)} label='Name' placeholder='Write your name *' />
					<Inputs
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label='Email'
						placeholder='Write your email *'
					/>
					<Inputs
						type='password'
						icon={<FaRegEyeSlash />}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Write your password *'
					/>

					<Box className='Sign-buttons'>
						<Stack spacing={1.5}>
							<BotonStart text='Create your account' />
							<BotonStartGoogle text='Connect with Google' onClick={handleGoogleSignUp} />
						</Stack>
						<Typography className='Sign-loginlink'>
							<Link to='/log'>Do you have an account? Log in</Link>
						</Typography>
					</Box>
				</Stack>
			</form>
		</Container>
	);
}

export default Sign;
