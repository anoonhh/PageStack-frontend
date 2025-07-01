import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  
    const token = localStorage.getItem('token')

    return token ? <Navigate to={'/books'}/> : children
}

export default PublicRoute