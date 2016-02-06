import React from 'react';
import LoginUserView              from 'components/LoginUserView';
import LoginFormView              from 'components/LoginFormView';

export default class LoginView extends React.Component {

  componentDidMount =(prevProps,prevState)=>{
    this.props.connectUser(null,this.refreshUserEvents);
  }

  refreshUserEvents = () => {
    console.log("refreshUserEvents")
    console.log(this.props.loginObject);  
    if(this.props.loginObject.roles)
    {//is user connected get his role lvl
      if(this.props.loginObject.roles[0] == "ROLE_ADMIN")
        this.props.getUserEvents();  
      else
        console.log("no");
    }
  }
  handleLogin = (e) => {
    e.preventDefault();
    console.log("handlelogin");
    var data = {login:e.target.login.value,password:e.target.password.value};
    this.props.connectUser(data,this.refreshUserEvents);  
    
  }
  handleLogout = (e) => {
    e.preventDefault();
    console.log("handlelogout");
    this.props.logoutUser();    
  }
	render()
	{
    var view;
    console.log(this.props.loginObject);  
    if (this.props.loginObject.login) {
      view = <LoginUserView handleLogout={this.handleLogout} login={this.props.loginObject.login}/>;
    } else {
      view = <LoginFormView handleLogin={this.handleLogin}/>;
    }

		return (
           <div id="login-view">
            {view}
           </div>
      		);
	}

}