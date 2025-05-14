import React, { useEffect, useState } from 'react';
import AddButton from '../../components/Buttons/add';
import Header from '../../components/Header/header';
import ReminderCard from '../../components/Cards/remainder';
import GoalProgressCard from '../../components/Cards/goal';
import EmotionWeek from '../../components/Cards/emotionWeek';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FeelingsCard from '../../components/Cards/FeelingsCard';
import Menu from '../../components/Menu/menu';
import MobileNavBar from '../../components/Menu/mobileNavBar'; // Importamos la barra de navegación móvil
import ExpensesTable from '../../components/Tables/expensesTable';
import expensesData from '../../Data/expensesData';
import './style.css';
import { obtenerUsuario } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
	const id = useSelector((state) => state.userId.id);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

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

		// Función para actualizar el estado de isMobile cuando cambia el tamaño de la ventana
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		// Agregar event listener para el cambio de tamaño
		window.addEventListener('resize', handleResize);

		// Limpiar event listener cuando el componente se desmonta
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleJournalClick = () => {
		console.log('Daily journal clicked');
		navigate('/journal/write');
	};

	const handleSpendClick = () => {
		console.log('Add spend clicked');
		navigate('/finance/add-spending');
	};

	return (
		<div className='dashboard-container'>
			{/* Mostrar el menú lateral solo en pantallas grandes */}
			{!isMobile && <Menu />}

			<div className='dashboard-content'>
				{/* Mobile/iPad icons above header */}
				{isMobile && (
					<div className='dashboard-mobile-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				)}

				<div className='dashboard-header'>
					<Header Nombre={Nombre} subtitle='How are you feeling today?' emoji='😊' />
					{/* Desktop icons - only show on non-mobile */}
					{!isMobile && (
						<div className='dashboard-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='dashboard-buttons'>
					<AddButton onClick={handleJournalClick} text={'Daily journal'} />
					<AddButton onClick={handleSpendClick} text={'Add spend'} />
				</div>

				{/* Top row with three equal cards */}
				<div className='dashboard-cards-row'>
					<ReminderCard />
					<FeelingsCard />
					<GoalProgressCard />
				</div>

				{/* Bottom row with expenses table on left and emotion week on right */}
				<div className='dashboard-bottom-row'>
					<div className='expenses-container'>
						<ExpensesTable data={expensesData} dashboard={true} />
					</div>
					<div className='emotion-container'>
						<EmotionWeek dashboard={true} />
					</div>
				</div>
			</div>

			{/* Mostrar la barra de navegación móvil solo en pantallas pequeñas y medianas */}
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Dashboard;
