import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://homzy-backend.onrender.com/api/users/login", {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem("homzyToken", res.data.token);
       localStorage.setItem("loggedIn",true)
      // Optional: store user info too
      localStorage.setItem("homzyUser", JSON.stringify({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email
      }));

      // Redirect to dashboard or listing page
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 mt-5 justify-center items-center p-10 rounded-xl bg-white shadow-xl shadow-gray-600 w-96">
        <img
          width={70}
          src="https://cdn-icons-png.flaticon.com/512/10254/10254091.png"
          alt="login-icon"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          type="text"
          className="text-center rounded border bg-white h-10 w-full"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="text-center rounded border bg-white h-10 w-full"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="text-center rounded bg-black text-white h-10 w-full"
        >
          Submit
        </button>
        <p className="text-right text-xs w-full">
          I haven't an account?{" "}
          <Link to="/signup" className="text-blue-800">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
