import React from "react";
import './Field.scss';

const Field: React.FC = (props) => {
    return (
        <div className="field">
            {props.children}
        </div>
    )
}

export default Field;