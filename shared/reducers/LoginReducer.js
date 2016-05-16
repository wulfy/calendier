const defaultState = {className:null};
var moment = require('moment');

function dateToStr(vardate) {
  console.log("transforming" + vardate);
   var yyyy = vardate.getFullYear().toString();
   var mm = (vardate.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = vardate.getDate().toString();
   var ss  = vardate.getSeconds().toString();
   var ii  = vardate.getMinutes().toString();
   var hh  = vardate.getHours().toString();
   return ('' + dd+'/'+mm+'/'+yyyy+' '+hh+':'+ii+':'+ss); // padding
  };

export default function LoginReducer(state = defaultState, action) {
  switch(action.type) {
    case 'CONNECT_USER':
      var user = action.res.data;
      var message = "";
      var login = null;
      var roles = null;
      var id=null;
      var email  = null;
      var className = "label label-success";
      console.log("CONNECT USER");
      if(user.username)
      {
        login = user.username;
        roles = user.roles;
        message="connected";
        id = user.id;
        email = user.email;
      }
      return {login:login, username:login, message:message, className:className, roles:roles, email:email, id:id} ;
    case 'CONNECT_USER_FAILURE':
        var message="";
        var className = "";
        console.log("connect failure");
        console.log(action.error.config.headers.login);
        if(typeof(action.error.config.headers.login) != 'undefined')
        {
          message="Username or password invalid";
          className = "label label-danger";
        }
      return {login:state.login, message:message, className:className} ;
    case 'DISCONNECT_USER_FAILURE':
      var className = "label label-danger";
      var message = "error";

      return {login:state.login, message:message, className:className, roles:state.roles} ;
    case 'EDIT_USER_FAILURE':
      var className = "label label-danger";
      var message = "error";

      return {error:action.error, className:className} ;
    case 'EDIT_USER':
        var message = "Vos données ont bien été modifiées";
        return {...state, message:message} ;
    case 'DISCONNECT_USER':
      var login = state.login;
      var message = "";
      var className = "label label-warning";
      if(action.res.status == 200)
      {
        login = null;
        message = "disconnected";
      }

      return {login:login, message:message, className:className, roles:null} ;
    default:
      return state;
  }
}