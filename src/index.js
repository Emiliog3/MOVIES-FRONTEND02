import React from 'react'; // Importamos la librería react
import ReactDOM from 'react-dom/client'; // Importamos el método createRoot de la librería react-dom
import { App } from './App'; // Importamos el componente App de la carpeta crc/App.js
import './styles.css'; // Importamos el archivo styles.scss de la carpeta styles


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); // Renderizamos el componente App en el elemento con id root


