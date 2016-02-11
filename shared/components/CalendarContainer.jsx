import React from 'react';
import { bindActionCreators } from 'redux';
import * as CalendarActions       from 'actions/CalendarActions';
import { connect }            from 'react-redux';


@connect(state => ({ events: state.calendar}))
export default class CalendarContainer extends React.Component {

    componentDidMount = () =>{
    	//var { events, dispatch} = this.props;
      updateReservations(this.props.events.reservations);
      console.log("didmount");
      console.log(reservations);

  	}

    componentDidUpdate =(prevProps,prevState)=>{
      var { events, dispatch} = this.props;
          console.log("update");
          console.log(events);
          var newevents = new Array();
          updateReservations(events.reservations);
            /*var free = getCreauxLibresHelper(current,events.reservations,true).free;
            newevents.push(...reservationsBDD,...free);
            resetCalendarEvent(newevents);*/
    }
	render()
	{
		  console.log("STATE RENDERING CALENDAR CONTAINER : ");
    	var { events, dispatch} = this.props;
          
		return (
			<div id="calendar-container">
	      		<div id="calendar">
	      		</div>
      		</div>
      		);
	}

}