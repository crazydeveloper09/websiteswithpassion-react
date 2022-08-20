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

const Footer: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(loadUser())
    }, [dispatch]) 
    
    const user = useSelector(selectUserInfo);
    return (
        <footer className="footer">
            <SectionHeader> Skontaktuj się ze mną </SectionHeader>
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
                Websites With Passion &copy; Wszelkie prawa zastrzeżone
            </p>
            <Link to="/login" className="footer__panel">
                panel administracyjny
            </Link>
        </footer>
    )
}

export default Footer;
