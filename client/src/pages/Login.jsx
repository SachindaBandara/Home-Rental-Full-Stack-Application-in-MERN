import React, { useState } from "react";
import '../styles/Login.scss'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await fetch ("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
      })

      // Get data after fetching
      const loggedIn = await response.json()
      
    } catch(err){

    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form">
          <input 
            type="email" 
            placeholder="Email"
            value={email} 
            onChange={ (e)=> e.target.value} 
            required 
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={ (e)=> e.target.value}
            required
          />
          <button type="submit">Login</button>
        </form>
        <a href="/register">Don't have an account? Sign In here</a>
      </div>
    </div>
  );
};

export default Login;
