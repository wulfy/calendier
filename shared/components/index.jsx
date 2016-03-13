import React from 'react';
import Home from 'components/Home';
import LoginContainer       from 'components/LoginContainer';

export default class AppView extends React.Component {
  render() {
  	var headerLogin = "";

  	if(this.props.children)
		headerLogin = <LoginContainer params={this.props.params}/>;

    return (
      <div id="app-view">
        <h1><Link to={`/`}>Calendrier</Link></h1>
        {headerLogin}
        <hr />
        {this.props.children || <Home />}
      </div>
    );
  }
}