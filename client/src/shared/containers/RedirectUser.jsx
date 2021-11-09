import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ children }) {
  let { authContext } = useAuth();

  if (authContext.checkingStorage) {
    return <div></div>;
  }

  if (authContext.user) {
    return <Navigate to="/home" replace={true} />;
  }

  return children;
}
