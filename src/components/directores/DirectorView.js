import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDirector, crearDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const DirectorView = () => {
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    estado: 'Activo'
  });
  const [directores, setDirectores] = useState([]);

  useEffect(() => {
    listarDirectores();
  }, []);

  const listarDirectores = async () => {
    try {
      const resp = await getDirector();
      setDirectores(resp.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar directores',
        text: error.message
      });
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({
      ...valoresForm,
      [e.target.name]: e.target.value
    });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!valoresForm.nombre || !valoresForm.estado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete el nombre y el estado'
      });
      return;
    }

    const nombreExistente = directores.some(director => director.nombre === valoresForm.nombre);
    if (nombreExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre ingresado ya está registrado'
      });
      return;
    }

    try {
      await crearDirector(valoresForm);
      Swal.fire({
        title: 'Director creado',
        text: 'El director se ha creado correctamente',
        icon: 'success'
      });
      setValoresForm({ ...valoresForm, nombre: '', estado: 'Activo' });
      listarDirectores();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear director',
        text: error.message
      });
    }
  }

  return (
    <div className="container-fluid">
      <form onSubmit={handleOnSubmit}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name="nombre" value={valoresForm.nombre} type="text" className="form-control" onChange={handleOnChange} />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <div className="form-label">Estado</div>
              <select required name="estado" value={valoresForm.estado} className="form-select" onChange={handleOnChange}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="row">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{director.nombre}</td>
              <td>{director.estado}</td>
              <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>

                <Link to={"/directores/edit/" + director._id} className="btn btn-primary">Editar</Link> {/* Se tiene que nombrar "/directores/edit" porque así se nombró en la APP*/}


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}