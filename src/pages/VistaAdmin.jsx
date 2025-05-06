import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VistaAdmin = ({ children }) => {
  const { isAdmin } = useSelector(state => state.auth);
  return isAdmin ? children : <Navigate to="/" replace />;
};

export default VistaAdmin;