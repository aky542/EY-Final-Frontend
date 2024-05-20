import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Authcontext";
import { useContext } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/user/login", { // Adjust the URL according to your server setup
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      login(data.user); // Assuming login function updates the global state
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightGreen">
      <h1 className="text-teal text-2xl mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-8 bg-white w-80">
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="p-2 border-b border-gray-400 focus:outline-none"
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="p-2 border-b border-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-teal text-white rounded cursor-pointer"
        >
          Login
        </button>
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
        <span className="text-sm text-center">
          Don't you have an account?{" "}
          <Link to="/register" className="text-teal">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
