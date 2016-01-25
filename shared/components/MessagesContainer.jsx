import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

@connect(state => ({ messages: state.messages}))
export default class MessagesContainer extends React.Component {

	render()
	{
		  console.log("STATE RENDERING MESSAGE CONTAINER : ");
    	var { messages, dateEnd} = this.props;
    	
      
      var messagestring = "";
      var errorStyle = {
          color: 'red',
        };
      var okStyle = {
          color: 'green',
        };

        console.log(messages);
      if(Object.keys(messages).length >0)
      {
        //document.getElementById("messages-container").style.display = null;
        if(messages.display == "OK")
          messagestring = <span style={okStyle}> {messages.data} </span>;
        else if(messages.display == "error")
          messagestring = <span style={errorStyle}> {messages.data} </span>;
      }
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
		return (
      		<div id="messages-container">
           {messagestring}
      		</div>
      		);
	}

}