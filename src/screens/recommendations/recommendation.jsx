import React from 'react';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '../../components/Menu/menu';
import './recommendations.css';
import { useEffect, useState } from 'react';
import { obtenerUsuario } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Recommendations() {
	const id = useSelector((state) => state.userId.id);

	console.log(id);
	let navigate = useNavigate();
	const goLogin = () => {
		navigate('/log');
	};
	const goSettings = () => {
		navigate('/settings');
	};

	const [Nombre, setNombre] = useState('Evan');
	useEffect(() => {
		setNombre(obtenerUsuario());
	}, []);

	return (
		<div className='recommendations-container'>
			<Menu />
			<div className='recommendations-content'>
				<div className='recommendations-header'>
					<Header2 title='Recommendatios' subtitle='Get recommendations with IA' />
					<div className='recommendations-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Recommendations;
