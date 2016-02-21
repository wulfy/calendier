import React from 'react';

export default class LoginUserView extends React.Component {

	render()
	{
		var iconClass = "";
		if(this.props.login.roles[0]=="ROLE_USER")
			iconClass = "fa fa-user-secret";
		else
			iconClass = "fa fa-user";

		return (
           <div id="user-view">
              <i className={iconClass}></i> {this.props.login.login}  <button id="disconnect" onClick={this.props.handleLogout}><i className="fa fa-times-circle"></i></button>
           </div>
      		);
	}

}