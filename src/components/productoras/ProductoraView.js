import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductora, crearProductora } from '../../services/productoraService'; // Importa las funciones de servicio para el modelo Productora
import Swal from 'sweetalert2';
import moment from 'moment';

export const ProductoraView = () => {
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    estado: 'Activo',
    slogan: '',
    descripcion: ''
  });
  const [productoras, setProductoras] = useState([]);

  useEffect(() => {
    listarProductoras();
  }, []);

  const listarProductoras = async () => {
    try {
      const resp = await getProductora();
      setProductoras(resp.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar las productoras',
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

    if (!valoresForm.nombre || !valoresForm.slogan || !valoresForm.descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos'
      });
      return;
    }

    const nombreExistente = productoras.some(productora => productora.nombre === valoresForm.nombre);
    if (nombreExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre ingresado ya está registrado'
      });
      return;
    }

    try {
      await crearProductora(valoresForm);
      Swal.fire({
        title: 'Productora creada',
        text: 'La productora se ha creado correctamente',
        icon: 'success'
      });
      setValoresForm({ ...valoresForm, nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
      listarProductoras();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear productora',
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
              <label className="form-label">Estado</label>
              <select required name="estado" value={valoresForm.estado} className="form-select" onChange={handleOnChange}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Slogan</label>
              <input required name="slogan" value={valoresForm.slogan} type="text" className="form-control" onChange={handleOnChange} />
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
            <th scope="col">Estado</th>
            <th scope="col">Slogan</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map((productora, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
              <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(productora.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <Link to={`/productoras/edit/${productora._id}`} className="btn btn-primary">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
