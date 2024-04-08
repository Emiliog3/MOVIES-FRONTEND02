// producturaService.js

import { axiosInstance } from "../components/helper/axios-config";

// Function to get all producers

const getProductora = () => {

    return axiosInstance.get('/productora', { // localhost:4000/productora
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to create a new producer

const crearProductora = (data) => {

    return axiosInstance.post('/productora', data, { // localhost:4000/productora
        headers: {
            'Content-Type': 'application/json',
        }
    });

}

// Function to update a producer

const editarProductora = (productoraId, data) => {
    
    return axiosInstance.put(`/productora/${productoraId}`, data, {  // localhost:4000/productora/:productoraId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
    
// Function to delete a producer

const eliminarProductora = (productoraId) => {
    
    return axiosInstance.delete(`/productora/${productoraId}`, { // localhost:4000/productora/:productoraId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export {
    getProductora,
    crearProductora,
    editarProductora,
    eliminarProductora,
}