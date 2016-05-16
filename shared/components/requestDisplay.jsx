import React from 'react';
import { connect }            from 'react-redux';

@connect(state => ({ requestDisplay: state.requestDisplay}))
export default class RequestDisplay extends React.Component {

  componentWillMount = () => {
    
  }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
      console.log("RENDER RequestDisplay");
      var {requestDisplay,requestId} = this.props;

      var messageClass = {"request":"","success":"label label-success","error":"label label-danger"}
      var message = "";
      if(requestDisplay.type.indexOf(requestId) > -1)
      if(requestDisplay.status)
      {
        var classname = messageClass[requestDisplay.status];
     
        if(requestDisplay.status == "request")
          message = <img className="waitingimg" src="http://i.stack.imgur.com/MnyxU.gif"/>;
        else if(typeof requestDisplay.message.message === "string")
          message = "error : " + requestDisplay.message.message;
        else
          message = "error : server return an unexpected error" ;
      }


      var view = <div id="requestDisplayView" className ={classname} > {message} </div> ;
		return (
           <div id="requestDisplayComponent">
              {view}
           </div>
      		);
	}

}