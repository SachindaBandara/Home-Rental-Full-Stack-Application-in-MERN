import React, { useState } from "react";
import '../styles/Register.scss'

const Register = () => {

  const [formData, setFormData ] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    profileImage:null
  })

  const handleChange = (e) =>{
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0]: value
    })
  }


  return (
    <div className="register">
      <div className="register_content">
        <form action="" className="register_content_form">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            required
          />

          <input 
            type="text" 
            placeholder="Last Name" 
            name="lastName" 
            value={formData.lastName}
            required 
          />

          <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            value={formData.email}
            required 
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            required
          />

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            value={formData.profileImage}
            required
          />

          <label htmlFor="image">
            <img src="../../public/assets/addImage.png" alt="Add Profile Photo" />
            <p>Upload Your Photo</p>
          </label>

          <button type="submit">Register</button>

        </form>
        <a>
          Already have an account? <a href="/login">Login here</a>
        </a>
      </div>
    </div>
  );
};

export default Register;
