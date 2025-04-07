import React from 'react';
import './Menu.css';
import Logo from '../../assets/logo.png';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Menu = () => {
	return (
		<div className='menu-container'>
			<div className='menu-logo'>
				<img src={Logo} alt='Sense Logo' className='menu-logo-img' />
			</div>

			<div className='menu-section'>
				<p className='section-title'>MAIN</p>
				<ul>
					<li>
						<HomeOutlinedIcon />
						<span>Dashboard</span>
					</li>
					<li>
						<PersonOutlineOutlinedIcon />
						<span>Journal</span>
					</li>
					<li>
						<CalendarTodayOutlinedIcon />
						<span>Calendar</span>
					</li>
					<li>
						<LeaderboardOutlinedIcon />
						<span>Analytics</span>
					</li>
				</ul>
			</div>

			<div className='menu-section'>
				<p className='section-title'>ACTIVITY</p>
				<ul>
					<li>
						<TagFacesOutlinedIcon />
						<span>My emotions</span>
					</li>
					<li>
						<AttachMoneyOutlinedIcon />
						<span>Finance</span>
					</li>
				</ul>
			</div>

			<div className='menu-section'>
				<p className='section-title'>SETTINGS</p>
				<ul>
					<li>
						<NotificationsActiveOutlinedIcon />
						<span>Notifications</span>
					</li>
					<li>
						<SettingsOutlinedIcon />
						<span>Settings</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Menu;
