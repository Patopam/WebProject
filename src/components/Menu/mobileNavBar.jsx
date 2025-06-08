import { useState } from 'react';
import './mobileNavBar.css';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LogoutIcon from '@mui/icons-material/Logout';

const MobileNavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className='menu-toggle-button' onClick={toggleMenu}>
				{isOpen ? <CloseIcon /> : <MenuRoundedIcon />}
			</div>
			<div className={`menu-container mobile-navbar ${isOpen ? 'open' : 'closed'}`}>
				<div className='menu-close-button' onClick={toggleMenu}>
					<CloseIcon />
				</div>

				<div className='menu-section'>
					<p className='section-title'>MAIN</p>
					<ul>
						<li>
							<Link to='/dashboard' className='menu-item-link'>
								<HomeOutlinedIcon />
								<span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to='/journal' className='menu-item-link'>
								<PersonOutlineOutlinedIcon />
								<span>Journal</span>
							</Link>
						</li>
						<li>
							<Link to='/Alljournal' className='menu-item-link'>
								<PhotoAlbumOutlinedIcon />
								<span>All my Journals</span>
							</Link>
						</li>
						<li>
							<Link to='/analytics/' className='menu-item-link'>
								<LeaderboardOutlinedIcon />
								<span>Analytics</span>
							</Link>
						</li>
					</ul>
				</div>

				<div className='menu-section'>
					<p className='section-title'>ACTIVITY</p>
					<ul>
						<li>
							<Link to='/emotions' className='menu-item-link'>
								<TagFacesOutlinedIcon />
								<span>My emotions</span>
							</Link>
						</li>
						<li>
							<Link to='/finance' className='menu-item-link'>
								<AttachMoneyOutlinedIcon />
								<span>Finance</span>
							</Link>
						</li>
					</ul>
					<ul>
						<li>
							<Link to='/recommendations' className='menu-item-link'>
								<FavoriteBorderRoundedIcon />
								<span>Recommendations</span>
							</Link>
						</li>
					</ul>
				</div>

				<div className='menu-section'>
					<p className='section-title'>ACCOUNT</p>
					<ul>
						<li>
							<Link to='/settings' className='menu-item-link'>
								<PersonOutlineRoundedIcon />
								<span>Settings</span>
							</Link>
						</li>
						<li>
							<Link to='/log' className='menu-item-link'>
								<LogoutIcon />
								<span>Logout</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default MobileNavBar;
