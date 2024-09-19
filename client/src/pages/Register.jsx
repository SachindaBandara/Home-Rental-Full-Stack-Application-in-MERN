import React from "react";

const Register = () => {
  return (
    <div className="register">
      <div className="register_content">
        <form action="">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            required
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            name="lastname" 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            required 
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            required
          />

          <input 
            type="file" 
            name="profileimage" 
            accept="image/*" 
            style={{display:'none'}}
            required />
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
