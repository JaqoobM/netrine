import './App.css';
import { Routes, Route } from 'react-router';
import Transactions from './features/Transactions/pages/Transactions';
import SignUpPage from './features/Auth/pages/SignUpPage';
import SignInPage from './features/Auth/pages/SignInPage';
import AppLayout from './layouts/AppLayout/AppLayout';
import Wallets from './features/Wallets/pages/Wallets';

export default function App() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path='transactions' element={<Transactions />} />
				<Route path='signup' element={<SignUpPage />} />
				<Route path='signin' element={<SignInPage />} />
				<Route path='wallets' element={<Wallets />} />
			</Route>
		</Routes>
	);
}
