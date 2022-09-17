import React from "react";
import { useTranslation } from "react-i18next";
import './Advantage.scss';

const Advantage: React.FC<{text: string}> = props => {
    const { t } = useTranslation();
    return (
        <li className="advantage">
            <span className="description">{t(props.text)}</span>
        </li>
    )
}

export default Advantage;