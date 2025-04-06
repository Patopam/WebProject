import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/dashboard/dashboard';
// Importa otras pantallas si las tienes

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				{/* Otras rutas que puedas tener */}
			</Routes>
		</Router>
	);
}

export default App;
