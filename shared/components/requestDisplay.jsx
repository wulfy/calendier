import React from 'react';
import { connect }            from 'react-redux';

@connect(state => ({ requestDisplay: state.requestDisplay}))
export default class RequestDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showText: true};
  }

  componentWillMount = () => {
    
  }

  resetMessage = () => {
   
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    var {requestId} = this.props;
    var {requestDisplay} = nextProps

    return (requestDisplay.type.indexOf(requestId) > -1);
  }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
      
      var {requestDisplay,requestId} = this.props;

      var messageClass = {"request":"","success":"label label-success","error":"label label-danger"}
      var message = "";

      if(requestDisplay.type.indexOf(requestId) > -1)
      if(requestDisplay.status)
      {
        console.log("RENDER RequestDisplay "+requestDisplay.status);
        console.log(requestDisplay);
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
          //setTimeout(()=>{this.resetMessage();},5000);
        } 
      }

      console.log("RENDER RequestDisplay message" + message);
      var view = <div id="requestDisplayView" className ={classname} > {message} </div> ;
		return (
           <div id="requestDisplayComponent">
              {view}
           </div>
      		);
	}

}