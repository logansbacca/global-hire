import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = () => {
const value = useContext(authContext)
  const {isAuth, setAuth, setUser, user} = value;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
