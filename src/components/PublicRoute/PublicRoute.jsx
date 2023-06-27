import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "redux/selectors";

export default function PublicRoute({ children }) {
	const isAuth = useSelector(selectIsLoggedIn);

	return !isAuth ? children : <Navigate to="/contacts" />;
}
