import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Navigate,
} from 'react-router-dom';
import { selectLoggedInUser } from './features/user/userSlice';

const ProtectedRoute: React.FC = ({ children }) => {
    const currentUser = useSelector(selectLoggedInUser);
  
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return children as ReactJSXElement;
};

export default ProtectedRoute;