import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
    const {user, isLoading} = useSelector((state) => state.auth)

    if(isLoading) {
        return <Loading />
    }

    if(user) {
      return children
    }

  return <Navigate to='/signin' replace />
}

export default PrivateRoute