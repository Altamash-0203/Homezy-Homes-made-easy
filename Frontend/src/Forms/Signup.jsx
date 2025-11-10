import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        password,
      });

      // Save token & user info to localStorage
      localStorage.setItem("homzyToken", data.token);
      localStorage.setItem("homzyUser", JSON.stringify({ name: data.name, email: data.email }));

      setLoading(false);
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-5 justify-center items-center p-10 rounded-xl bg-white shadow-xl shadow-gray-600"
      >
        <img
          width="70"
          src="https://cdn-icons-png.flaticon.com/128/10254/10254098.png"
          alt="Sign-Up Icon"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="text"
          className="text-center rounded border bg-white h-10 w-90"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="text-center rounded border bg-white h-10 w-90"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="text-center rounded border bg-white h-10 w-90"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="text-center rounded border bg-white h-10 w-90"
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="text-center rounded bg-black text-white h-10 w-90"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Submit"}
        </button>

        <p className="text-right text-xs w-full">
          I already have an account?{" "}
          <Link to="/login" className="text-blue-800">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
