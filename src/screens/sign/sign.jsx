import { Typography, Container, Stack, Box } from '@mui/material';
import BotonStart from '../../components/Buttons/botonStart';
import BotonStartGoogle from '../../components/Buttons/botonStartGoogle';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import Inputs from '../../components/Inputs/Inputs';
import { FaRegEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { saveUserData } from '../../services/firebaseUtils';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { setUserid } from '../../redux/UserSlice/UserSlice';
import { setUserNombre } from '../../redux/UserSlice/NombreSlice';
import './sign.css';

function Sign() {
	const [Usuario, setUsuario] = useState('');
	const [Correo, setCorreo] = useState('');
	const [Constraseña, setConstraseña] = useState('');
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		document.body.classList.add('sign-mode');
		return () => document.body.classList.remove('sign-mode');
	}, []);

	const SingUpGoogle = () => {
		signInWithPopup(auth, provider).then(async (result) => {
			const user = result.user;
			await saveUserData({
				uid: user.uid,
				name: user.displayName,
				email: user.email,
			});
			dispatch(setUserid(user.uid), setUserNombre(user.displayName));
			Navigate('/dashboard');
		});
	};

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
				dispatch(setUserid(user.uid), setUserNombre(Usuario));
				Navigate('/log');
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<Container className='Container-sign'>
			<Box className='Sign-header'>
				<Typography
					variant='h2'
					className='Sign-title'
					sx={{
						fontStyle: 'normal',
						fontWeight: 400,
					}}
				>
					Register
				</Typography>
				<Typography className='Sign-subtitle'>
					Join Sense and take control of your <br /> emotional and financial habit.
				</Typography>
			</Box>

			<form onSubmit={Summit} className='Sign-form'>
				<Stack spacing={2}>
					<Inputs
						value={Usuario}
						onChange={(e) => setUsuario(e.target.value)}
						label='Usuario'
						placeholder='Write your name *'
					/>
					<Inputs
						value={Correo}
						onChange={(e) => setCorreo(e.target.value)}
						label='Correo'
						placeholder='Write your email *'
					/>
					<Inputs
						type='password'
						icon={<FaRegEyeSlash />}
						value={Constraseña}
						onChange={(e) => setConstraseña(e.target.value)}
						placeholder={'Write your password *'}
					/>

					<Box className='Sign-buttons'>
						<Stack spacing={1.5}>
							<BotonStart text='Create your account' />
							<BotonStartGoogle text='Connect with Google' onClick={SingUpGoogle} />
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
