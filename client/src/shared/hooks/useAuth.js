import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: {},
  signin: user => {},
  signout: () => {},
  checkingStorage: {}
});

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  const [checkingStorage, setCheckingStorage] = useState(true);

  useEffect(() => {
    let storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
    setCheckingStorage(false);
  }, []);

  let signin = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  let signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout, checkingStorage };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  let authContext = useContext(AuthContext);
  return { authContext, AuthProvider };
}
