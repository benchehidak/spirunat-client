// client/src/component/PrivateRouteAdmin.jsx
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRouteAdmin() {
  const { currentUser } = useSelector(state => state.user);

  // Use 'Role' to match the database and Redux state if updated
  const isAdmin = currentUser && currentUser.Role === 'admin';

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}
