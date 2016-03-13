import React                  from 'react';
import { bindActionCreators } from 'redux';
import CalendarContainer       from 'components/CalendarContainer';
import MessagesContainer       from 'components/MessagesContainer';
import FormContainer       from 'components/FormContainer';
import CalendarParamsContainer       from 'components/CalendarParamsContainer';
import * as BookActions       from 'actions/BookActions';
import * as CalendarActions       from 'actions/CalendarActions';
import * as CalendarParamsActions       from 'actions/CalendarParamsActions';

export default class Calendrier extends React.Component {
  //utilisé dans fetch component data
  static needs = [
      CalendarActions.getEvents,
      CalendarParamsActions.getParams
    ]
  render() 
  {
    return (
      <div id="content">
          <CalendarParamsContainer params={this.props.params}/>
          <MessagesContainer />
          <CalendarContainer />
          <FormContainer userId={this.props.params.userId}/>
      </div>
    );
  }
}