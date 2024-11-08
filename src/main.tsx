import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import AuthContextProvider from './Context/AuthContext.tsx';
import { ToastContainer } from 'react-toastify';
// import ToastContextProvider from './Context/ToastContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer />

    {/* <ToastContextProvider> */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    {/* </ToastContextProvider> */}
  </>



)
