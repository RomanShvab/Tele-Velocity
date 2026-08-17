import type {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

type ProtectedRouteProps = {
    children: ReactNode;
};

function ProtectedRoute({children}: ProtectedRouteProps) {
    const {currentUser} = useCurrentUser();
    if(currentUser == null) {
        return <Navigate to="/"/>
    }
    return children;
}

export default ProtectedRoute;