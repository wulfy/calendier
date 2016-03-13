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
    var paramsOption = "";
    var gotoCalendarOption = "";

  	if (login.login) {

      if (login.roles[0] == "ROLE_USER"){
        paramsOption = <li><Link to={`/calendrier/params/edit/`}><i className="fa fa-list"></i> Paramétrer votre calendrier </Link></li>;
        gotoCalendarOption = <li><Link to={`/calendrier/${login.id}`}><i className="fa fa-calendar"></i> Accéder à votre calendrier </Link> </li>;
      }
     view =<ul id="options">
              {paramsOption}
              {gotoCalendarOption}
              <li ><Link to={`/account/edit`}><i className="fa fa-child"></i>Modifier votre compte</Link></li>
      			</ul>;
    } else {
      view = <div> <span>"non connecté"</span>
                  
            </div>;
    }
    return (
      <div id="account-content">
          {view}
      </div>
    );
  }
}