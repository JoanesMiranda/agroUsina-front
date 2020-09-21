import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Mills from './pages/Mills';
import Harvests from './pages/Harvests';
import Farms from './pages/Harvests/Farms';
import Fields from './pages/Harvests/Fields';
import Map from './components/Mapa/mapa';

function Routes() {
    return (

        <Switch>
            <Route path="/" exact component={Mills} />
            <Route path="/farms/:id" component={Fields} />
            <Route path="/harvests/:id" component={Farms} />
            <Route path="/mills/:id" component={Harvests} />
            <Route path="/maps/:id" component={Map} />
        </Switch>
    );
}

export default Routes;