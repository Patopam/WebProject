// src/screens/Dashboard.jsx
import React from 'react';
import AddButton from '../../components/Buttons/add';
import Header from '../../components/Header/header';
import ReminderCard from '../../components/Cards/remainder';
import GoalProgressCard from '../../components/Cards/goal';
import EmotionWeek from '../../components/Cards/emotionWeek';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '../../components/Menu/menu';
import '../dashboard/style.css';

function Dashboard() {
	// Funciones para manejar los clics
	const handleJournalClick = () => {
		console.log('Daily journal clicked');
		// Tu lógica aquí
	};

	const handleSpendClick = () => {
		console.log('Add spend clicked');
		// Tu lógica aquí
	};

	return (
		<div className='dashboard-container'>
			{/* Menu lateral */}
			<div className='sidebar'>
				<Menu />
			</div>

			{/* Contenido principal */}
			<div className='main-content'>
				{/* Sección de cabecera con iconos de usuario */}
				<div className='header-section'>
					<Header title='Welcome Evan!' subtitle='How are you feeling today?' emoji='😊' />
					<div className='icon-buttons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logut' />
					</div>
				</div>

				{/* Botones de acción */}
				<div className='buttons-section'>
					<AddButton onClick={handleJournalClick} text={'Daily journal'} />
					<AddButton onClick={handleSpendClick} text={'Add spend'} />
				</div>

				{/* Primera fila de tarjetas */}
				<div className='cards-row-1'>
					{/* Tarjeta de recordatorio */}
					<ReminderCard title='Understanding yourself starts here!' />

					{/* Espacio para el componente de Finanzas */}
					<div className='finances-placeholder'>{/* Aquí irá el componente FinancesCard cuando lo crees */}</div>

					{/* Tarjeta de progreso de objetivos */}
					<GoalProgressCard spent={150000} total={200000} compact={true} />
				</div>

				{/* Segunda fila de tarjetas */}
				<div className='cards-row-2'>
					{/* Espacio para el componente de Gastos */}
					<div className='expenses-placeholder'>{/* Aquí irá el componente ExpensesCard cuando lo crees */}</div>

					{/* Tarjeta de emociones semanales */}
					<EmotionWeek />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
