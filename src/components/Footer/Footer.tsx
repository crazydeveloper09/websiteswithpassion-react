import React from "react";
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import { useSelector} from 'react-redux';
import { selectUserInfo } from '../../features/user/userSlice';
import { useEffect } from 'react';
import { loadUser } from '../../features/user/userSlice';
import { useAppDispatch } from "../../hooks";
import './Footer.scss';
import Icon from "../common/Icon/Icon";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    useEffect(() => {
      dispatch(loadUser())
    }, [dispatch]) 
    
    const user = useSelector(selectUserInfo);
    return (
        <footer className="footer">
            <SectionHeader>{t('Skontaktuj się ze mną')}</SectionHeader>
            <div className="footer__icons">
                <a href={user?.fbLink}>
                    <Icon class="fab fa-facebook fa-lg icon" />
                </a>
                <a href={user?.igLink}>
                    <Icon class="fab fa-instagram fa-lg icon" />
                </a>
                <a href={`mailto: ${user?.email}`}>
                    <Icon class="fas fa-envelope fa-lg icon" />
                </a>
            </div>
            <p className="footer_copyright">
                Websites With Passion &copy; {t('Wszelkie prawa zastrzeżone')}
            </p>
            <Link to="/login" className="footer__panel">
                {t('panel administracyjny')}
            </Link>
        </footer>
    )
}

export default Footer;
