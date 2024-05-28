import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Theme = () => {
  const { themeHandler, theme } = useContext(ThemeContext);
  return (
    <>
      <button className={`btn btn-${theme} toggler`} onClick={themeHandler}>
        <i
          className={`bi bi-${
            theme === "dark" ? "brightness-low-fill" : "moon-stars-fill"
          }`}
        />
      </button>
    </>
  );
};

export default Theme;
