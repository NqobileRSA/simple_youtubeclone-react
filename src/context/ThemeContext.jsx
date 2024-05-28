import React, { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const themeHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
