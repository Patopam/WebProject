import { Link } from 'react-router-dom';
import './menu.css';
import Logo from '../../assets/logo.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

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
		</div>
	);
};

export default Menu;
