import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/dashboard/dashboard';
import Emotions from './screens/emotions/emotions';
import Finance from './screens/finance/finance';
import Journal from './screens/journal/journal';
import Journal from './screens/journal/journal';


// Importa otras pantallas si las tienes

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/emotions' element={<Emotions />} />
				<Route path='/finance' element={<Finance />} />
				<Route path='/analytics' element={<Analytics />} />
				<Route path='/journal' element={<Journal />} />
			</Routes>
		</Router>
	);
}

export default App;
