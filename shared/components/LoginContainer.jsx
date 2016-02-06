import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import LoginView              from 'components/LoginView';
import * as LoginActions       from 'actions/LoginActions';
import * as CalendarActions       from 'actions/CalendarActions';

@connect(state => ({ login: state.login}))
export default class LoginContainer extends React.Component {

    
    componentDidUpdate =(prevProps,prevState)=>{
        //display message container
        $("#login-message").show();
        //hide message container after 5 seconds
        setTimeout(function(){fadeOut("#login-message")},5000);
    }
	render()
	{
      var {login,dispatch} = this.props;
      console.log("rendering login container " + login);
		return (
            <div id="login-container">
                <LoginView
                    {...bindActionCreators({...LoginActions,...CalendarActions},dispatch)} loginObject={login} />
                    <div id="login-message" className={login.className}>{login.message}</div>
            </div>
      		);
	}

}