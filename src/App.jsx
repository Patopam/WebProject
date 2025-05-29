import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Router from './routers/router';
function App() {
	return (
		<>
			<Provider store={store}>
				<Router />
			</Provider>
		</>
	);
}
export default App;
