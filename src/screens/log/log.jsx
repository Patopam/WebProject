import { Typography, Container, Stack, Box } from '@mui/material';
import BotonStart from '../../components/Buttons/botonesStart';
import BotonStartGoogle from '../../components/Buttons/botonStartGoogle';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Inputs from '../../components/Inputs/Inputs';
import { useDispatch } from 'react-redux';
import { setUserid } from '../../redux/UserSlice/UserSlice';
import './log.css';

function Log() {
	const dispatch = useDispatch();
	const [Correo, setCorreo] = useState('');
	const [Constraseña, setConstraseña] = useState('');
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

	const Navigate = useNavigate();
	const provider = new GoogleAuthProvider();

	// Add resize event listener to handle responsive states
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 767);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const SingUpGoogle = () => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;

				const user = result.user;
				dispatch(setUserid(user.uid));
				console.log(user);

				Navigate('/dashboard');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	const Summit = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, Correo, Constraseña)
			.then((userCredential) => {
				const user = userCredential.user;

				// ✅ Guardar en Redux
				dispatch(setUserid(user.uid));

				// ✅ Guardar también en localStorage
				localStorage.setItem('uid', user.uid);

				console.log('UID guardado en localStorage:', user.uid);

				// ✅ Redirigir
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
			<Container className='Container-log' maxWidth={false} disableGutters>
				<Stack spacing={isMobile ? 2 : 3}>
					<Box>
						<Typography variant='h2' sx={styleText.Titulo}>
							Welcome back
						</Typography>
						<Typography sx={styleText.Centrado}>
							Your emotions, habits and growth right where you left them.{' '}
						</Typography>
					</Box>
					<Box sx={{ width: '100%' }}>
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
								<Box sx={{ width: '100%' }}>
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
