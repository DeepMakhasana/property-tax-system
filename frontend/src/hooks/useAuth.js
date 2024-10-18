import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const LOCAL_TOKEN_KEY = "token";

  const setAuthToken = (token) => {
    try {
      localStorage.setItem(LOCAL_TOKEN_KEY, token);
      if (token) {
        setAuthenticated(true);
        setUser(jwtDecode(token));
      } else {
        setAuthenticated(false);
        setUser({});
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      console.log("error localStorage: ", error);
      setAuthenticated(false);
    }
  };

  const getAuthToken = () => {
    try {
      const token = localStorage.getItem(LOCAL_TOKEN_KEY);
      setAuthenticated(true);
      setUser(jwtDecode(token));
      console.log("user set in memory: ", user);
    } catch (error) {
      console.log("error localStorage: ", error);
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    getAuthToken();
  }, [authenticated]);

  return {
    authenticated,
    user,
    getAuthToken,
    setAuthToken,
  };
};

export default useAuth;
