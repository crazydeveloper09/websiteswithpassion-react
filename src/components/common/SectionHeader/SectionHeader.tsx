import React from "react";
import { useTranslation } from "react-i18next";
import './SectionHeader.scss';

interface SectionHeaderProps {
    style?: any,
    children: string
}

const SectionHeader: React.FC<SectionHeaderProps> = props => { 
    const { t } = useTranslation();
    return (
        <h2 className="section-header" style={props.style}>{t(props.children)}</h2>
    );
}

export default SectionHeader;