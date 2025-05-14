import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileNavBar.css';

// Importar íconos de Material UI
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';

const MobileNavBar = () => {
	const location = useLocation();

	// Función para verificar si la ruta actual coincide con el enlace
	const isActive = (path) => {
		return location.pathname === path || location.pathname.startsWith(path + '/');
	};

	return (
		<nav className='mobile-navbar'>
			<Link to='/dashboard' className={`mobile-nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
				<HomeOutlinedIcon />
				<span>Dashboard</span>
			</Link>

			<Link to='/journal' className={`mobile-nav-item ${isActive('/journal') ? 'active' : ''}`}>
				<PersonOutlineOutlinedIcon />
				<span>Journal</span>
			</Link>

			<Link to='/Alljournal' className={`mobile-nav-item add-item ${isActive('/Alljournal') ? 'active' : ''}`}>
				<PhotoAlbumOutlinedIcon />
				<span>All my Journals</span>
			</Link>

			<Link to='/analytics' className={`mobile-nav-item ${isActive('/analytics') ? 'active' : ''}`}>
				<LeaderboardOutlinedIcon />
				<span>Analytics</span>
			</Link>
		</nav>
	);
};

export default MobileNavBar;
