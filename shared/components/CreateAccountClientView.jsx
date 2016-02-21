import React from 'react';
import { connect }            from 'react-redux';
import * as CreateAccountActions       from 'actions/CreateAccountActions';

@connect(state => ({ createAccount: state.createAccount}))
export default class CreateAccountClientView extends React.Component {
  
  handleCreateAccount = (e) => {
  	var {dispatch} = this.props;
  	e.preventDefault();
    console.log("handlecreate");
    var formdata = {
    				nom: e.target.nom,
    				prenom: e.target.prenom,
    				login: e.target.identifiant,
    				password: e.target.password,
    				tel: e.target.tel,
    				roles: ['ROLE_CLIENT']};
    //var formdata = {login:e.target.login.value,password:e.target.password.value};
    dispatch(createUser(formdata)); 
  }
  handleCancelClick = (e) => {
  	e.preventDefault();
  }
  render() 
  {
  	
    return (
      <div id="createClientAccount-content">
          <form id="createClientAccount-form" onSubmit={this.handleCreateAccount}>
                    Identifiant : <input id="login" placeholder="Identifiant" name="login" type="text" required/>
                    Mot de passe: <input id="password" placeholder="Mot de passe" name="password" type="password" required/>  
                    Nom : <input id="nom" placeholder="Nom" name="nome" type="text" />  
                    Prenom : <input id="prenom" placeholder="Prenom" name="prenom" type="text" />  
                    Tel : <input id="prenom" placeholder="Prenom" name="prenom" type="text" /> 
                    <br/> <button id="createaccount" type="submit" className="green"><i className="fa fa-calendar-check-o">Créer le compte</i></button>
                    <button id="cancel" onClick={this.handleCancelClick} className="red"><i className="fa fa-times">Annuler</i></button>          
           </form>
      </div>
    );
  }
}