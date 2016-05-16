import React from 'react';
import { Link } from 'react-router';
export default class CreateAccount extends React.Component {
  
  render() 
  {
  	
    return (
      <div id="createaccount-content">
          <div className="container">
            <div className="row">
              <div className = "jumbotron alert-danger dashed-top margin-bottom-none">
                  <Link to={`/account/create/user`}> 
                    <div className="col-xs-4 ficon-10x text-center">
                      <i className="fa fa-calendar"></i>
                    </div>
                    <div className="col-xs-7">
                           <h2> Creer votre calendrier </h2> Créez votre calendrier avec <b>vos horaires</b> d'ouverture et un message de bienvenue ! 
                    </div>
                  </Link>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="jumbotron alert-info dashed-top margin-bottom-none">
                  <Link to={`/account/create/client`}>
                    <div className="col-xs-7 text-right">
                         <h2> Faite une réservation </h2> Trouvez facilement un créneau au jour de votre choix et réservez en 1 clic  
                    </div>
                    <div className="col-xs-4 ficon-10x text-center">
                      <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </div>
                  </Link>
              </div>
            </div>
          </div>
      </div>
    );
  }
}