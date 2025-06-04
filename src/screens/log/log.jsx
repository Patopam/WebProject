import { Typography, Container, Stack, Box } from '@mui/material';
import BotonStart from '../../components/Buttons/botonStart';
import BotonStartGoogle from '../../components/Buttons/botonStartGoogle';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import Inputs from '../../components/Inputs/Inputs';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { saveUserData } from '../../services/firebaseUtils';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { setUserid } from '../../redux/UserSlice/UserSlice';
import { setUserNombre } from '../../redux/UserSlice/NombreSlice';
import './log.css';

function Log() {
	const [Correo, setCorreo] = useState('');
	const [Constraseña, setConstraseña] = useState('');
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		document.body.classList.add('login-mode');
		return () => document.body.classList.remove('login-mode');
	}, []);

	const SingUpGoogle = () => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const user = result.user;
				await saveUserData({
					uid: user.uid,
					name: user.displayName,
					email: user.email,
				});
				dispatch(setUserid(user.uid));
				dispatch(setUserNombre(user.displayName));
				Navigate('/dashboard');
			})
			.catch((error) => alert(error.message));
	};

	const Summit = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, Correo, Constraseña)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch(setUserid(user.uid));
				dispatch(setUserNombre(user.displayName));
				Navigate('/dashboard');
			})
			.catch((error) => alert(error.message));
	};

	return (
		<Container className='Container-sign'>
			<Box className='Sign-header'>
				<Typography
					variant='h2'
					sx={{
						fontStyle: 'normal',
						fontWeight: 400,
					}}
					className='Sign-title'
				>
					Welcome
				</Typography>
				<Typography className='Sign-subtitle'>
					Your emotions, habits and growth <br />
					right where you left them.
				</Typography>
			</Box>

			<form onSubmit={Summit} className='Sign-form'>
				<Stack spacing={2}>
					<Inputs
						value={Correo}
						onChange={(e) => setCorreo(e.target.value)}
						label='Email'
						placeholder='Write your email *'
					/>
					<Inputs
						type='password'
						value={Constraseña}
						onChange={(e) => setConstraseña(e.target.value)}
						placeholder='Write your password *'
					/>
					<Typography className='forgot-password-text'>Forgot password?</Typography>

					<Box className='Sign-buttons'>
						<Stack spacing={1.5}>
							<BotonStart text='Log In' />
							<BotonStartGoogle text='Connect with Google' onClick={SingUpGoogle} />
						</Stack>
						<Typography className='Sign-loginlink'>
							<Link to='/sing'>No account? Create an account</Link>
						</Typography>
					</Box>
				</Stack>
			</form>
		</Container>
	);
}

export default Log;
