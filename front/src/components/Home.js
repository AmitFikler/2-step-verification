import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1> Welcome!!</h1>
      <Link to="/verification ">
        <button> 2-step verification </button>
      </Link>
    </div>
  );
}

export default Home;
