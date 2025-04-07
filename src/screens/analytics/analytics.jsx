import React from 'react';
import Menu from '../../components/Menu/menu';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './finance.css';

function Emotions() {
	return (
		<div className='analytics-container'>
			<Menu />
			<div className='analytics-content'>
				<div className='analytics-header'>
					<Header title='Finance' subtitle='Here you will find your stats.' />
					<div className='analytics-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Emotions;
