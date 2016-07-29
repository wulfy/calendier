import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';

export default class MyTools extends Component {
  render() {
    return (
      <div id="tools">
        <DevTools />
      </div>
    );
  }
}

