import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './screens/dashboard/dashboard';
import Emotions from './screens/emotions/emotions';
import Finance from './screens/finance/finance';
import Analytics from './screens/analytics/analytics';
import Journal from './screens/journal/journal';
import AllJournal from './screens/allJournal/allJournal';
import ExpandedJournal from './screens/journal/expandedJournal';
import Calendar from './screens/calendar/calendar';
import Start from './screens/start/start';
import Log from './screens/log/log';
import Sign from './screens/sign/sign';
import AddGoal from './screens/finance/addGoal';
import AddSpending from './screens/finance/addSpending';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Start />} />
				<Route path='/sing' element={<Sign />} />
				<Route path='/log' element={<Log />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/emotions' element={<Emotions />} />
				<Route path='/finance' element={<Finance />} />
				<Route path='/analytics' element={<Analytics />} />
				<Route path='/journal' element={<Journal />} />
				<Route path='/Alljournal' element={<AllJournal />} />
				<Route path='/journal/write' element={<ExpandedJournal />} />
				<Route path='/calendar' element={<Calendar />} />
				<Route path='/finance/add-spending' element={<AddSpending />} />
				<Route path='/finance/add-goal' element={<AddGoal />} />
			</Routes>
		</Router>
	);
}

export default App;
