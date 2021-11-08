import { useContext, createContext, useState } from "react";

const AuthContext = createContext({
  user: {},
  signin: (user, callback) => {},
  signout: callback => {}
});

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = user => {
    console.log("SIGN IN");
    setUser(user);
    localStorage.setItem("token", user.token);
  };

  let signout = () => {
    console.log("SIGN OUT");
    setUser(null);
    localStorage.removeItem("token");
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  let authContext = useContext(AuthContext);
  return { authContext, AuthProvider };
}
