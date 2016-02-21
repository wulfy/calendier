import React from 'react';

export default class LoginFormView extends React.Component {
  componentWillMount =()=>{
    this.setState({text:"Vous n etes pas connecte",
            className:"fa fa-chain-broken",
            click: null});
  }
  handleHoverConnect= (e) => {
    this.setState({text:"Connectez vous",
            className:"fa fa-link",
            click: this.handleConnectClick});
  }
  handleOutConnect= (e) => {
    this.setState({text:"Vous n etes pas connecte",
            className:"fa fa-chain-broken",
            click: this.handleConnectClick});
  }
  handleConnectClick= (e)=>{
      $("#login-form").show();
      $("#notConnected").hide();
  }
  handleCancelClick= (e)=>{
    e.preventDefault();
      $("#login-form").hide();
      $("#notConnected").show();
  }
	render()
	{
		return (
            <div id="form-view">
                <div id="notConnected" onMouseOver={this.handleHoverConnect} onMouseOut={this.handleOutConnect} onClick={this.state.click}>
                  <i className={this.state.className}></i> {this.state.text}<br/>
                </div>
                 <form id="login-form" onSubmit={this.props.handleLogin}>
                    login : <input id="login" placeholder="Login" name="login" type="text" required/>
                    password: <input id="password" placeholder="Password" name="password" type="password" required/>   
                    <br/> <button id="connecter" type="submit" className="green"><i className="fa fa-calendar-check-o">Connecter</i></button>
                    <button id="cancelLogin" onClick={this.state.handleCancelClick} className="red"><i className="fa fa-times">Annuler</i></button>          
                  </form>
            </div>
      		);
	}

}