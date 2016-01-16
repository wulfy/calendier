import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

@connect(state => ({ book: state.book}))
export default class FormContainer extends React.Component {

  handleBookDate = (e) => {
    const id = Number(e.target.dataset.id);
    const device = this.props.deviceslist[id];
    var nextstatus = (device.Status == 'Off') ? 'On' : 'Off';

    if (confirm('Are you sure you want to turn : '+nextstatus+'?')) {
        // Equivalent to `dispatch(deleteTodo())`
        this.props.SendCommand(device.HardwareID,nextstatus);
        this.props.getDevicesStatus();
    } else {
        // Do nothing!
    }
    
    
  }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
		return (
      		<div id="form-container">
           <form onsubmit="book(this)">
              Titre : <input id="title" name="title" type="text"/>
              début : <input id="start" name="start" type="text"/>
              fin : <input id="end" name="end" type="text"/>
              duree: <input id="duree" name="duree" type="text"/>
              nb creneaux jour: <input id="dispoDay" type="text"/>
              creneaux : <textarea id="dispodetail"></textarea>
              <input id="id" name="id" type="hidden"/>
              <input type="submit" value="Reserver"/>
              
            </form>
      		</div>
      		);
	}

}