import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Start from './screens/start/start';

function App() {
	return (
		<Router>
			<Routes>
			
				<Route path='/Start' element={<Start />} />
			</Routes>
		</Router>
	);
}

export default App;