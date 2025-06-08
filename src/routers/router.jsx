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
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import EditJournal from '../screens/journal/editJournal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { clearUser, setUserId } from '../redux/UserSlice/UserSlice';
import { setUserName } from '../redux/UserSlice/NameSlice';
import { doc, getDoc } from 'firebase/firestore';

function Router() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				dispatch(setUserId(user.uid));

				const userRef = doc(db, 'users', user.uid);
				const userSnap = await getDoc(userRef);
				const name = userSnap.exists() ? userSnap.data().name : '';

				dispatch(setUserName(name || ''));
			} else {
				dispatch(clearUser());
				dispatch(setUserName(''));
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [dispatch]);

	if (loading) return null;

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
					path='/journal/edit/:id'
					element={
						<ProtectedRoute>
							<EditJournal />
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
					path='/finance/edit-spending/:id'
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
