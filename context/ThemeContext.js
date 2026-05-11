import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    dark: isDark,
    colors: {

      background: isDark
        ? ["#243B55", "#141E30"] 
        : ["#d4fc79", "#96e6a1"], 


      card: isDark ? "#2C3E50" : "#ffffff",


      text: isDark ? "#E0E0E0" : "#333333",


      subText: isDark ? "#A0A0A0" : "#666666",

      primary: "#4CAF50",

      iconBg: isDark ? "rgba(255, 255, 255, 0.1)" : "#f0f0f0",

      shadow: isDark ? "#000000" : "#000000",
    },
    toggleTheme,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
