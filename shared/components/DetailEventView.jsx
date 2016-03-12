import React from 'react';
import { connect }            from 'react-redux';

@connect(state => ({ details: state.details.data}))
export default class DetailsEventView extends React.Component {

  componentWillMount = () => {
    this.props.getDetailForEventId(this.props.eventId);
  }
  componentWillReceiveProps= (nextProps) => {
    console.log("will receive props for details");
    console.log(nextProps);
  }
	render()
	{

    console.log("RENDER DETAILS");
    var {details} = this.props;
    var username,title = "";

    if(details)
    {
      username = details.username;
      title = details.title;
    }
		return (
           <div id="detail_event">
           {title}<br/>
           {username}
           </div>
      		);
	}

}