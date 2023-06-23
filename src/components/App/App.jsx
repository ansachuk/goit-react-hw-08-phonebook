import { Route, Routes } from "react-router-dom";

import ContactsPage from "pages/ContactsPage/ContactsPage";
import LoginPage from "pages/LoginPage/LoginPage";
import SignUpPage from "pages/RegestrationPage/SignUpPage";

export function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<ContactsPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</>
	);
}
