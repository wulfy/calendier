import React from 'react';

export default class LoginFormView extends React.Component {

	render()
	{

		return (
           <form id="login-form" onSubmit={this.props.handleLogin}>
              login : <input id="login" placeholder="Login" name="login" type="text" />
              password: <input id="password" placeholder="Password" name="password" type="password" />   
              <br/> <button id="connecter" type="submit"><i className="fa fa-calendar-check-o">Connecter</i></button>         
            </form>
      		);
	}

}