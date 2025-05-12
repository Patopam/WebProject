import { Typography, Container, Stack, Box } from '@mui/material';
import BotonStart from '../../components/Buttons/botonesStart';
import BotonStartGoogle from '../../components/Buttons/botonStartGoogle';
import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import Inputs from '../../components/Inputs/Inputs';
import { FaRegEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { saveUserData } from '../../services/firebaseUtils';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { setUserid } from '../../redux/UserSlice/UserSlice';
import './sign.css';

function Sign() {
	const [Usuario, setUsuario] = useState('');
	const [Correo, setCorreo] = useState('');
	const [Constraseña, setConstraseña] = useState('');

	const dispatch = useDispatch();
	const Navigate = useNavigate();

	const Summit = (e) => {
		e.preventDefault();

		createUserWithEmailAndPassword(auth, Correo, Constraseña)
			.then(async (userCredential) => {
				const user = userCredential.user;

				await saveUserData({
					uid: user.uid,
					name: Usuario,
					email: Correo,
				});

				dispatch(setUserid(user.uid));
				console.log('UID guardado en Redux desde registro:', user.uid);

				Navigate('/log');
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
				alert(error.message);
			});
	};

	const styleText = {
		Centrado: {
			color: '#000000',
			fontFamily: 'Manrope, sans-serif',
			fontSize: '20px',
			fontWeight: 400,
			marginTop: '20px',
			textAlign: 'center',
		},
		NoCentrado: {
			color: '#000000',
			fontFamily: 'Manrope, sans-serif',
			fontSize: '20px',
			fontWeight: 400,
			marginTop: '20px',
		},
		Titulo: {
			color: '#000000',
			fontFamily: 'Manrope, sans-serif',
			fontWeight: 400,
			marginTop: '20px',
			textAlign: 'center',
		},
	};

	return (
		<>
			<Container className='Container-sign' sx={{ width: 500 }}>
				<Box>
					<Typography variant='h2' sx={styleText.Titulo}>
						Register
					</Typography>
					<Typography sx={styleText.Centrado}>
						Join Sense and take control of your emotional and financial habit.
					</Typography>
				</Box>
				<Box>
					<form onSubmit={Summit}>
						<Stack spacing={3}>
							<Inputs
								value={Usuario}
								onChange={(e) => setUsuario(e.target.value)}
								label='Usuario'
								placeholder='Write your name *'
							/>
							<Inputs
								value={Correo}
								onChange={(e) => setCorreo(e.target.value)}
								label='Usuario'
								placeholder='Write your email *'
							/>
							<Inputs
								type='password'
								icon={<FaRegEyeSlash />}
								value={Constraseña}
								onChange={(e) => setConstraseña(e.target.value)}
								placeholder={'Write your password *'}
							/>

							<Box sx={{ width: 460 }}>
								<Stack spacing={3}>
									<BotonStart text='Create your account' />
									<BotonStartGoogle text='Connect with Google' />
								</Stack>
								<Typography sx={styleText.Centrado}>
									<Link to='/log'>Do you have an account? Log in</Link>
								</Typography>
							</Box>
						</Stack>
					</form>
				</Box>
			</Container>
		</>
	);
}

export default Sign;
