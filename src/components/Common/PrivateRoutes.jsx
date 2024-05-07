import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  } else if (!user || error) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
