import React from "react";
import './Advantage.scss';

const Advantage: React.FC<{text: string}> = props => {
    return (
        <li className="advantage">
            <span className="description">{props.text}</span>
        </li>
    )
}

export default Advantage;