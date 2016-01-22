import React from 'react';
import { bindActionCreators } from 'redux';
import * as CalendarActions       from 'actions/CalendarActions';
import { connect }            from 'react-redux';
var moment = require('moment');

@connect(state => ({ events: state.calendar}))
export default class DevicesContainer extends React.Component {

  	setEvents = (reservations) => {
    		var html = '<script type="application/javascript"> var reservationsBDD = '+JSON.stringify(reservations)+';</script>';
    		return { __html: html }; 
    }
    componentDidMount = () =>{
    	var { events, dispatch} = this.props;
    	var reservations = new Array();
		console.log(events);
    	for(var i in events)
    	{
    		reservations.push({title:events[i].title , start: moment(events[i].dateStart.timestamp *1000),end:moment(events[i].dateEnd.timestamp *1000),duree:events[i].duree})
    	}
    	reservationsBDD = reservations;
  	}
	render()
	{
		  console.log("STATE RENDERING CALENDAR CONTAINER : ");
    	var { events, dispatch} = this.props;
    	var reservations = new Array();
    	
		return (
			<div id="calendar-container">
	      		<div id="calendar">
	      		</div>
      		</div>
      		);
	}

}