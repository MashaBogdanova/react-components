import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import FormData from './pages/FormData';
import {useAppSelector} from "./redux/hooks";
import DataNotification from "./components/DataNotification";

function App() {
  const navigate = useNavigate();
  const [isData, setData] = useState<boolean>(false);
  const [isRHFData, setRHFData] = useState<boolean>(false);
  const wasDataAdded = useAppSelector(state => state.formData.wasDataAdded);
  return (
    <main>
      {wasDataAdded && <DataNotification/>}
      <img src="https://spectrumnews-web-assets.s3.amazonaws.com/wp-content/uploads/2018/11/08112909/20181108-LovaMix-844.jpg" />
      <section className="main__buttons">
        <article className="button__wrapper">
          <button onClick={() => navigate('/uncontrolled-form')}>
            Uncontrolled Form
          </button>
          {isData ? (
            <button className="button_link" onClick={() => setData(false)}>
              Hide data
            </button>
          ) : (
            <button className="button_link" onClick={() => setData(true)}>
              Show data
            </button>
          )}
          {isData && <FormData />}
        </article>
        <article className="button__wrapper">
          <button onClick={() => navigate('/react-hook-form')}>
            React Hook Form
          </button>
          {isRHFData ? (
            <button className="button_link" onClick={() => setRHFData(false)}>
              Hide data
            </button>
          ) : (
            <button className="button_link" onClick={() => setRHFData(true)}>
              Show data
            </button>
          )}
          {isRHFData && <FormData isRHF />}
        </article>
      </section>
    </main>
  );
}

export default App;
