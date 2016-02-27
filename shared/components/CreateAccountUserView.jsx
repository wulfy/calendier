import React from 'react';
import { connect }            from 'react-redux';
import * as CreateAccountActions from 'actions/CreateAccountActions';
import * as LoginActions       from 'actions/LoginActions';
import { browserHistory, Router, Route, Link } from 'react-router';

@connect(state => ({ createAccount: state.createAccount, login: state.login}))
export default class CreateAccountUserView extends React.Component {

  componentWillMount = () =>{
      var {params} = this.props;
      var role = (params.type == "user")?"ROLE_USER":"ROLE_CLIENT";
      this.setState({error:{}});
      
    }

  handleCreateAccount = (e) => {
  	var {dispatch} = this.props;
  	e.preventDefault();
    console.log("handlecreate");
    console.log(e.target.value);
    var formdata = {
    				nom: e.target.nom.value,
    				prenom: e.target.prenom.value,
    				username: e.target.login.value,
            email: e.target.email.value,
    				password: e.target.password.value,
    				tel: e.target.tel.value,
    				roles: this.state.role};
    var logindata = {login:e.target.login.value,password:e.target.password.value};
    //var formdata = {login:e.target.login.value,password:e.target.password.value};
    dispatch(CreateAccountActions.createUser(formdata,this.autoLogin,logindata));  
  }
  handleCancelClick = (e) => {
  	e.preventDefault();
  }
  autoLogin = (autoLoginData) => {
    var {dispatch} = this.props;
    var data = {login:autoLoginData.login,password:autoLoginData.password};
    dispatch(LoginActions.connectUser(data)); 
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.createAccount.error)
      this.setState({error:nextProps.createAccount.data});
    console.log("state");
    console.log(this.state);
  }
  componentDidUpdate = (prevProps, prevState) => {
    var {createAccount,login} = this.props;
    $(".errorInput").removeClass("errorInput");

    if(createAccount.error)
      for(var key in createAccount.data) {
        $("#"+key).addClass("errorInput");
        //passer aussi en jquery je pense le message d'erreur + logo warning
      }
    else if(login.id)
    {
      window.location.href = "/calendar/edit/";
    }
  }

  render() 
  {
  	var {createAccount} = this.props;
    var message = this.state.error;

    return (
      <div id="createUserAccount-content">
          <form id="createUserAccount-form" onSubmit={this.handleCreateAccount}> 
                    Nom : <input id="nom" placeholder="Nom" name="nom" type="text" required />  
                    <div className="error">{message.nom}</div>
                    Prenom : <input id="prenom" placeholder="Prenom" name="prenom" type="text" required />  
                    <div className="error">{message.prenom}</div>
                    Identifiant : <input id="username" placeholder="Identifiant" name="login" type="text" required/>
                    <div className="error">{message.username}</div>
                    Mot de passe: <input id="password" placeholder="Mot de passe" name="password" type="password" required/>
                    <div className="error">{message.password}</div>
                    Email: <input id="email" placeholder="Email" name="email" type="email" required/>
                    <div className="error">{message.email}</div>
                    Tel : <input id="tel" placeholder="Prenom" name="tel" type="text" /> 
                    <br/> <button id="createaccount" type="submit" className="green"><i className="fa fa-calendar-check-o">Créer le compte</i></button>
                    <button id="cancel" onClick={this.handleCancelClick} className="red"><i className="fa fa-times">Annuler</i></button>          
           </form>
      </div>
    );
  }
}