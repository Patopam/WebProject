import './allJournal.css';
import { useEffect, useState } from 'react';
import Menu from '../../components/Menu/menu';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import JournalView from '../../components/Journal/journalView';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import { useNavigate } from 'react-router-dom';

function AllJournal() {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	const goLogin = () => {
		navigate('/log');
	};
	const goSettings = () => {
		navigate('/settings');
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='journal-container'>
			{/* Menú lateral solo visible en desktop */}
			{!isMobile && <Menu />}
			<div className='journal-content'>
				<div className='journal-header'>
					<Header2 title='All my journals' subtitle='Look back at what you’ve felt, written and lived.' />
					{/* Iconos solo en versión desktop */}
					{!isMobile && (
						<div className='journal-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>
				<div className='journal-view'>
					<JournalView />
				</div>
			</div>
			{/* Barra de navegación móvil */}
			{isMobile && <MobileNavBar className='mobile-navbar' />}
		</div>
	);
}

export default AllJournal;
