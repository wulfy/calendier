import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import LoginView              from 'components/LoginView';
import * as LoginActions       from 'actions/LoginActions';
import * as CalendarActions       from 'actions/CalendarActions';
import RequestDisplay from 'components/RequestDisplay';

@connect(state => ({ login: state.login}))
export default class LoginContainer extends React.Component {

    componentDidMount = () => {


    }
    componentDidUpdate =(prevProps,prevState)=>{
        console.log("did update login");
        var {login,dispatch} = this.props;
        var prevlogin = prevProps.login;

            if(typeof(localStorage) !== "undefined" )
            {
                console.log("session token");
                console.log(login.id);
                if(typeof login.id !== 'undefined' && login.id !== null)
                {
                    console.log("session token ok");
                    localStorage.setItem("sessionToken", "ok");
                }
                else{
                    console.log("session token removed");
                    localStorage.removeItem("sessionToken");
                }
            }
        
    }
	render()
	{
      var {login,dispatch} = this.props;
      console.log("rendering login container " + login.id);
		return (
            <div id="login-container">
                <LoginView
                    {...bindActionCreators({...LoginActions,...CalendarActions},dispatch)} loginObject={login} params={this.props.params} />
                    <div id="login-message" > <RequestDisplay requestId="CONNECT_USER"/> </div>
                    
            </div>
      		);
	}

}