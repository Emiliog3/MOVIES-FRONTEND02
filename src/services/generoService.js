// generoService.js

import { axiosInstance } from "../components/helper/axios-config";

// Function to get all genres

const getGenero = () => {

    return axiosInstance.get('/genero', { // localhost:4000/genero
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to create a new genre

const crearGenero = (data) => {

    return axiosInstance.post('/genero', data, { // localhost:4000/genero
        headers: {
            'Content-Type': 'application/json',
        }
    });

}

// Function to update a genre

const editarGenero = (generoId, data) => {

    return axiosInstance.put(`/genero/${generoId}`, data, {  // localhost:4000/genero/:generoId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to delete a genre

const eliminarGenero = (generoId) => {
        
            return axiosInstance.delete(`/genero/${generoId}`, { // localhost:4000/genero/:generoId
                headers: {
                    'Content-Type': 'application/json',
                }
            });
}


// Funtion to get a genre por id

const getGeneroPorId = (generoId) => {
    return axiosInstance.get(`/genero/${generoId}`, { // localhost:4000/genero/:generoId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
    
export {
    getGenero,
    crearGenero,
    editarGenero,
    eliminarGenero,
    getGeneroPorId
}