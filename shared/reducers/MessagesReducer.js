import Immutable from 'immutable';

const defaultState = {data:"",type:{}};

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

export default function messageReducer(state = defaultState, action) {
  console.log(action);
  switch(action.type) {
    case 'BOOK_DATE_COMMAND':
      return {data:action.res.data,type:action.type,display:"OK"} ;
    case 'BOOK_DATE_COMMAND_FAILURE':
    case 'POST_BOOKING_FAILURE':
      return {data:action.error.data, error:action.error.statusText,type:action.type,display:"error"} ;
    case 'BOOK_DATE_COMMAND_REQUEST':
      return {data:action.res.data,type:action.type,display:"OK"} ;
    case 'GET_EVENTS_FAILURE':
      return {data:"Error no data found",type:action.type,display:"error"} ;
    default:
      return state;
  }
}