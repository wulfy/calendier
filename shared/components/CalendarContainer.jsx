import React from 'react';
import { bindActionCreators } from 'redux';
import * as CalendarActions       from 'actions/CalendarActions';
import { connect }            from 'react-redux';


@connect(state => ({ events: state.calendar}))
export default class DevicesContainer extends React.Component {

  	setEvents = (reservations) => {
    		var html = '<script type="application/javascript"> var reservationsBDD = '+JSON.stringify(reservations)+';</script>';
    		return { __html: html }; 
    }
    componentDidMount = () =>{
    	var { events, dispatch} = this.props;
      console.log("didmount");
      console.log(events);
    	reservationsBDD = events.reservations;
  	}
	render()
	{
		  console.log("STATE RENDERING CALENDAR CONTAINER : ");
    	   	
		return (
			<div id="calendar-container">
	      		<div id="calendar">
	      		</div>
      		</div>
      		);
	}

}