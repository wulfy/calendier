import React from 'react';
import { Link } from 'react-router';
export default class CreateAccount extends React.Component {
  
  render() 
  {
  	
    return (
      <div id="createaccount-content">
          <div>
               <Link to={`/account/create/user`}> <i className="fa fa-calendar"></i> Je souhaite un compte pour créer un calendrier </Link>
          </div>
          <div>
               <Link to={`/calendrier/create/client`}> <i className="fa fa-user"></i> Je souhaite un compte pour faire une réservation </Link>
          </div>
      </div>
    );
  }
}