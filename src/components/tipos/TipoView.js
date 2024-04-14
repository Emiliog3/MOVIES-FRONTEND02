import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTipo, crearTipo } from '../../services/tipoService'; // Importa las funciones de servicio para el modelo Tipo
import Swal from 'sweetalert2';
import moment from 'moment';

export const TipoView = () => {
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    descripcion: ''
  });
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    listarTipos();
  }, []);

  const listarTipos = async () => {
    try {
      const resp = await getTipo();
      setTipos(resp.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar los tipos',
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

    if (!valoresForm.nombre || !valoresForm.descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete el nombre y la descripción'
      });
      return;
    }

    const nombreExistente = tipos.some(tipo => tipo.nombre === valoresForm.nombre);
    if (nombreExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre ingresado ya está registrado'
      });
      return;
    }

    try {
      await crearTipo(valoresForm);
      Swal.fire({
        title: 'Tipo creado',
        text: 'El tipo se ha creado correctamente',
        icon: 'success'
      });
      setValoresForm({ ...valoresForm, nombre: '', descripcion: '' });
      listarTipos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear tipo',
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

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="row">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{tipo.nombre}</td>
              <td>{tipo.descripcion}</td>
              <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(tipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <Link to={`/tipos/edit/${tipo._id}`} className="btn btn-primary">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
