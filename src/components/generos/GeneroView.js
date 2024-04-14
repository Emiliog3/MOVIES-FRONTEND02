import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGenero, crearGenero } from '../../services/generoService'; // Importa las funciones de servicio para el modelo Genero
import Swal from 'sweetalert2';
import moment from 'moment';

export const GeneroView = () => {
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    descripcion: '',
    estado: 'Activo'

  });
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    listarGeneros();
  }, []);

  const listarGeneros = async () => {
    try {
      const resp = await getGenero();
      setGeneros(resp.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar los géneros',
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

    if (!valoresForm.nombre || !valoresForm.descripcion || !valoresForm.estado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos'
      });
      return;
    }

    const nombreExistente = generos.some(genero => genero.nombre === valoresForm.nombre);
    if (nombreExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre ingresado ya está registrado'
      });
      return;
    }

    try {
      await crearGenero(valoresForm);
      Swal.fire({
        title: 'Género creado',
        text: 'El género se ha creado correctamente',
        icon: 'success'
      });
      setValoresForm({ ...valoresForm, nombre: '', descripcion: '', estado: 'Activo' });
      listarGeneros();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear género',
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
              <label className="form-label">Descripción</label>
              <input required name="descripcion" value={valoresForm.descripcion} type="text" className="form-control" onChange={handleOnChange} />
            </div>
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

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="row">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{genero.nombre}</td>
              <td>{genero.descripcion}</td>
              <td>{genero.estado}</td>
              <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(genero.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <Link to={`/generos/edit/${genero._id}`} className="btn btn-primary">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
