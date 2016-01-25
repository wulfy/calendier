import React                  from 'react';
import { bindActionCreators } from 'redux';
import CalendarContainer       from 'components/CalendarContainer';
import MessagesContainer       from 'components/MessagesContainer';
import FormContainer       from 'components/FormContainer';
import * as BookActions       from 'actions/BookActions';
import * as CalendarActions       from 'actions/CalendarActions';

export default class Home extends React.Component {
  //utilisé dans fetch component data
  static needs = [
      CalendarActions.getEvents
    ]

  render() 
  {
    return (
      <div id="content">
          <MessagesContainer />
          <CalendarContainer />
          <FormContainer />
      </div>
    );
  }
}