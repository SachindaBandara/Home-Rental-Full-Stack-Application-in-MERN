import { IconButton } from "@mui/material"; // Importing Material UI components
import { Search, Person, Menu } from "@mui/icons-material"; // Importing Material UI icons
import { useState } from "react"; // Importing React's useState hook
import { useSelector, useDispatch } from "react-redux"; // Importing Redux hooks
import "../styles/Navbar.scss"; // Importing SCSS for styles
import { Link, useNavigate } from "react-router-dom"; // Importing React Router hooks
import { setLogOut } from "../redux/state"; // Importing Redux action for logging out

const Navbar = () => {
  // State to handle the visibility of the dropdown menu
  const [dropdownMenu, setDropdownMenu] = useState(false);

  // Get user information from the Redux store
  const user = useSelector((state) => state.user);

  // Redux dispatch function for triggering actions
  const dispatch = useDispatch();

  // State to handle the search input value
  const [search, setSearch] = useState("");

  // Navigation hook for navigating programmatically
  const navigate = useNavigate();

  return (
    <div className="navbar">
      {/* Logo section, redirects to the homepage */}
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      {/* Search bar section */}
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..." // Placeholder text for the search input
          value={search} // Controlled input value from the search state
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: "#FF6F61" }} // Setting the color for the search icon
            onClick={() => {
              if (search !== "") {
                navigate(`/properties/search/${search}`); // Navigate to the search results page if search input is not empty
              }
            }}
          />
        </IconButton>
      </div>

      {/* Right-side section of the navbar with account options */}
      <div className="navbar_right">
        {/* Conditionally render the "Become A Host" link based on user authentication status */}
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        {/* Button to open the account dropdown menu */}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)} // Toggle dropdown menu visibility
        >
          <Menu sx={{ color: "#4a4a4a" }} /> {/* Menu icon */}
          {/* Show either a user profile image if logged in, or a generic person icon if not */}
          {!user ? (
            <Person sx={{ color: "#4a4a4a" }} /> // Default icon for guest users
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile"
              style={{ objectFit: "cover", borderRadius: "50%" }} // Styling profile image
            />
          )}
        </button>

        {/* Dropdown menu for non-logged-in users */}
        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link> {/* Link to the login page */}
            <Link to="/register">Sign Up</Link>{" "}
            {/* Link to the registration page */}
          </div>
        )}

        {/* Dropdown menu for logged-in users */}
        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            {/* Links to various sections for logged-in users */}
            <Link to={`/${user._id}/trips`}>Trip List</Link>{" "}
            {/* User's trip list */}
            <Link to={`/${user._id}/wishList`}>Wish List</Link>{" "}
            {/* User's wishlist */}
            <Link to={`/${user._id}/properties`}>Property List</Link>{" "}
            {/* User's properties */}
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>{" "}
            {/* User's reservations */}
            <Link to="/create-listing">Become A Host</Link>{" "}
            {/* Link to create a new listing */}
            {/* Log Out link */}
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogOut()); // Dispatch the log out action when clicked
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
