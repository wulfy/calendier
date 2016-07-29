import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
//import createLocation            from 'history/lib/createLocation';
import routes                    from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers             from 'reducers';
import path                      from 'path';
import { applyMiddleware } from 'redux';
import promiseMiddleware   from 'lib/promiseMiddleware';
import {logMiddleware,thunkMiddleware}   from 'lib/logMiddleware';
import fetchComponentData from 'lib/fetchComponentData';
import fs from 'fs';
import yaml from 'js-yaml';


const app = express();


app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'jslib')));

app.use((req, res) => {
  //const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware,logMiddleware)(createStore)(reducer);

  //matche la location avec le tableau de "routes" et retourne un objet renderProps qui contient l'élément correspondant a la route
  match({ routes, location : req.url }, (err, redirectLocation, renderProps) => {
    if (err) { 
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) return res.status(404).end('Not found.');

    function renderView()
    {
            const InitialComponent = (
              //provider permet de fournir le store au composant 
              <Provider store={store}> 
                  <RouterContext {...renderProps} />
                </Provider>
            );
            //this.props.createThunkFlickr();
            const componentHTML = renderToString(InitialComponent);
            const initialState = store.getState();

            const HTML = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Calendar</title>
                  <link rel='stylesheet' href='/components/fullcalendar/dist/fullcalendar.css' />
                  <link rel='stylesheet' href='/calendrier.css' />
                  <link rel='stylesheet' href='/components/bootstrap/dist/css/bootstrap.min.css' />
                  <link rel='stylesheet' href='/components/bootstrap/dist/css/bootstrap-theme.min.css' />
                  <link rel="stylesheet" href="https://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css"/>
                  <script type="application/javascript">
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                    var reservationsBDD = new Array();
                    function fadeOut(domid)
                    {
                      $( domid ).fadeOut( "slow");
                    }
                  </script>

                  
              </head>
              <body>
                <div id="react-view">${componentHTML}</div>

                


                
                <script src='/components/jquery/dist/jquery.min.js'></script>
                <script src='/components/jquery-modal/jquery.modal.min.js'></script>
                  <script src='/components/moment/min/moment.min.js'></script>
                  <script src='/components/fullcalendar/dist/fullcalendar.min.js'></script>
                  <script src='/components/fullcalendar/dist/lang-all.js'></script>
                <script type="application/javascript" src="/bundle.js"></script>

              </body>
          </html>    
        `
            //res.end(HTML);
            return HTML;
      }
    
      //permet de créer un promise pour traiter les taches asynchrone (promise de la todo et request de flickr)
      //Ainsi le serveur attend le retour de la promesse pour générer le rendu
      //utilise les needs des components fournis par renderprops 
      //ces components sont ceux utilisés dans route car renderprops est rempli par rect-router
      // renderprops.params est le parametre dans route , ex: /calendrier/:userId si je vais sur la route
      ///calendrier/72 le param sera userid:72
      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
                        .then(renderView)
                        .then(html => res.end(html))
                        .catch(err => res.end(err.message));
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Server listening on', PORT);
});

export default app;