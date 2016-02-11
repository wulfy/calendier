const defaultState = {};
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

export default function CalendarReducer(state = defaultState, action) {
  switch(action.type) {
    case 'CONNECT_USER':
      var user = action.res.data;
      var message = "";
      var login = null;
      var roles = null;
      var id=null;
      var className = "success";
      console.log("CONNECT USER");
      if(user.username)
      {
        login = user.username;
        roles = user.roles;
        message="connected";
        id = user.id;
      }
      return {login:login, message:message, className:className, roles:roles, id:id} ;
    case 'CONNECT_USER_FAILURE':
        var message="";
        var className = "error";
        console.log("connect failure");
        console.log(action.error.config.headers.login);
        if(typeof(action.error.config.headers.login) != 'undefined')
          message="Username or password invalid";
      return {login:state.login, message:message, className:className} ;
    case 'DISCONNECT_USER_FAILURE':
      var className = "error";
      var message = "error";

      return {login:state.login, message:message, className:className, roles:state.roles} ;
    case 'DISCONNECT_USER':
      var login = state.login;
      var message = "";
      var className = "info";
      if(action.res.status == 200)
      {
        login = null;
        message = "disconnected";
      }

      return {login:login, message:message, className:null, roles:null} ;
    default:
      return state;
  }
}