import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // ✅ Mounting useEffect #1: restore/validate stored auth data on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && !token) setToken(storedToken);

    if (storedUser && !user) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []); // mounting effect

  async function login(email, password) {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", data.token);
    setToken(data.token);

    const userObj = data.user ?? { email };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
  }

  async function register(email, password) {
    await apiFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        roles: ["user"],
      }),
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
      () => ({ token, user, isLoggedIn: Boolean(token), login, register, logout }),
      [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}