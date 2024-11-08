import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ children }: any) {
  let { userData }: any = useContext(AuthContext);
  // console.log(userData);

  if (localStorage.getItem('userTkn') !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
