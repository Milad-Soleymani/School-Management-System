import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, alloewedRoles}) {
    const { user, authenticated } = useContext(AuthContext);
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(true)
    }, [])
    if (checked && !authenticated) return <Navigate to={'/login'} />
    if (checked && alloewedRoles && !alloewedRoles.includes(user.role)) return <Navigate to={'/login'} />

    if (checked) {
        return children
    }



}