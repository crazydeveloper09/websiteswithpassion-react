import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__info">
                <h1>&lt;Witaj na moim portfolio&gt;</h1>
                <p>Maciej Kuta, Junior UI Engineer</p>
                <div className="header__links">
                    <a href="#whatIdo" className="button button-blue">
                        Poznaj mnie bliżej
                    </a>
                    <Link to={'/projects'} className="button button-blue">
                        Zobacz projekty
                    </Link>
                    <Link to={'/website-orders/description'} className="button button-blue">
                        Zobacz ofertę
                    </Link>
                </div>
               
               
            </div>
           
        </header>
    )
}

export default Header;