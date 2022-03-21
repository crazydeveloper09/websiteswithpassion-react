import React from "react";
import './Alert.scss';

export enum ALERT_TYPES { INFO='primary', ERROR='error', SUCCESS='success' };

const Alert: React.FC<{type: ALERT_TYPES, message: string}> = ({ type, message }) => {
    return (
        <div className={`alert alert-${type}`}>
            { message }
        </div>
    )
}

export default Alert;