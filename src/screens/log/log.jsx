import { Typography, Container, Stack, Box } from '@mui/material';
import BotonStart from '../../components/Buttons/botonStart';
import BotonStartGoogle from '../../components/Buttons/botonStartGoogle';
import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { saveUserData } from '../../services/firebaseUtils';
import Inputs from '../../components/Inputs/Inputs';
import { useDispatch } from 'react-redux';
import { setUserid } from '../../redux/UserSlice/UserSlice';
import { setUserNombre } from '../../redux/UserSlice/NombreSlice';
import './log.css';
function Log() {
	const dispatch = useDispatch();
	const [Correo, setCorreo] = useState('');
	const [Constraseña, setConstraseña] = useState('');

	const Navigate = useNavigate();
	const provider = new GoogleAuthProvider();
	const SingUpGoogle = () => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;

				const user = result.user;
				await saveUserData({
					uid: user.uid,
					name: user.displayName,
					email: user.email,
				});

				dispatch(setUserid(user.uid));
				dispatch(setUserNombre(user.displayName));
				console.log(user);

				Navigate('/dashboard');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};
	const Summit = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, Correo, Constraseña)
			.then((userCredential) => {
				const user = userCredential.user;

				dispatch(setUserid(user.uid));
				dispatch(setUserNombre(user.displayName));
				console.log(user);
				localStorage.setItem('uid', user.uid);

				console.log('UID guardado en localStorage:', user.uid);

				Navigate('/dashboard');
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	const styleText = {
		Centrado: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: 'normal',
			color: '#000000',
			marginTop: '20px',
			textAlign: 'center',
		},
		NoCentrado: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: 'normal',
			color: '#000000',
			marginTop: '20px',
		},
		Titulo: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontWeight: 400,
			color: '#000000',
			marginTop: '20px',
			textAlign: 'center',
		},
	};
	return (
		<>
			<Container className='Container-log' sx={{ width: 500 }}>
				<Stack spacing={3}>
					<Box>
						<Typography variant='h2' sx={styleText.Titulo}>
							Welcome back
						</Typography>
						<Typography sx={styleText.Centrado}>
							Your emotions, habits and growth right where you left them.{' '}
						</Typography>
					</Box>
					<Box>
						<form onSubmit={Summit}>
							<Stack spacing={3}>
								<Inputs
									value={Correo}
									onChange={(e) => setCorreo(e.target.value)}
									label='Usuario'
									placeholder='Write your email *'
								/>
								<Inputs
									type='password'
									value={Constraseña}
									onChange={(e) => setConstraseña(e.target.value)}
									placeholder={'Write your password *'}
								/>
								<Typography sx={styleText.NoCentrado}>Forgot password?</Typography>
								<Box sx={{ width: 460 }}>
									<Stack spacing={3}>
										<BotonStart text='Log In' />
										<BotonStartGoogle text='Connect with Google' onClick={SingUpGoogle} />
									</Stack>

									<Typography sx={styleText.Centrado}>
										<Link style={styleText.Centrado} to='/sing'>
											No account? Create an account
										</Link>
									</Typography>
								</Box>
							</Stack>
						</form>
					</Box>
				</Stack>
			</Container>
		</>
	);
}

export default Log;
