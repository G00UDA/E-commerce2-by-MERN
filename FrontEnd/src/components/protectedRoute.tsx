import { Outlet , Navigate } from "react-router-dom"
import { useAuth } from "../context/Auth/AuthContext"

const ProtectedRoute = ()=>{

    const {IsAuthenticated} = useAuth();

    if(!IsAuthenticated){
        return <Navigate to="/Login" replace/>
    }


    return <Outlet/>

}

export default ProtectedRoute