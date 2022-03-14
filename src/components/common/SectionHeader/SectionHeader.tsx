import React from "react";
import './SectionHeader.scss';

interface SectionHeaderProps {
    style?: any,
    children: string
}

const SectionHeader: React.FC<SectionHeaderProps> = props => { 
    return (
        <h2 className="section-header" style={props.style}>{props.children}</h2>
    );
}

export default SectionHeader;