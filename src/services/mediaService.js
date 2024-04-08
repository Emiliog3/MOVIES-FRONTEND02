// mediaService.js

import { axiosInstance } from "../components/helper/axios-config";

// Function to get all media

const getMedia = () => {

    return axiosInstance.get('/media', { // localhost:4000/media
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to create a new media

const crearMedia = (data) => {

    return axiosInstance.post('/media', data, { // localhost:4000/media
        headers: {
            'Content-Type': 'application/json',
        }
    });

}

// Function to update a media

const editarMedia = (mediaId, data) => {

    return axiosInstance.put(`/media/${mediaId}`, data, {  // localhost:4000/media/:mediaId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// Function to delete a media

const eliminarMedia = (mediaId) => {

    return axiosInstance.delete(`/media/${mediaId}`, { // localhost:4000/media/:mediaId
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export {
    getMedia,
    crearMedia,
    editarMedia,
    eliminarMedia,
}