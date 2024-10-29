import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';

// Verifica se o elemento com o id 'root' existe e define o tipo do rootElement
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Elemento root não encontrado");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opção para medir a performance do aplicativo
reportWebVitals();
