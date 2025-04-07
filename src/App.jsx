import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/dashboard/dashboard';
import Emotions from './screens/emotions/emotions';
// Importa otras pantallas si las tienes

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/emotions' element={<Emotions />} />
			</Routes>
		</Router>
	);
}

export default App;
