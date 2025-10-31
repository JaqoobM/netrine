import './App.css';
import { Routes, Route } from 'react-router';
import Transactions from './features/Transactions/pages/Transactions';
import SignUpPage from './features/Auth/pages/SignUpPage';
import SignInPage from './features/Auth/pages/SignInPage';
import AppLayout from './layouts/AppLayout/AppLayout';

function App() {
	return (
		<Routes>
			<Route path='/' element={<AppLayout />}>
				<Route path='transactions' element={<Transactions />} />
				<Route path='signup' element={<SignUpPage />} />
				<Route path='signin' element={<SignInPage />} />
			</Route>
		</Routes>
	);
}

export default App;
