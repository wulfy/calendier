import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import LoginContainer       from 'components/LoginContainer';
import { Link, browserHistory } from 'react-router';

@connect(state => ({ login: state.login}))
export default class Account extends React.Component {
  
  render() 
  {
  	var {login,dispatch} = this.props;
  	var view = "";
  	if (login.login) {
  		if(login.roles[0] == "ROLE_USER")
  			view =<div id="user-options">
        			 	<Link to={`/calendrier/${login.id}`}><i className="fa fa-calendar"></i> Accéder à votre calendrier </Link> <br/>
        			 	<Link to={`/calendrier/params/edit/${login.id}`}><i className="fa fa-list"></i> Paramétrer votre calendrier </Link>
        			 </div>;
      	

     view =<div id="options">
      				<Link to={`/params/user/${login.id}`}><i className="fa fa-child"></i>Modifier votre compte</Link>
      				{view}
      			</div>;
    } else {
      view = "non connecté";
    }
    return (
      <div id="account-content">
          <LoginContainer params={this.props.params}/>
          {view}
      </div>
    );
  }
}