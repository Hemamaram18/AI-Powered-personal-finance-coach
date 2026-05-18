import React, {
  useState
} from "react";

function Register({ setShowRegister }) {

  const [formData, setFormData] =
    useState({

      username: "",
      password: "",
      email: "",

    });

  const [loading, setLoading] =
    useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };

  // REGISTER
  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify(
            formData
          ),

        }
      );

      const data =
        await response.json();

      if (response.ok) {

        alert(
          "Registration Successful"
        );

        setShowRegister(false);

      } else {

        console.log(data);

        alert(
          "Registration Failed"
        );
      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Create Account
        </h2>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* USERNAME */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>

        {/* LOGIN BUTTON */}
        <button
          onClick={() =>
            setShowRegister(false)
          }
          className="w-full mt-4 text-blue-600"
        >
          Already have an account?
          Login
        </button>

      </div>

    </div>
  );
}

export default Register;