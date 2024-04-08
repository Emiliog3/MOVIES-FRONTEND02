// directorService.js

import { axiosInstance } from "../components/helper/axios-config";

// Function to get all directors

const getDirector = () => {
    return axiosInstance.get('/director', { // localhost:4000/director
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to create a new director

const crearDirector = (data) => {

    return axiosInstance.post('/director', data, { // localhost:4000/director
        headers: {
            'Content-Type': 'application/json',
        }
    });

}

// Function to update a director

const editarDirector = (directorId, data) => {

    return axiosInstance.put(`/director/${directorId}`, data, {  // localhost:4000/director/:directorId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to delete a director

const eliminarDirector = (directorId) => {
    
        return axiosInstance.delete(`/director/${directorId}`, { // localhost:4000/director/:directorId
            headers: {
                'Content-Type': 'application/json',
            }
        });
}
    
export {
    getDirector,
    crearDirector,
    editarDirector,
    eliminarDirector,
}