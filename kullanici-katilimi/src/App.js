import Form from './components/Form';
import './App.css';
import { useState } from 'react';

function App() {

  const[kullanicilar, setKullanicilar] = useState([]);

  const yeniKullaniciEkle = (yeniKullanici) => {
    setKullanicilar([...kullanicilar, yeniKullanici]);
  };

  return (
    <div className="App">
      <h1>Merhaba !</h1>
      <hr/>
      {kullanicilar.map((kullanici) => (
      <div className='kullanici-container'>
        <p> 
          <strong>İsim:</strong> {kullanici.name}
        </p>
        <p> 
          <strong>Eposta:</strong> {kullanici.email}
        </p>
        <p> 
          <strong>Kullanım Koşulları:</strong> {kullanici.terms ?"Kullanım koşulları Onay":"Kullanım koşulları Ret"}
        </p>
      </div>
      ))}
      <Form yeniKullaniciEkle={yeniKullaniciEkle}/>
    </div>
  );
}

export default App;
