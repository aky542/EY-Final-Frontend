import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/user/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data); // Log the server response for debugging
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightGreen">
      <h1 className="text-2xl text-teal mb-8">Register</h1>
      <form className="flex flex-col items-center gap-4 p-8 bg-white w-80">
        <input
          required
          type="text"
          placeholder="username"
          name="name"
          onChange={handleChange}
          className="p-2 border-b border-gray-400 focus:outline-none"
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          className="p-2 border-b border-gray-400 focus:outline-none"
        />
        <input
          required
          type="password"
          placeholder="password"
     
          name="password"
          onChange={handleChange}
          className="p-2 border-b border-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-teal text-white rounded cursor-pointer"
        >
          Register
        </button>
        {err && <p className="text-red-500 text-sm text-center">{err}</p>}
        <span className="text-sm text-center">
          Do you have an account? <Link to="/login" className="text-teal">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
