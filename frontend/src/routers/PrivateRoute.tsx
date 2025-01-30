import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, replace, useLocation } from 'react-router-dom';

const PrivateRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user) {
    alert('You must be logged in!');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    alert('Not authorized');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
