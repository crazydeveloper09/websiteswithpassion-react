import React from "react";
import './SubpageTitle.scss';

const SubpageTitle: React.FC<{ children: string }> = (props) => {
    return (
        <h1 className="subpage">{props.children}</h1>
    )
}

export default SubpageTitle;