import React from 'react';
import Home from 'components/Home';
import LoginContainer       from 'components/LoginContainer';
import { Link, browserHistory } from 'react-router';
import MyTools   from 'components/MyTools';

export default class AppView extends React.Component {
  render() {
  	var headerLogin = "";

  	if(this.props.children)
		headerLogin = <LoginContainer params={this.props.params}/>;

    return (


      <div id="app-view">
        <nav>
          <h1><Link to={`/`}> <i className="fa fa-calendar rotate"></i> Calendrier</Link></h1>
        </nav>
        {headerLogin}
      
        {this.props.children || <Home />}
        <MyTools/>
      </div>
    );
  }
}