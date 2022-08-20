import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__info">
                <h1>Witaj na moim portfolio!</h1>
                <p>Maciej Kuta, Junior UI Engineer</p>
                <div className="header__links">
                    <a href="#whatIdo" className="button button-black">
                        O mnie
                    </a>
                    <Link to={'/projects'} className="button button-black margin">
                        Projekty
                    </Link>
                    <Link to={'/website-orders/description'} className="button button-black margin">
                        Oferta
                    </Link>
                </div>
               
               
            </div>
           
        </header>
    )
}

export default Header;