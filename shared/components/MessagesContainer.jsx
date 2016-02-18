import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

@connect(state => ({ messages: state.messages}))
export default class MessagesContainer extends React.Component {

  componentWillMount = () => {
    this.setState({messagestring:""});
  }
  hideMessage = () => {
    console.log("hide");
    this.setState({messagestring:""});
  }
  componentWillReceiveProps= (nextProps) => {
    console.log("will receive props");
    var { messages, dateEnd} = nextProps;
    var messagestring = "";
    var errorStyle = {
          color: 'red',
        };
      var okStyle = {
          color: 'green',
        };

    if(Object.keys(messages).length >0)
      {
        //document.getElementById("messages-container").style.display = null;
        if(messages.display == "OK")
          messagestring = <span style={okStyle}> {messages.data} </span>;
        else if(messages.display == "error")
          messagestring = <span style={errorStyle}> {messages.data} </span>;
      

      this.setState({messagestring:messagestring});
      setTimeout(function(){ this.hideMessage(); }.bind(this), 3000);
    }
  }
	render()
	{
		  console.log("STATE RENDERING MESSAGE CONTAINER : ");
      
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
		return (
      		<div id="messages-container">
           {this.state.messagestring}
      		</div>
      		);
	}

}