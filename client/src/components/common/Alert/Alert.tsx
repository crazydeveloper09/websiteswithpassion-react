import React from "react";
import './Alert.scss';

export enum ALERT_TYPES { INFO='info', ERROR='error', SUCCESS='success' };

const Alert: React.FC<{type: ALERT_TYPES, message: string}> = ({ type, message }) => {
    return (
        <div className={`alert__${type}`}>
            { message }
        </div>
    )
}

export default Alert;