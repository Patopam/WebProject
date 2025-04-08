import React from 'react';
import Menu from '../../components/Menu/menu';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './analytics.css';

function Analytics() {
	return (
		<div className='analytics-container'>
			<Menu />
			<div className='analytics-content'>
				<div className='analytics-header'>
					<Header title='Analytics' subtitle='Set goals and look at your track record.' />
					<div className='analytics-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Analytics;
