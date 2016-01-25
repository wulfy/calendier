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
    case 'GET_EVENTS':
      var events = action.res.data;
      console.log(events);
      var reservations = new Array();
          for(var i in events)
          {
            reservations.push({title:events[i].title , start: moment(events[i].dateStart.timestamp *1000),end:moment(events[i].dateEnd.timestamp *1000),duree:events[i].duree, idClient:events[i].idClient})
          }
      return {reservations:reservations,...state} ;
    case 'POST_BOOKING': 
      return {message:action.res.data,...state} ;
    default:
      return state;
  }
}