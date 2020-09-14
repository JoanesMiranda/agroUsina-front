import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Mills from './pages/Mills';
import Harvests from './pages/Harvests';
import Farms from './pages/Harvests/Farms';
import Fields from './pages/Harvests/Fields';

function Routes() {
    return (

        <Switch>
            <Route path="/" exact component={Mills} />
            <Route path="/farms/:id" component={Fields} />
            <Route path="/harvests/:id" component={Farms} />
            <Route path="/mills/:id" component={Harvests} />
        </Switch>
    );
}

export default Routes;