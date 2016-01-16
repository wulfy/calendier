import Immutable from 'immutable';

const defaultState = {};

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

function timestampToStr(timestamp){
  return dateToStr(new Date(timestamp*1000)) ;
}

export default function bookReducer(state = defaultState, action) {
  switch(action.type) {
    case 'BOOK_DATE_COMMAND':
      return action.res.data;
    default:
      return state;
  }
}

