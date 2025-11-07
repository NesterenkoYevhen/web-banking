import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { IRootState } from "../../../store";

interface IRequireAuthComponent {
	allowedRoles: string[];
}

const RequireAuth: FC<IRequireAuthComponent> = ({ allowedRoles }) => {
  const userInfo = useSelector((state: IRootState) => {
		return state.user;
	});
  
  const location = useLocation();

  return (
      allowedRoles?.includes(userInfo.role)
          ? <Outlet />
          : userInfo.isAuth
              ? <Navigate to="/unauthorized" state={{ from: location }} replace />
              : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;