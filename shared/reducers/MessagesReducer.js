import Immutable from 'immutable';

const defaultState = {data:{},type:{}};

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
  switch(action.type) {
    case 'BOOK_DATE_COMMAND':
      return {data:action.res.data,type:action.type} ;
    case 'BOOK_DATE_COMMAND_FAILURE':
      return {data:action.res.data,type:action.type} ;
    case 'BOOK_DATE_COMMAND_REQUEST':
      return {data:action.res.data,type:action.type} ;
    default:
      return state;
  }
}