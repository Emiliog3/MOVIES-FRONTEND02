// rafc


import React from 'react'
import { Link } from 'react-router-dom'


export const MediaCard = (props) => {

  const { media } = props;

  return (
    <div className="col">
      <div className="card">
        <img src={media.imagen} className="card-img-top" alt="Imagen" />
        <div className="card-body">
          <h5 className="card-title">Características</h5>
          <hr />
          <p className="card-text"> {"Serial: " + media.serial}</p>
          <p className="card-text"> {"Título: " + media.titulo}</p>
          <p className="card-text"> {"Sinopsis: " + media.sinopsis}</p>
          <p className="card-text"> {"URL: " + media.url}</p>
          {/*<p className="card-text"> {"Imagen: " + media.imagen}</p>*/}
          <p className="card-text"> {"Año de Estreno: " + media.anioEstreno}</p>
          <p className="card-text"> {"Género: " + media.genero.nombre}</p>
          <p className="card-text"> {"Director: " + media.director.nombre}</p>
          <p className="card-text"> {"Productora: " + media.productora.nombre}</p>
          <p className="card-text"> {"Tipo: " + media.tipo.nombre}</p>
          <p className="card-text"> {"Fecha de Creación: " + media.fechaCreacion}</p>
          <p className="card-text"> {"Fecha de Actualización: " + media.fechaActualizacion}</p>
          <Link to={"/media/detalle/" + media._id} className="btn btn-primary">Ver detalle</Link>



        </div>
      </div>
    </div>
  )
}


