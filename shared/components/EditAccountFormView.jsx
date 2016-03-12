import React from 'react';
import { connect }            from 'react-redux';
import * as LoginActions       from 'actions/LoginActions';

@connect(state => ({ login: state.login}))
export default class EditAccountFormView extends React.Component {
  componentWillMount =()=>{
    var {login} = this.props;
     this.setState({data:login,changed:false});
     this.commandSent = false;
  }
  handleCancelClick = () =>{
      
  }
  componentWillReceiveProps = (nextProps) => {
    console.log("receive props");
    var {login} = nextProps;
    var newState = login
    if(login.data)
      this.setState({data:newState});
  }
  handleEditAccount = (e) => {
     e.preventDefault();

    var {dispatch} = this.props;
   
    console.log("handle");
 

    if(e.target.password.value.length >0)
    if(e.target.password.value != e.target.confirmpassword.value)
    {
      const errordiv = document.createElement('div');
      const cpwdelement = document.getElementById(e.target.confirmpassword.id)
      const pwdelement = document.getElementById(e.target.password.id)
      errordiv.innerHTML = 'Password and confirm password don t match';
      cpwdelement.style["border"] = "1px solid red";
      pwdelement.style["border"] = "1px solid red";
      errordiv.style["color"] = "red";
      cpwdelement.parentElement.appendChild(errordiv);
    }

      

      if(this.state.changed)
      {console.log("foreach");
        var data = {};
        for (var key of Object.keys(e.target))
        {
            
          data[e.target[key].name] = e.target[key].value;
        }
        this.commandSent = true;
        dispatch(LoginActions.updateUser(data));
      }
    
  }
  handleChangeInput = (e)=> {
    console.log("CHANGE");
    this.removeMessages();
    var newState = this.state.data?this.state.data:{};
    newState[e.target.id] = e.target.value
    this.setState({data:newState,changed:true});
  }
  removeMessages = ()=>{
    var errors = document.querySelector(".error");
    var messagediv = document.getElementById("message");

    if(errors)
      errors.parentNode.removeChild(errors);

    if(messagediv)
      messagediv.parentNode.removeChild(messagediv);


  }
  componentDidUpdate = (prevProps, prevState) => {
    var {login} = this.props;
    this.removeMessages();

    $(".errorInput").removeClass("errorInput");

    //si erreur et si une commande est partie récemment
    if(this.commandSent)
    {
      //on réinitialise le flag de command
      this.commandSent = false;
      var className = "";
      var message = "";
      if(login.error)
      { 
          for(var key in login.error.data) {
            $("#"+key).addClass("errorInput");
            className = "error";
            var errordiv = document.createElement("div");
            var element = document.getElementById(key);
            element.parentNode.insertBefore(errordiv, element.nextSibling);
            //passer aussi en jquery je pense le message d'erreur + logo warning
          }
      }else if(login.message)
      {
          className = "message";
          message =  login.message;
          var messagediv = document.getElementById("message");
          messagediv.setAttribute('class', className);
          messagediv.innerHTML = message;
      }

      

    }
  }

	render()
	{
    var {login} = this.props;

		return (
            <div id="edit-form-view">
                 <form id="edit-login-form" onSubmit={this.handleEditAccount}>
                    login : <input id="username" placeholder="username" name="username" type="text" value={this.state.data.username} onChange={this.handleChangeInput} required/>
                    email : <input id="email" placeholder="email" name="email" type="email" value={this.state.data.email} onChange={this.handleChangeInput} required/>
                    password: <input id="password" placeholder="password" name="password" type="password" onChange={this.handleChangeInput}/> 
                    confirm password: <input id="confirmpassword" placeholder="confirmpassword" name="confirmpassword" type="password" />   
                    <br/> <button id="connecter" type="submit" className="green"><i className="fa fa-calendar-check-o">Modifier vos données</i></button>
                    <button id="cancelLogin" onClick={this.handleCancelClick} className="red"><i className="fa fa-times">Annuler</i></button>          
                  </form>
                  <div id="message"></div>
            </div>
      		);
	}

}