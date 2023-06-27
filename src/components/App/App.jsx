import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivatRoute from "components/PrivatRoute/PrivatRoute";
import PublicRoute from "components/PublicRoute/PublicRoute";
import Loader from "components/Loader/Loader";

const ContactsPage = lazy(() => import("pages/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("pages/RegisterPage/RegisterPage"));

export function App() {
	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route
					path="/contacts"
					element={
						<PrivatRoute>
							<ContactsPage />
						</PrivatRoute>
					}
				/>

				<Route
					path="/register"
					element={
						<PublicRoute>
							<RegisterPage />
						</PublicRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route path="/*" element={<Navigate to="/login" />} />
			</Routes>
		</Suspense>
	);
}
