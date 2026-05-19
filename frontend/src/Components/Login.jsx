import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(
        "https://finance-ai-backend-q477.onrender.com/api/token/",
        {
          username,
          password,
        }
      );

      console.log(response.data);

      // SAVE ACCESS TOKEN
      localStorage.setItem(
        "token",
        response.data.access
      );

      // SAVE REFRESH TOKEN
      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      alert("Login Successful");

      setIsLoggedIn(true);

    } catch (error) {

      console.log(error);

      alert("Invalid Username or Password");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">

        <h1 className="text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">

          Finance AI

        </h1>

        <p className="text-center text-gray-400 mb-8">

          Smart Expense Tracking Dashboard

        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">

              Username

            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">

              Password

            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-bold text-lg transition duration-300"
          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;