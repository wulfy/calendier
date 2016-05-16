import React from 'react';

export default class FormView extends React.Component {

  componentWillMount = () => {
    console.log("will mount");
    this.setState({titleValue: this.props.formData.title, message:""});
  }
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
  handleTitleChange = (e) => {
    this.setState({titleValue: e.target.value});
  }
  hideMessage = () => {
    console.log("hide");
    this.setState({message:""});
  }
  componentWillReceiveProps= (nextProps) => {
    console.log("will receive props");
      this.setState({message:nextProps.message});
      setTimeout(function(){ this.hideMessage(); }.bind(this), 3000);
  }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
      console.log("RENDER formview");
      var {formData} = this.props;
		return (
           <form id="event-form" onSubmit={this.handleBook}>
              Titre : <input id="title" name="title" type="text" placeholder="entrez un titre" onChange={this.handleTitleChange} required />
              <br/><input id="dateStart" name="start" type="hidden" value={formData.start}/>
              <input id="dateEnd" name="end" type="hidden" value={formData.end} />
              <input id="userid" name="userid" type="hidden" value={this.props.userId}/>
              <input id="eventid" name="eventid" type="hidden" value={formData.id}/>
              <div className="modal-footer">
                <button id="cancel" type="cancel" className="btn btn-lg btn-default" onClick={this.props.handleCloseForm}><i className="fa fa-calendar-times-o">Annuler</i></button>
                <button id="reserver" type="submit" className="btn btn-lg btn-success"><i className="fa fa-calendar-check-o">Reserver</i></button>
                <div>{this.state.message}</div>
              </div>
            </form>
      		);
	}

}