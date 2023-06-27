import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "redux/selectors";

const PrivatRoute = ({ children }) => {
	const isAuth = useSelector(selectIsLoggedIn);
	return isAuth ? children : <Navigate to="/login" />;
};
export default PrivatRoute;
