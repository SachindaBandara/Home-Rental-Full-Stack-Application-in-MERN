import React, { useState } from "react";
import { IconButton, Link } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import "../styles/Navbar.scss";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);

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
          <a href="/create-listing" className="host">
            Become a host
          </a>
        ) : (
          <a href="/login" className="host">
            Become a host
          </a>
        )}

        <button className="navbar_right_account">
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Logn In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
            <div className="navbar_right_accountmenu">
                <Link to="">Trip List</Link>
                <Link to="">Wish List</Link>
                <Link to="">Property List</Link>
                <Link to="">Reservation List</Link>
                <Link to="">Become a host</Link>

                <Link to="">Log Out</Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
