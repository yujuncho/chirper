import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import authTypes from "../data/authTypes";

export default function RequireAuth({ children }) {
  let { authContext } = useAuth();
  let location = useLocation();

  if (authContext.checkingStorage) {
    return <div></div>;
  }

  if (!authContext.user) {
    return (
      <Navigate to="/" state={{ from: location, authType: authTypes.LOGIN }} />
    );
  }

  return children;
}
