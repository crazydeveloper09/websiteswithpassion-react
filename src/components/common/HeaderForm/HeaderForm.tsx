import React from "react";
import './HeaderForm.scss';


const HeaderForm: React.FC<{title: string, height?: string}> = (props) => {
    return (
        <section className="header-form" style={{ height: props.height }}>
            <div className="header-form__info">
                <div className="header-form__info--logo">
                    <img src="/logo_znak1.png" alt="logo" width={'100%'} />
                </div>
                <div className="header-form__info--form">
                    <h1>{props.title}</h1>
                    {props.children}
                </div>
            </div>
        </section>
    )
}

export default HeaderForm;
