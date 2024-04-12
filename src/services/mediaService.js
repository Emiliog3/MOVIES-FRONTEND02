
import { axiosInstance } from "../components/helper/axios-config";

// Lo unico que inicia en mayúscula es el nombre de la clase o funciones

// Function to get all states of equipment

const getMedia = () => {
  return axiosInstance.get("/media", {
    // http://localhost:4000/media axiosInstance tiene la url base y el puerto definido
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Function to create a new equipment state

const crearMedia = (data) => {
  return axiosInstance.post("/media", data, {
    // http://localhost:4000/media axiosInstance tiene la url base y el puerto definido
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Function to update an equipment state

const editarMedia = (mediaId, data) => {
  return axiosInstance.put(`/media/${mediaId}`, data, {
    // http://localhost:4000/media/:mediaId axiosInstance tiene la url base y el puerto definido
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Function to delete an equipment state

const eliminarMedia = (mediaId) => {
  // http://localhost:4000/media/:mediaId axiosInstance tiene la url base y el puerto definido
  return axiosInstance.delete(`/media/${mediaId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Función para get media por id

const getMediaPorId = (mediaId) => {
  return axiosInstance.get(`/media/${mediaId}`, {
    // http://localhost:4000/media/:mediaId axiosInstance tiene la url base y el puerto definido
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export {
    getMedia,
    crearMedia,
    editarMedia,
    eliminarMedia,
    getMediaPorId
};