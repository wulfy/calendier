import React from 'react';

export default class LoginUserView extends React.Component {

	render()
	{

		return (
           <div id="user-view">
              <i className="fa fa-user"></i> {this.props.login}  <button id="disconnect" onClick={this.props.handleLogout}><i className="fa fa-times-circle"></i></button>
           </div>
      		);
	}

}