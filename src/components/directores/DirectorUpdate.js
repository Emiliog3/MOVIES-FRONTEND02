import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDirectorPorId, editarDirector } from '../../services/directorService'; // Importa las funciones de servicio para el modelo Director
import Swal from 'sweetalert2';

export const DirectorUpdate = () => {
    const { directorId = "" } = useParams();
    const [valoresForm, setValoresForm] = useState({
        nombre: '',
        estado: null // Cambiado a null en lugar de ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getDirectorPorId(directorId);
                setValoresForm({
                    nombre: data.nombre,
                    estado: data.estado
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el director',
                    text: error.message
                });
            }
        };
        fetchData();
    }, [directorId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editarDirector(directorId, valoresForm);
            Swal.fire({
                icon: 'success',
                title: 'Director actualizado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un problema al actualizar el director. Por favor, verifique los datos e inténtalo de nuevo.'
            });
        }
    };

    return (
        <div className="container">
            <h1>Editar Director</h1>
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
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
}
