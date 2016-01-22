//client/index.jsx est un pattern de webpack-dev-server qui sait chercher automatiquement ce JS
//il est nécessaire de définir un JS côté client car le store doit etre généré aussi lorsque le client charge l'app 

import React       from 'react';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes      from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'immutable';
import { applyMiddleware } from 'redux';
import promiseMiddleware   from 'lib/promiseMiddleware';
import {logMiddleware,discardMiddleware,thunkMiddleware}   from 'lib/logMiddleware';



const history = createBrowserHistory();

let initialState = window.__INITIAL_STATE__;

const reducer = combineReducers(reducers);
//l'ordre d'insertion est l'ordre d execution des middleware donc thunk en premier empeche log de connaitre une action de rdemande de refresh de flickr
//par contre le dispatch de résultat GET_xxxxx  sera lui connu (car ce n est pas une fonction, cf l'action flickr)
const store   = applyMiddleware(promiseMiddleware,logMiddleware)(createStore)(reducer,initialState);

/*initialState.calendar.result.map(function(events) {
		console.log(events);
	});*/

render(
  <Provider store={store}>
      <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);