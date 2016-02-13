import React from 'react';

export default class FormView extends React.Component {

  handleInputChange = (e) => {
    var id = e.target.id;
    this.setState({id: e.target.value});
  }
  handleBook = (e) => {
    e.preventDefault();
    console.log("handlebook");
    var data = {dateStart:e.target.dateStart.value,dateEnd:e.target.dateEnd.value,title:e.target.title.value,userid:e.target.userid.value};
    this.props.postBooking(data,this.props.getEvents,{userId:this.props.userId});
    
  }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store

		return (
           <form id="event-form" onSubmit={this.handleBook}>
              Titre : <input id="title" name="title" type="text" required/>
              <br/><input id="dateStart" name="start" type="hidden" />
              <input id="dateEnd" name="end" type="hidden" />
              <input id="userid" name="userid" type="hidden" value={this.props.userId}/>
              <button id="cancel" type="cancel"><i className="fa fa-calendar-times-o">Annuler</i></button>
              <button id="reserver" type="submit"><i className="fa fa-calendar-check-o">Reserver</i></button>
              <div>{this.props.message}</div>
            </form>
      		);
	}

}