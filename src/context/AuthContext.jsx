
import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [token, user]);

  async function register(email, password) {
    return await apiFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        roles: ["user"],
      }),
    });
  }

  async function login(email, password) {
    const data = await apiFetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const receivedToken = data.accessToken || data.token;

    if (!receivedToken) {
      throw new Error("No token received from server.");
    }

    const userData = { email };

    setToken(receivedToken);
    setUser(userData);

    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(userData));

    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
      <AuthContext.Provider value={{ user, token, register, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}