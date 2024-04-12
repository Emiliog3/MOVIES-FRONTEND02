

import React from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


import { Header } from './components/ui/Header';


import { DirectorView } from './components/directores/DirectorView';
import { GeneroView } from './components/generos/GeneroView';
import { MediaView } from './components/medias/MediaView';
import { ProductoraView } from './components/productoras/ProductoraView';
import { TipoView } from './components/tipos/TipoView';
import { MediaUpdate } from "./components/medias/MediaUpdate";


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

                <Redirect to='/medias' /> {/* Redireccionar a la ruta raíz si ninguna de las anteriores coincide Minuto 1.42 de 2.42 semna 4 Ing. Web*/}
            </Switch>
        </Router>
    
  )
}

export {
    App,
}
