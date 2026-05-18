import React, { useEffect, useState } from "react";

function ThemeToggle() {

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {

      setDarkMode(false);

      document.body.classList.remove(
        "dark"
      );

    } else {

      setDarkMode(true);

      document.body.classList.add(
        "dark"
      );

    }

  }, []);

  const toggleTheme = () => {

    if (darkMode) {

      document.body.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    } else {

      document.body.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    }

    setDarkMode(!darkMode);

  };

  return (

    <button
      onClick={toggleTheme}
      className="bg-gray-800 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
    >

      {darkMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode"}

    </button>

  );

}

export default ThemeToggle;