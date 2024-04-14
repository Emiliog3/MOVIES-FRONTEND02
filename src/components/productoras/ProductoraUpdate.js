// ProductoraUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoraPorId, editarProductora } from '../../services/productoraService'; // Importa las funciones de servicio para el modelo Productora
import Swal from 'sweetalert2';

export const ProductoraUpdate = () => {
    const { productoraId = "" } = useParams();
    const [valoresForm, setValoresForm] = useState({
        nombre: '',
        estado: null, // Cambiado a null en lugar de ''
        slogan: '',
        descripcion: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getProductoraPorId(productoraId);
                setValoresForm({
                    nombre: data.nombre,
                    estado: data.estado,
                    slogan: data.slogan,
                    descripcion: data.descripcion
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar la productora',
                    text: error.message
                });
            }
        };
        fetchData();
    }, [productoraId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editarProductora(productoraId, valoresForm);
            Swal.fire({
                icon: 'success',
                title: 'Productora actualizada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un problema al actualizar la productora. Por favor, verifique los datos e inténtalo de nuevo.'
            });
        }
    };

    return (
        <div className="container">
            <h1>Editar Productora</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" required value={valoresForm.nombre} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select className="form-select" name="estado" required value={valoresForm.estado || ''} onChange={handleInputChange}>
                        <option value="">Seleccionar</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Slogan</label>
                    <input type="text" name="slogan" className="form-control" required value={valoresForm.slogan} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" name="descripcion" className="form-control" required value={valoresForm.descripcion} onChange={handleInputChange} />
                </div>
                
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
}
