// GeneroUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGeneroPorId, editarGenero } from '../../services/generoService'; // Importa las funciones de servicio para el modelo Genero
import Swal from 'sweetalert2';

export const GeneroUpdate = () => {
    const { generoId = "" } = useParams();
    const [valoresForm, setValoresForm] = useState({
        nombre: '',
        descripcion: '',
        estado: null // Cambiado a null en lugar de ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getGeneroPorId(generoId);
                setValoresForm({
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    estado: data.estado
                    
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el género',
                    text: error.message
                });
            }
        };
        fetchData();
    }, [generoId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editarGenero(generoId, valoresForm);
            Swal.fire({
                icon: 'success',
                title: 'Género actualizado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un problema al actualizar el género. Por favor, verifique los datos e inténtalo de nuevo.'
            });
        }
    };

    return (
        <div className="container">
            <h1>Editar Género</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" required value={valoresForm.nombre} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" name="descripcion" className="form-control" required value={valoresForm.descripcion} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select className="form-select" name="estado" required value={valoresForm.estado || ''} onChange={handleInputChange}>
                        <option value="">Seleccionar</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>


                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
}
