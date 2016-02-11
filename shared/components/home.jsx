import React                  from 'react';
import { bindActionCreators } from 'redux';
import CalendarContainer       from 'components/CalendarContainer';
import MessagesContainer       from 'components/MessagesContainer';
import FormContainer       from 'components/FormContainer';
import LoginContainer       from 'components/LoginContainer';
import CalendarParamsContainer       from 'components/CalendarParamsContainer';
import * as BookActions       from 'actions/BookActions';
import * as CalendarActions       from 'actions/CalendarActions';
import * as CalendarParamsActions       from 'actions/CalendarParamsActions';

export default class Home extends React.Component {
  //utilisé dans fetch component data
  static needs = [
      CalendarActions.getEvents,
      CalendarParamsActions.getParams
    ]

  render() 
  {
    return (
      <div id="content">
          <LoginContainer params={this.props.params}/>
          <CalendarParamsContainer params={this.props.params}/>
          <MessagesContainer />
          <CalendarContainer />
          <FormContainer userId={this.props.params.userId}/>
      </div>
    );
  }
}