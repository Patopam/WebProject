// src/screens/Dashboard.jsx
import React from 'react';
import AddButton from '../../components/buttons/add';
import Stack from '@mui/material/Stack';

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
			<h1>Welcome Evan!</h1>
			<p>How are you feeling today? 😊</p>

			<AddButton onClick={handleJournalClick} text={'DailyJournal'} />
			<AddButton onClick={handleSpendClick} text={'Add spending'} />

			{/* Resto del contenido del dashboard */}
		</div>
	);
}

export default Dashboard;
