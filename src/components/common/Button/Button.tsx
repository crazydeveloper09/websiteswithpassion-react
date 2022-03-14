import React, { MouseEventHandler } from 'react';
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
    if(props.type === "link"){
        return (
            <Link className={props.class} to={props.redirect!}>
                {props.children}
            </Link>
        );
       
    } else {
        return (
            <button className={props.class} onClick={props.click!}>{props.children}</button>
        );
        
    }
}

export default Button;