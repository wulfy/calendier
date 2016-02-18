import React     from 'react';
import { Route } from 'react-router';

import App from 'components';
import Calendrier from 'components/Calendrier';



export default (
  <Route name="app" component={App} path="/">
    <Route component={Calendrier} path="calendrier/:userId" />
  </Route>
);