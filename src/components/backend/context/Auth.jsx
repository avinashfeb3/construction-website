import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user info from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function (save user data)
  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function (clear user data)
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  // ✅ Prevent rendering until we know if user is logged in
  if (loading) {
    return <div>Loading...</div>; // You can replace with spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
