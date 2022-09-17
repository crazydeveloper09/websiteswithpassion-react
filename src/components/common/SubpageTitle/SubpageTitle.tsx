import React from "react";
import { useTranslation } from "react-i18next";
import './SubpageTitle.scss';

const SubpageTitle: React.FC = (props) => {
    const { t } = useTranslation();
    return (
        <h1 className="subpage">{t(props.children as string)}</h1>
    )
}

export default SubpageTitle;