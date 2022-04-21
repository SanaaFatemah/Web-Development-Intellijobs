import { useContextApp } from "../context/contextApp"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {user} = useContextApp()
    if (!user)
    {
        return <Navigate to = "/frontpage" />
    }
    
    return children
}

export default ProtectedRoute