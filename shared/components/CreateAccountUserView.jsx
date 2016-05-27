import React from 'react';
import { connect }            from 'react-redux';
import * as CreateAccountActions from 'actions/CreateAccountActions';
import * as LoginActions       from 'actions/LoginActions';
import { browserHistory,router } from 'react-router';
import RequestDisplay from 'components/RequestDisplay';

@connect(state => ({ createAccount: state.createAccount, login: state.login}))
export default class CreateAccountUserView extends React.Component {

  componentWillMount = () =>{
      var {params} = this.props;
      //var role = (params.type == "user")?"ROLE_USER":"ROLE_CLIENT";
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
    				role: this.props.params.type};
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
      if(this.props.params.type == "user")
      {
        console.log("redirecting");
        browserHistory.push('/calendrier/params/edit');
      }
      else
        window.location.href = "/account";
    }
  }

  render() 
  {
  	var {createAccount} = this.props;
    var message = this.state.error;

    return (
      <div id="createUserAccount-content">

          <form id="createUserAccount-form" onSubmit={this.handleCreateAccount}> 
                  <div className="form-group">
                    <label for="nom"> Nom </label>
                    <input id="nom" className="form-control" placeholder="Nom" name="nom" type="text" required />  
                    <div className="error">{message.nom}</div>
                  </div>
                  <div className="form-group">
                    <label for="prenom"> Prenom </label>
                    <input id="prenom" className="form-control" placeholder="Prenom" name="prenom" type="text" required />  
                    <div className="error">{message.prenom}</div>
                  </div>
                  <div className="form-group">
                    <label for="username"> Identifiant </label>
                    <input id="username" className="form-control" placeholder="Identifiant" name="login" type="text" required/>
                    <div className="error">{message.username}</div>
                  </div>
                  <div className="form-group">
                    <label for="password"> Mot de passe </label>
                    <input id="password" className="form-control" placeholder="Mot de passe" name="password" type="password" required/>
                    <div className="error">{message.password}</div>
                  </div>
                  <div className="form-group">
                    <label for="email"> Email </label>
                    <input id="email" className="form-control" placeholder="Email" name="email" type="email" required/>
                    <div className="error">{message.email}</div>
                  </div>
                  <div className="form-group">
                    <label for="tel"> Tel </label>
                    <input id="tel" className="form-control" placeholder="Prenom" name="tel" type="text" /> 
                  </div>

                    <button id="cancel" onClick={this.handleCancelClick} className="btn btn-lg btn-default"><i className="fa fa-times">Annuler</i></button>          
                    <button id="createaccount" type="submit" className="btn btn-lg btn-success"><i className="fa fa-calendar-check-o">Créer le compte</i></button>
           </form>
           <RequestDisplay requestId="CREATE_ACCOUNT"/>
      </div>
    );
  }
}