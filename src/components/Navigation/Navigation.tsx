import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOutUser, selectLoggedInUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../hooks";
import "./Navigation.scss";

const Navigation: React.FC = () => {

  const { t } = useTranslation();
  const menuRef = useRef<HTMLUListElement>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)
  const [menuDisplay, setMenuDisplay] = useState<string>("none")
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if(menuRef == null){
      return;
    }
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      menuRef.current!.style.display = menuDisplay;
    }
    
  }, [menuDisplay])

  const handleLogOut = () => {
    axios
      .post("http://localhost:5000/logout")
      .then((res) => dispatch(logOutUser()))
      .catch((err) => console.log(err.message));
  };
  const isLoggedIn = useSelector(selectLoggedInUser);


  const collapseMenu = () => {
    if(menuDisplay === "none"){
      setMenuDisplay("block")
    } else {
      setMenuDisplay("none")
    }
    setIsHamburgerOpen(!isHamburgerOpen)
  }
  return (
    <nav>
      <NavLink to="/">
        <img src="/yellow500.png" alt="logo" id="logo" />
      </NavLink>
      <ul className="nav-links" ref={menuRef}>
        <li>
          <NavLink className="nav-link" to="/" onClick={collapseMenu}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-link" to="/projects" onClick={collapseMenu}>
            {t('Projekty')}
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-link" to="/website-orders/description" onClick={collapseMenu}>
            {t('Zamówienia')}
          </NavLink>
        </li>

        <li>
          <a className="nav-link" href="https://www.buymeacoffee.com/crazydev" target={'_blank'} rel={'noreferrer'}>
            {t('Wesprzyj')}
          </a>
        </li>
        {isLoggedIn && (
          <li>
            <button className="nav-link" onClick={handleLogOut}>
              Wyloguj
            </button>
          </li>
        )}
      </ul>
      <div id="nav-icon4" className={isHamburgerOpen ? 'open': ''} onClick={collapseMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navigation;
