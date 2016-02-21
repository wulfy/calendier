import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class Home extends React.Component {
  
  render() 
  {
    return (
      <div id="homecontent">
          Bienvenue sur le site Calendrier.
          vous souhaitez vous <Link to={`/account`}>connecter</Link> ou <Link to={`/createAccount`}>créer un compte </Link>?
      </div>
    );
  }
}