import React from "react";
import { FaTimes } from "react-icons/fa";
import './Error.scss';

interface ErrorProps {
    message: string,
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="error">
            <FaTimes className="error__icon" />
            <h1 className="error__title">Sorry, unfortunately we have API error</h1>
            <h3 className="error__message">{message}</h3>
        </div>
    )
}

export default Error;