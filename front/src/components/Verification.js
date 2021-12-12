import axios from 'axios';
import { useRef } from 'react';

function Verification() {
  const qrImg = useRef(null);
  const generateSecret = async () => {
    const response = await axios.post('http://localhost:3001/verification', {
      username: localStorage.getItem('username'),
    });
    qrImg.current.src = response.data.qr;
  };
  return (
    <div>
      <button onClick={() => generateSecret()}>get your QR</button>
      <br />
      <img ref={qrImg} src="" alt="qr"></img>
    </div>
  );
}

export default Verification;
