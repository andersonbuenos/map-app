import './App.css';
import React from 'react';
import MapComponent from './components/MapComponent.tsx'; // Certifique-se de que o caminho para o MapComponent está correto

const App = () => {
  return (
    <div>
      <h1>Rota Bioceânica</h1>
      <MapComponent />
    </div>
  );
};

export default App;
