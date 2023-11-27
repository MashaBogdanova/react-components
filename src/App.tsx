import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <main>
      <img src="https://spectrumnews-web-assets.s3.amazonaws.com/wp-content/uploads/2018/11/08112909/20181108-LovaMix-844.jpg" />
      <section>
        <button onClick={() => navigate('/uncontrolled-form')}>
          Uncontrolled Form
        </button>
        <button onClick={() => navigate('/react-hook-form')}>
          React Hook Form
        </button>
      </section>
    </main>
  );
}

export default App;
