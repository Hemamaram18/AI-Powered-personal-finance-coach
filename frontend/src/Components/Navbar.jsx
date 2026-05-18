import React from "react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {

  const logout = () => {

    // REMOVE TOKEN
    localStorage.removeItem("token");

    // RELOAD APP
    window.location.reload();

  };

  return (

    <div className="bg-blue-700 text-white p-4 rounded-2xl shadow-lg mb-6">

      <div className="flex justify-between items-center">

        {/* LEFT SIDE */}
        <div>

          <h1 className="text-3xl font-bold">

            AI Finance Coach

          </h1>

          <p className="text-sm text-blue-100 mt-1">

            Smart Personal Finance Dashboard

          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >

            Logout

          </button>

        </div>

      </div>

    </div>

  );

}

export default Navbar;