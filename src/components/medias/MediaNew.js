import React, { useState, useEffect } from 'react';
import { getDirector } from '../../services/directorService';
import { getGenero } from '../../services/generoService';
import { getTipo } from '../../services/tipoService';
import { getProductora } from '../../services/productoraService';
import { crearMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';

export const MediaNew = ({ handleOpenModal, listarMedia }) => {

  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [valoresForm, setValoresForm] = useState({});





  // Función para cargar los directores desde el servicio

  const listarDirectores = async () => {
    try {
      const { data } = await getDirector(); 
      setDirectores(data);
    } catch (error) {
      console.log(error); // Agregamos este console.log
    }
  }

  useEffect(() => {
    listarDirectores();
  }, []);

  // Función para cargar los géneros desde el servicio

  const listarGeneros = async () => {
    try {
      const { data } = await getGenero();
      setGeneros(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarGeneros();
  }, []);

  // Función para cargar los tipos desde el servicio

  const listarTipos = async () => {
    try {
      const { data } = await getTipo();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarTipos();
  }, []);

  // Función para cargar las productoras desde el servicio

  const listarProductoras = async () => {
    try {
      const { data } = await getProductora();
      setProductoras(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarProductoras();
  }, []);






  // Función para manejar el cambio en los inputs

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValoresForm({ ...valoresForm, [name]: value }); // Se actualiza el estado de valoresForm
  };




  // Se crea el evento para guardar el formulario

  const handleSubmit = async (e) => { // Agregamos async para poder usar el await
    e.preventDefault();
    const media = {
      serial: valoresForm.serial,
      titulo: valoresForm.titulo,
      sinopsis: valoresForm.sinopsis,
      url: valoresForm.url,
      imagen: valoresForm.imagen,
      anioEstreno: valoresForm.anioEstreno,
      genero: { _id: valoresForm.genero },
      director: { _id: valoresForm.director },
      productora: { _id: valoresForm.productora },
      tipo: { _id: valoresForm.tipo }


    }

    try {

      await crearMedia(media);
      handleOpenModal();
      listarMedia();
      console.log('Media guardado exitosamente:', media); // Agregamos este console.log
      Swal.fire({
        icon: 'success',
        title: 'Datos registrados exitosamente',
        showConfirmButton: false,
        timer: 1500 // El mensaje de éxito se mostrará por 1.5 segundos
      });

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un problema al registrar los datos. Por favor, inténtalo de nuevo.'
      });
    }
  }


        
    return (
        <div className="sidebar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="sidebar-header">
                            <h3>Nueva Media</h3>
                            <i className="fa-solid fa-times" onClick={handleOpenModal}></i>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <hr />

                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Serial</label>
                                        <input type="text" name="serial" className="form-control" required value={valoresForm.serial} onChange={handleInputChange} />
                                        <div id="serialHelp" className="form-text">Introduzca el serial.</div>
                                    </div>
                                </div>
                                
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Titulo</label>
                                        <input type="text" name="titulo" className="form-control" required value={valoresForm.titulo} onChange={handleInputChange} />
                                        <div id="tituloHelp" className="form-text">Introduzca el titulo.</div>
                                    </div>
                                </div>
                                
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Sinopsis</label>
                                        <input type="text" name="sinopsis" className="form-control" required value={valoresForm.sinopsis} onChange={handleInputChange} />
                                        <div id="sinopsisHelp" className="form-text">Introduzca la sinopsis.</div>
                                    </div>
                                </div>
                                
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">URL</label>
                                        <input type="url" name="url" className="form-control" required value={valoresForm.url} onChange={handleInputChange} />
                                        <div id="urlHelp" className="form-text">Introduzca la URL.</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Imagen</label>
                                        <input type="url" name="imagen" className="form-control" required value={valoresForm.imagen} onChange={handleInputChange} />
                                        <div id="imagenHelp" className="form-text">Introduzca la imagen.</div>
                                    </div>
                                </div>
                                
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Año de Estreno</label>
                                        <input type="date" name="anioEstreno" className="form-control" required value={valoresForm.anioEstreno} onChange={handleInputChange} />
                                        <div id="anioEstrenoHelp" className="form-text">Introduzca el año de estreno.</div>
                                    </div>
                                </div>
                               
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Genero</label>
                                        <select className="form-select" name="genero" required value={valoresForm.genero} onChange={handleInputChange}>
                                            <option value="">Seleccione un género</option>
                                            {generos.map(({ _id, nombre }) => (
                                                <option key={_id} value={_id}>{nombre}</option>
                                            ))}
                                        </select>
                                        <div id="generoHelp" className="form-text">Introduzca el género.</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Director</label>
                                        <select className="form-select" name="director" required value={valoresForm.director} onChange={handleInputChange}>
                                            <option value="">Seleccione un Director</option>
                                            {directores.map(({ _id, nombre }) => (
                                                <option key={_id} value={_id}>{nombre}</option>
                                            ))}
                                        </select>
                                        <div id="directoraHelp" className="form-text">Introduzca una director.</div>
                                    </div>
                                </div>
                                
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Tipo</label>
                                        <select className="form-select" name="tipo" required value={valoresForm.tipo} onChange={handleInputChange}>
                                            <option value="">Seleccione un tipo</option>
                                            {tipos.map(({ _id, nombre }) => (
                                                <option key={_id} value={_id}>{nombre}</option>
                                            ))}
                                        </select>
                                        <div id="tipoHelp" className="form-text">Introduzca un tipo.</div>
                                    </div>
                                </div>
                                
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Productoras</label>
                                        <select className="form-select" name="productora" required value={valoresForm.productora} onChange={handleInputChange}>
                                            <option value="">Seleccione una productura</option>
                                            {productoras.map(({ _id, nombre }) => (
                                                <option key={_id} value={_id}>{nombre}</option>
                                            ))}
                                        </select>
                                        <div id="productoraHelp" className="form-text">Introduzca una productura.</div>
                                    </div>
                                </div>
                                
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}