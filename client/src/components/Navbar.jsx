import React from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input type="text" placeholder="Search..." />
      </div>
      <IconButton>
        <Search sx={{ color: variables.pinkred }} />
      </IconButton>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing">Become a host</a>
        ) : (
          <a href="/login">Become a host</a>
        )}

        <button className="navbar_right_account">
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace("public","")}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
