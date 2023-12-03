import './App.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import FormData from './components/form-data/FormData';
import { useAppSelector } from './redux/hooks';
import DataNotification from './components/data-notification/DataNotification';

function App() {
  const navigate = useNavigate();
  const wasDataAdded = useAppSelector((state) => state.formData.wasDataAdded);
  return (
    <main>
      {wasDataAdded && <DataNotification />}
      <img src="https://spectrumnews-web-assets.s3.amazonaws.com/wp-content/uploads/2018/11/08112909/20181108-LovaMix-844.jpg" />
      <section className="main__buttons">
        <button onClick={() => navigate('/uncontrolled-form')}>
          Uncontrolled Form
        </button>
        <button onClick={() => navigate('/react-hook-form')}>
          React Hook Form
        </button>
      </section>
      <FormData />
    </main>
  );
}

export default App;
