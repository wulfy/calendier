import React from 'react';
import { connect }            from 'react-redux';
import * as CalendarActions       from 'actions/CalendarActions';

@connect(state => ({ details: state.details.data}))
export default class DetailsEventView extends React.Component {

  componentWillMount = () => {
    this.props.getDetailForEventId(this.props.formData.eventId);
  }
  componentWillReceiveProps= (nextProps) => {
    console.log("will receive props for details");
    console.log(nextProps);
  }
  handleDeleteEvent = () => {
    var {details,dispatch} = this.props;
    if(confirm("Supprimer "+details.title+"?"))
    {
      dispatch(CalendarActions.deleteEvent(details.id));
    }
  }
	render()
	{

    console.log("RENDER DETAILS");
    var {details,formData} = this.props;
    var username,title,deletable,mailto,email = "";
    var login = formData.login;

    if(details)
    {
      username = details.username;
      title = details.title;
      email = details.email;
      mailto = 'mailto:'+email;
      console.log(details);
      console.log(login);
      if(details.idClient == login.id || formData.calendarparams.idUser == login.id)
      {
        deletable = <a href='#' onClick={this.handleDeleteEvent}>"supprimer"</a>;
        mailto = <a href={mailto}> <i className="fa fa-envelope" aria-hidden="true"></i> </a>;
      }

    }
		return (
           <div id="detail_event">
           {title}<br/>
           {username}
           {mailto}
           <hr/>
          {deletable}
           </div>
      		);
	}

}