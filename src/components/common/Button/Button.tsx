import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Button.scss';

interface ButtonProps {
    type: string,
    class: string,
    children: string,
    redirect?: string,
    click?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = (props) => {
    const { t } = useTranslation();
    if(props.type === "link"){
        return (
            <Link className={props.class} to={props.redirect!}>
                {t(props.children)}
            </Link>
        );
       
    } else {
        return (
            <button className={props.class} onClick={props.click!}>{props.children}</button>
        );
        
    }
}

export default Button;