import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import './Header.scss';

const Header: React.FC = () => {
    const { t } = useTranslation();
    return (
        <header className="header">
            <div className="header__info">
                <h1>{t('Witaj na moim portfolio!')}</h1>
                <p>Maciej Kuta, UI Engineer</p>
                <div className="header__links">
                    <a href="#whatIdo" className="button button-black">
                        {t('O mnie')}
                    </a>
                    <Link to={'/projects'} className="button button-black margin">
                        {t('Projekty')}
                    </Link>
                    <Link to={'/website-orders/description'} className="button button-black margin">
                        {t('Oferta')}
                    </Link>
                </div>
               
               
            </div>
           
        </header>
    )
}

export default Header;