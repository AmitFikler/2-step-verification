import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
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
  const login = async () => {
    try {
      localStorage.setItem('verify', false);
      if (usernameInput.current.value && passwordInput.current.value) {
        const response = await axios.post('http://localhost:3001/login', {
          username: usernameInput.current.value,
          password: passwordInput.current.value,
        });
        if (response.data === 'confirm') {
          localStorage.setItem('username', usernameInput.current.value);
          navigate('/home');
        } else if (response.data.secret) {
          localStorage.setItem('secret', response.data.secret);
          navigate('/verification');
        } else {
          console.log(response.data);
          throw new Error('username is missing');
        }
      } else {
        throw new Error('username or password is missing');
      }
    } catch (error) {
      notify(error.message);
    }
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
      <input ref={usernameInput} type="text" placeholder="username"></input>
      <input ref={passwordInput} type="password" placeholder="password"></input>
      <button onClick={() => login()} type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
