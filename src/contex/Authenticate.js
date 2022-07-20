import { createContext, useState } from "react";
import { useEffect } from "react";

const authContextDefaultValues = {
  name: null,
  isAuthenticated: false,
  // toggleAuth: () => null,
};

export const AuthContext = createContext(authContextDefaultValues);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    name: null,
    isAuthenticated: false,
  });
  const toggleAuth = (name) =>
    setIsLoggedIn({
      name: name,
      isAuthenticated: !isLoggedIn.isAuthenticated,
    });

  const value = {
    ...isLoggedIn,
     toggleAuth,
  };
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("name"));
    userStorage
      ? setIsLoggedIn({ name: userStorage.name, isAuthenticated: true })
      : setIsLoggedIn({ name: null, isAuthenticated: false });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
