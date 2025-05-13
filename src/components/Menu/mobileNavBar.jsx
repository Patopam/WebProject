import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileNavBar.css';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';

const MobileNavBar = () => {
	const location = useLocation();

	// Función para verificar si la ruta actual coincide con el enlace
	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<div className='mobile-navbar'>
			<Link to='/dashboard' className={`mobile-nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
				<HomeOutlinedIcon />
				<span>Dashboard</span>
			</Link>

			<Link to='/journal' className={`mobile-nav-item ${isActive('/journal') ? 'active' : ''}`}>
				<PersonOutlineOutlinedIcon />
				<span>Journal</span>
			</Link>

			<Link to='/add' className={`mobile-nav-item add-item ${isActive('/add') ? 'active' : ''}`}>
				<div className='add-button'>
					<AddCircleOutlineIcon fontSize='large' />
				</div>
				<span>Add</span>
			</Link>

			<Link to='/calendar' className={`mobile-nav-item ${isActive('/calendar') ? 'active' : ''}`}>
				<CalendarTodayIcon />
				<span>Calendar</span>
			</Link>

			<Link to='/analytics' className={`mobile-nav-item ${isActive('/analytics') ? 'active' : ''}`}>
				<LeaderboardOutlinedIcon />
				<span>Analytics</span>
			</Link>
		</div>
	);
};

export default MobileNavBar;
