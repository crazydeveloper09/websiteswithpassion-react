import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { logOutUser, selectLoggedInUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../hooks";
import './Navigation.scss';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {

  }, [dispatch])

  const handleLogOut = () => {
    axios
      .post("http://localhost:5000/logout")
      .then(res => dispatch(logOutUser()))
      .catch((err) => console.log(err.message))
  }
  const isLoggedIn = useSelector(selectLoggedInUser);
  return (
    <nav>
      <NavLink className="navbar-brand" to="/">
        <img src="/logo_znak1.png" alt="logo" id="logo" />
      </NavLink>
      <ul className="nav-links">
            <li>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/projects">
                Moje projekty
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/website-orders/description">
                Zamówienia
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/support">
                Wesprzyj
              </NavLink>
            </li>
            { isLoggedIn && <li>
              <button className="nav-link" onClick={handleLogOut} >Wyloguj</button>
            </li>}

          </ul>
     
    </nav>
  );
};

export default Navigation;
