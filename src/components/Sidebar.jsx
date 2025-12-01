import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", height: "100vh", position: "fixed" }}
    >
      <h4 className="mb-4">Dashboard</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/camera" className="nav-link text-white">
            📷 Camera
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/movies" className="nav-link text-white">
            🎬 Movies
          </Link>
        </li>

        <li className="nav-item mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
