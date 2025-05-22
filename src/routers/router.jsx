import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '../screens/dashboard/dashboard';
import Emotions from '../screens/emotions/emotions';
import Finance from '../screens/finance/finance';
import Analytics from '../screens/analytics/analytics';
import Journal from '../screens/journal/journal';
import AllJournal from '../screens/allJournal/allJournal';
import ExpandedJournal from '../screens/journal/expandedJournal';
import Start from '../screens/start/start';
import Log from '../screens/log/log';
import Sign from '../screens/sign/sign';
import Settings from '../screens/settings/settings';
import AddGoal from '../screens/finance/addGoal';
import AddSpending from '../screens/finance/addSpending';
import Recommendations from '../screens/recommendations/recommendation';
import ProtectedRoute from '../components/Protector/Protector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { clearUser, setUserid } from '../redux/UserSlice/UserSlice';
function Router() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setUserid(user.uid));
			} else {
				dispatch(clearUser());
			}
		});
		return () => unsubscribe();
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Start />} />
				<Route path='/sing' element={<Sign />} />
				<Route path='/log' element={<Log />} />
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/emotions'
					element={
						<ProtectedRoute>
							<Emotions />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/finance'
					element={
						<ProtectedRoute>
							<Finance />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/analytics'
					element={
						<ProtectedRoute>
							<Analytics />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/journal'
					element={
						<ProtectedRoute>
							<Journal />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/Alljournal'
					element={
						<ProtectedRoute>
							<AllJournal />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/journal/write'
					element={
						<ProtectedRoute>
							<ExpandedJournal />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/finance/add-spending'
					element={
						<ProtectedRoute>
							<AddSpending />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/finance/add-goal'
					element={
						<ProtectedRoute>
							<AddGoal />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/settings'
					element={
						<ProtectedRoute>
							<Settings />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/recommendations'
					element={
						<ProtectedRoute>
							<Recommendations />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
export default Router;
