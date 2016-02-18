import React from 'react';
import Home from 'components/Home';

export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <h1>Calendrier</h1>
        <hr />
        {this.props.children || <Home />}
      </div>
    );
  }
}