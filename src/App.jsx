import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { store } from './redux/store.js';
import Router from './routers/router';

function App() {
	return (
		<Provider store={store}>
			<SnackbarProvider maxSnack={3} autoHideDuration={1700} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Router />
			</SnackbarProvider>
		</Provider>
	);
}

export default App;
