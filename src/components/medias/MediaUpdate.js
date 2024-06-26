import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMediaPorId, editarMedia } from "../../services/mediaService";
import { getGenero } from "../../services/generoService";
import { getProductora } from "../../services/productoraService";
import { getDirector } from "../../services/directorService";
import { getTipo } from "../../services/tipoService";
import Swal from "sweetalert2";

export const MediaUpdate = () => {
  const { mediaId = "" } = useParams();
  const [media, setMedia] = useState({});
  const [generos, setGeneros] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [valoresForm, setValoresForm] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    url: "",
    imagen: "",
    anioEstreno: "",
    director: "",
    genero: "",
    productora: "",
    tipo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMediaPorId(mediaId);
        setMedia(data);
        setValoresForm({
          serial: data.serial,
          titulo: data.titulo,
          sinopsis: data.sinopsis,
          url: data.url,
          imagen: data.imagen,
          anioEstreno: data.anioEstreno,
          director: data.director._id,
          genero: data.genero._id,
          productora: data.productora._id,
          tipo: data.tipo._id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [mediaId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getGenero();
        setGeneros(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProductora();
        setProductoras(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDirector();
        setDirectores(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTipo();
        setTipos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const media = {
      serial: valoresForm.serial,
      titulo: valoresForm.titulo,
      sinopsis: valoresForm.sinopsis,
      url: valoresForm.url,
      imagen: valoresForm.imagen,
      anioEstreno: valoresForm.anioEstreno,
      director: { _id: valoresForm.director },
      genero: { _id: valoresForm.genero },
      productora: { _id: valoresForm.productora },
      tipo: { _id: valoresForm.tipo },
    };

    try {
      await editarMedia(mediaId, media);
      console.log("Media guardada exitosamente:", media);
      Swal.fire({
        icon: "success",
        title: "Datos registrados exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al registrar los datos. Por favor, verifique los datos e inténtalo de nuevo.",
      });
    }
  };



  
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#404c5c",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="row">
        <div className="col-md-4">
          <img
            src={valoresForm.imagen}
            alt="Imagen de la media"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Serial</label>
                  <input
                    type="text"
                    name="serial"
                    className="form-control"
                    required
                    value={valoresForm.serial}
                    onChange={handleInputChange}
                  />
                  <div id="serialHelp" className="form-text">
                    Introduzca el serial.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Titulo</label>
                  <input
                    type="text"
                    name="titulo"
                    className="form-control"
                    required
                    value={valoresForm.titulo}
                    onChange={handleInputChange}
                  />
                  <div id="tituloHelp" className="form-text">
                    Introduzca el titulo.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Sinopsis</label>
                  <input
                    type="text"
                    name="sinopsis"
                    className="form-control"
                    required
                    value={valoresForm.sinopsis}
                    onChange={handleInputChange}
                  />
                  <div id="sinopsisHelp" className="form-text">
                    Introduzca la sinopsis.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">URL</label>
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    required
                    value={valoresForm.url}
                    onChange={handleInputChange}
                  />
                  <div id="urlHelp" className="form-text">
                    Introduzca la url.
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input
                    type="url"
                    name="imagen"
                    className="form-control"
                    required
                    value={valoresForm.imagen}
                    onChange={handleInputChange}
                  />
                  <div id="imagenHelp" className="form-text">
                    Introduzca la imagen.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Año de Estreno</label>
                  <input
                    type="text"
                    name="anioEstreno"
                    className="form-control"
                    required
                    value={valoresForm.anioEstreno}
                    onChange={handleInputChange}
                  />
                  <div id="anioEstrenoHelp" className="form-text">
                    Introduzca la fecha de estreno.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Director</label>
                  <select
                    className="form-select"
                    name="director"
                    required
                    value={valoresForm.director}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un director</option>
                    {directores.map(({ _id, nombre }) => (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                  <div id="directorHelp" className="form-text">
                    Seleccione el director.
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Productora</label>
                  <select
                    className="form-select"
                    name="productora"
                    required
                    value={valoresForm.productora}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una productora</option>
                    {productoras.map(({ _id, nombre }) => (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                  <div id="productoraHelp" className="form-text">
                    Seleccione una productora.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-select"
                    name="tipo"
                    required
                    value={valoresForm.tipo}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un tipo</option>
                    {tipos.map(({ _id, nombre }) => (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                  <div id="tipoHelp" className="form-text">
                    Seleccione un tipo.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Género</label>
                  <select
                    className="form-select"
                    name="genero"
                    required
                    value={valoresForm.genero}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un género</option>
                    {generos.map(({ _id, nombre }) => (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                  <div id="generoHelp" className="form-text">
                    Seleccione un género.
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
