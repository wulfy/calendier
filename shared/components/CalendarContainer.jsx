import React from 'react';
import { bindActionCreators } from 'redux';
import * as CalendarActions       from 'actions/CalendarActions';
import { connect }            from 'react-redux';

@connect(state => ({ events: state.calendarEvents}))
export default class DevicesContainer extends React.Component {

  

	render()
	{
		  console.log("STATE RENDERING CALENDAR CONTAINER : ");
    	var { events, dispatch} = this.props;
    	

		return (
      		<div id="calendar"></div>
      		);
	}

}