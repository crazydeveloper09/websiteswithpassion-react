import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Field.scss';

interface FieldProps {
    children?: React.ReactNode,
    label: string
}


const Field: React.FC<FieldProps> = ({label, children}) => {
    return (
        <FloatingLabel label={label}>
            {children}
        </FloatingLabel>
    )
}

export default Field;