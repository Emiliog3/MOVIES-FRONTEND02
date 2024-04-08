// rafc

import React, { useState, useEffect } from 'react';  //Explicar el useEffect. Es un hook que se ejecuta después de que el componente se renderiza

// Media Service
import { getMedia } from '../../services/mediaService'; // Importar la función getMedia del archivo mediaService

// Media Card
import { MediaCard } from './MediaCard'; // Importar el componente MediaCard

// Media New
import { MediaNew } from './MediaNew'; // Importar el componente MediaNew

export const MediaView = () => {

  const [media, setMedia] = useState([]); // Crear un estado de media que es un array vacío
  const [openModal, setOpenModal] = useState(false); // Crear un estado de openModal que es un booleano en false que significa que el modal está cerrado

  const listarMedia = async () => { // Función asíncrona que se encarga de llamar a la función getMedia y setear el estado de media
    try {
      const { data } = await getMedia();
      console.log(data);
      setMedia(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { // Es un hook que se ejecuta después de que el componente se renderiza
    listarMedia(); // Llamamos a la función listarMedia
  }, []);

  const handleOpenModal = () => { // Función para manejar la apertura y cierre del modal
    setOpenModal(!openModal)
  }

  return ( // Diseño de la vista incluido el número de cards por fila y en contenedor fluido para que se vea bien en dispositivos móviles
    <div className='container'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-3 g-2">
        {media.map((element) => ( // Mapear el array de media y para cada elemento llamar al componente MediaCard
          <MediaCard key={element._id} media={element} />
        ))}

      </div>

      {/* Renderización condicional del componente MediaNew basada en el estado de openModal. Si openModal es verdadero, se muestra el componente MediaNew; de lo contrario, no se muestra nada. */}
      {openModal ? <MediaNew
        handleOpenModal={handleOpenModal}
        listarMedia={listarMedia} /> : null}

      {/* Botón para abrir/cerrar el modal. Cuando se hace clic en el botón, se invoca la función handleOpenModal para cambiar el estado de openModal y mostrar u ocultar el modal. */}
      <button type="button" className="btn btn-primary fab" onClick={handleOpenModal}>
        <i className="fa-solid fa-plus"></i>
      </button>

    </div>
  );
}
