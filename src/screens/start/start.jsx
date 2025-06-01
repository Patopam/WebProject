import { Typography, Container, Stack, Box } from '@mui/material';
import BotonStart from '../../components/Buttons/botonStart';
import Logo from '../../assets/logoStart.png';
import BotonStartGoogle from '../../components/Buttons/botonStartGoogle';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import './start.css';

function Start() {
	const navigate = useNavigate();
	useEffect(() => {
		document.body.classList.add('start-mode');
		return () => document.body.classList.remove('start-mode');
	}, []);

	const goLogin = () => {
		navigate('/log');
	};

	const goSign = () => {
		navigate('/sing');
	};

	return (
		<Container className='container-start'>
			<div className='menu-logo'>
				<img src={Logo} alt='Sense Logo' className='logo-img' />
			</div>

			<Box className='start-buttons-wrapper'>
				<Stack spacing={1.8}>
					<BotonStart text='Log In' onClick={goLogin} />
					<BotonStart text='Create your account' onClick={goSign} />
					<BotonStartGoogle text='Connect with Google' />
				</Stack>
			</Box>

			<Box className='text-start'>
				<Typography
					sx={{
						color: '#000000',
						fontFamily: 'Manrope, sans-serif',
						fontSize: 'clamp(15px, 2.5vw, 20px)',
						fontWeight: 400,
						textAlign: 'center',
						lineHeight: 1.1,
					}}
				>
					A space that supports what you
					<br />
					feel and how you choose.
				</Typography>
			</Box>
		</Container>
	);
}
export default Start;
