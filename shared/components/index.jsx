import React from 'react';

export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <h1>Calendrier</h1>
        <hr />
        {this.props.children} 
      </div>
    );
  }
}