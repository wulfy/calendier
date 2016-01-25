import React from 'react';

export default class FormView extends React.Component {

  handleInputChange = (e) => {
    var id = e.target.id;
    this.setState({id: e.target.value});
  }
  handleBook = (e) => {
    e.preventDefault();
    console.log("handlebook");
    var data = {dateStart:e.target.dateStart.value,dateEnd:e.target.dateEnd.value,title:e.target.title.value};
    this.props.postBooking(data);
    console.log("after");

  }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store

		return (
           <form id="form-container" onSubmit={this.handleBook}>
              Titre : <input id="title" name="title" type="text" />
              début : <input id="dateStart" name="start" type="text" />
              fin : <input id="dateEnd" name="end" type="text" />
              duree: <input id="duree" name="duree" type="text"/>
              nb creneaux jour: <input id="dispoDay" type="text"/>
              creneaux : <textarea id="dispodetail"></textarea>
              <input id="id" name="id" type="hidden"/>
              <input type="submit" value="Reserver"/>
              
            </form>
      		);
	}

}