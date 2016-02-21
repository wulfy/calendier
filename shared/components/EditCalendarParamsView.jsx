import React from 'react';
import { connect }            from 'react-redux';
import * as CreateAccountActions from 'actions/CreateAccountActions';


@connect(state => ({ login: state.login}))
export default class EditCalendarParamsView extends React.Component {

  componentWillMount = () =>{
      this.setState({error:{}});
      
    }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.createAccount.error)
      this.setState({error:nextProps.createAccount.data});
    console.log("state");
    console.log(this.state);
  }
  componentDidUpdate = (prevProps, prevState) => {
    var {createAccount} = this.props;
    $(".errorInput").removeClass("errorInput");

    if(createAccount.error)
      for(var key in createAccount.data) {
        $("#"+key).addClass("errorInput");
        //passer aussi en jquery je pense le message d'erreur + logo warning
      }
    else if(createAccount.data.id)
    {
      window.location.href = "/calendar/edit/"+createAccount.data.id;
    }
  }
  getCurrentParams = () => {
    /* execute l'action qui récupère pour la session de l'utilisateur les paramètres de son calendrier , s'il n'y a rien ne rempli pas le formulaire sinon préremplit*/
  }
  handleEdit = () => {
      /* si ID alors on édite sinon on insert . sera géré sur l'api, il faut juste envoyer le formulaire */
  }
  handleCancelClick = () => {
    e.preventDefault();
  }
  render() 
  {
  	var {createAccount} = this.props;
    var message = this.state.error;

    return (
      <div id="editCalendarParams-content">
          <form id="editCalendarParams-form" onSubmit={this.handleEdit}> 
                    Crenaux : <input id="bookable_periods" placeholder="Créneaux" name="bookable_periods" type="text" required />  
                    <div className="error">{message.bookable_periods}</div>
                    Duree : <input id="duree" placeholder="duree" name="duree" type="text" required />  
                    <div className="error">{message.duree}</div>
                    Message : <input id="message" placeholder="message" name="message" type="text"/>
                    <div className="error">{message.username}</div>
                    <br/> <button id="editparams" type="submit" className="green"><i className="fa fa-calendar-check-o">Valider</i></button>
                    <button id="cancel" onClick={this.handleCancelClick} className="red"><i className="fa fa-times">Annuler</i></button>          
           </form>
      </div>
    );
  }
}