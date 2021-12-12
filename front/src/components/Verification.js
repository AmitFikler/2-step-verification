import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Verification() {
  const notify = (mes) =>
    toast.error(mes, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const token = useRef(null);
  const navigate = useNavigate();

  const verifyToken = async () => {
    const response = await axios.put(
      'http://localhost:3001/verificationToken',
      {
        secret: localStorage.getItem('secret'),
        token: token.current.value,
      }
    );
    if (response.data !== 'verify token') {
      notify('invalid token!');
      return;
    }
    localStorage.setItem('verify', true);
    navigate('/home');
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2>please enter your token</h2>
      <input ref={token} type="text" placeholder="Token"></input>
      <br />
      <button onClick={() => verifyToken()}>Verify</button>
    </div>
  );
}

export default Verification;
