import React from 'react';
import { connect }            from 'react-redux';

@connect(state => ({ requestDisplay: state.requestDisplay}))
export default class RequestDisplay extends React.Component {

  componentWillMount = () => {
    
  }

  resetMessage = () => {
    
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
        else{

          if(requestDisplay.status == "error")
            message = "Error : ";
          else
            message = '';

          if(typeof requestDisplay.message.message === "string")
            message += requestDisplay.message.message;
          else
            message += "server return an unexpected message" ;

          setTimeout(function(){document.getElementById("requestDisplayView").className = "hide";},5000);
        } 
      }


      var view = <div id="requestDisplayView" className ={classname} > {message} </div> ;
		return (
           <div id="requestDisplayComponent">
              {view}
           </div>
      		);
	}

}