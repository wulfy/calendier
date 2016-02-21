import React     from 'react';
import { Route } from 'react-router';

import App from 'components';
import Calendrier from 'components/Calendrier';
import Account from 'components/Account';
import CreateAccount from 'components/CreateAccount';
import CreateAccountUserView from 'components/CreateAccountUserView';
import CreateAccountClientView from 'components/CreateAccountClientView';

export default (
  <Route name="app" component={App} path="/">
    <Route component={Calendrier} path="calendrier/:userId" />
    <Route component={Account} path="account" />
    <Route component={CreateAccountUserView} path="/account/create/user" />
    <Route component={CreateAccountClientView} path="/account/create/client" />
    <Route component={CreateAccount} path="createAccount" />
  </Route>

);