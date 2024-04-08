// tipoService.js

import { axiosInstance } from "../components/helper/axios-config";

// Function to get all types

const getTipo = () => {

    return axiosInstance.get('/tipo', { // localhost:4000/tipo
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to create a new type

const crearTipo = (data) => {

    return axiosInstance.post('/tipo', data, { // localhost:4000/tipo
        headers: {
            'Content-Type': 'application/json',
        }
    });

}

// Function to update a type

const editarTipo = (tipoId, data) => {

    return axiosInstance.put(`/tipo/${tipoId}`, data, {  // localhost:4000/tipo/:tipoId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to delete a type

const eliminarTipo = (tipoId) => {

    return axiosInstance.delete(`/tipo/${tipoId}`, { // localhost:4000/tipo/:tipoId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export {
    getTipo,
    crearTipo,
    editarTipo,
    eliminarTipo,
}