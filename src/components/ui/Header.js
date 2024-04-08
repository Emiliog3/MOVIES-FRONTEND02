import React from 'react';
import { NavLink } from 'react-router-dom'; // Importamos NavLink de la librería react-router-dom que sirve para crear enlaces de navegación

export const Header = () => {
  return (
    // Navbar oscuro con fondo oscuro
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">

        {/* Enlace de la marca de la barra de navegación que redirige a la página principal */}
        <NavLink className="navbar-brand" exact to="/">MOVIES-IUDIGITAL</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>

        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">

              {/* Enlace de navegación para la página de Media */}
              <NavLink className="nav-link" aria-current="page" exact to="/">Media</NavLink>
            </li>

            <li className="nav-item">
              {/* Enlace de navegación para la página de Directores */}
              <NavLink className="nav-link" exact to="/directores">Director</NavLink>
            </li>

            <li className="nav-item">
              {/* Enlace de navegación para la página de Géneros */}
              <NavLink className="nav-link" exact to="/generos">Genero</NavLink>
            </li>

            <li className="nav-item">
              {/* Enlace de navegación para la página de Productoras */}
              <NavLink className="nav-link" exact to="/productoras">Productora</NavLink>
            </li>

            <li className="nav-item">
              {/* Enlace de navegación para la página de Tipos */}
              <NavLink className="nav-link" exact to="/tipos">Tipo</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};
