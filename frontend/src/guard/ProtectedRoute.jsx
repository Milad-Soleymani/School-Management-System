import { Navigate } from 'react-router-dom'

export default function ProtectedRoute ({Children, alloewedRoles=[]}){

    const userRole = 'SCHOOL';
    const authinticated = true;


    if(!authinticated) return <Navigate to={'/login'}/>
    if(alloewedRoles && !alloewedRoles.includes(userRole)) return <Navigate to={'/login' } />





    return Children
}