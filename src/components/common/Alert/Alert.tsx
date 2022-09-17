import React from "react";
import { useTranslation } from "react-i18next";
import './Alert.scss';

export enum ALERT_TYPES { INFO='primary', ERROR='error', SUCCESS='success' };

const Alert: React.FC<{type: ALERT_TYPES, message: string}> = ({ type, message }) => {
    const { t } = useTranslation();
    return (
        <div className={`alert alert-${type}`}>
            { t(message) }
        </div>
    )
}

export default Alert;