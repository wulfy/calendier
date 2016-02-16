import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';


@connect(state => ({ calendarParams: state.calendarParams}))
export default class CalendarParamsContainer extends React.Component {

    componentDidMount = () =>{
    	//var { events, dispatch} = this.props;
      //updateParams(this.props.calendarParams);
      console.log("didmount params");

  	}
	render()
	{
		  console.log("STATE RENDERING CALENDAR PARAMS CONTAINER : ");
    	var { calendarParams, dispatch} = this.props;
          
		return (
			<div id="calendar-params">
	      		<div id="calendar_search_form"></div>
      		</div>
      		);
	}

}