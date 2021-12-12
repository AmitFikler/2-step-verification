import axios from 'axios';
import { useRef } from 'react';

function Home() {
  const generateBtn = useRef(null);
  const qrImg = useRef(null);
  const generateSecret = async () => {
    const response = await axios.post('http://localhost:3001/verification', {
      username: localStorage.getItem('username'),
    });
    generateBtn.current.disabled = true;
    qrImg.current.src = response.data.qr;
    qrImg.current.style.display = 'block';
  };

  const ifHadToken = () => {
    if (localStorage.getItem('verify') === 'true') {
      return;
    } else {
      return (
        <div>
          <button ref={generateBtn} onClick={() => generateSecret()}>
            {' '}
            2-step verification{' '}
          </button>
          <img ref={qrImg} src="" alt="qr" style={{ display: 'none' }}></img>
        </div>
      );
    }
  };
  return (
    <div>
      <h1> Welcome {localStorage.getItem('username')}</h1>
      {ifHadToken()}
    </div>
  );
}

export default Home;
