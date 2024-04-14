

import React from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


import { Header } from './components/ui/Header';


import { MediaView } from './components/medias/MediaView';
import { DirectorView } from './components/directores/DirectorView';
import { GeneroView } from './components/generos/GeneroView';
import { ProductoraView } from './components/productoras/ProductoraView';
import { TipoView } from './components/tipos/TipoView';

import { MediaUpdate } from "./components/medias/MediaUpdate";
import { DirectorUpdate } from "./components/directores/DirectorUpdate";
import { GeneroUpdate } from "./components/generos/GeneroUpdate";
import { ProductoraUpdate } from "./components/productoras/ProductoraUpdate";
import { TipoUpdate } from "./components/tipos/TipoUpdate";


function App() {
    return (
        <Router>
            <Header />
            <Switch>

                <Route exact path='/medias' component={MediaView} />
                <Route exact path='/directores' component={DirectorView} />
                <Route exact path='/generos' component={GeneroView} />
                <Route exact path='/productoras' component={ProductoraView} />
                <Route exact path='/tipos' component={TipoView} />

                <Route exact path='/medias/edit/:mediaId' component={MediaUpdate} /> {/* Se agrega una ruta para editar una media */}
                <Route exact path='/directores/edit/:directorId' component={DirectorUpdate} /> {/* Se agrega una ruta para editar un director */}
                <Route exact path='/generos/edit/:generoId' component={GeneroUpdate} /> {/* Se agrega una ruta para editar un género */}
                <Route exact path='/productoras/edit/:productoraId' component={ProductoraUpdate} /> {/* Se agrega una ruta para editar una productora */}
                <Route exact path='/tipos/edit/:tipoId' component={TipoUpdate} /> {/* Se agrega una ruta para editar un tipo */}
                

                <Redirect to='/medias' /> {/* Redireccionar a la ruta raíz si ninguna de las anteriores coincide Minuto 1.42 de 2.42 semna 4 Ing. Web*/}
            </Switch>
        </Router>
    
  )
}

export {
    App,
}
