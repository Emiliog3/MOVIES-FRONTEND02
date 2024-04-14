// TipoUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTipoPorId, editarTipo } from '../../services/tipoService'; // Importa las funciones de servicio para el modelo Tipo
import Swal from 'sweetalert2';

export const TipoUpdate = () => {
    const { tipoId = "" } = useParams();
    const [valoresForm, setValoresForm] = useState({
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getTipoPorId(tipoId);
                setValoresForm({
                    nombre: data.nombre,
                    descripcion: data.descripcion
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el tipo',
                    text: error.message
                });
            }
        };
        fetchData();
    }, [tipoId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editarTipo(tipoId, valoresForm);
            Swal.fire({
                icon: 'success',
                title: 'Tipo actualizado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un problema al actualizar el tipo. Por favor, verifique los datos e inténtalo de nuevo.'
            });
        }
    };

    return (
        <div className="container">
            <h1>Editar Tipo</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" required value={valoresForm.nombre} onChange={handleInputChange} />
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
