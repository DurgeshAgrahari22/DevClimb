import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${Base_Url}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      // Error logic maybe redirect to error page
      console.error(error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        {user ? (
          <Link to="/" className="btn btn-ghost text-xl">
            👨‍💻 DevTinder
          </Link>
        ) : (
          <Link to="/login" className="btn btn-ghost text-xl">
            👨‍💻 DevTinder
          </Link>
        )}
      </div>
      {user ? (
        <div className="flex gap-2">
          {/* <div>Hello</div> */}
          <p className="font-bold my-2.5">Welcome! {user.firstName}</p>
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-5"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile Edit
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/codechef">Codechef</Link>
                <Link to="/codeforces">Codeforces</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;