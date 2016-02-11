const defaultState = {};
var moment = require('moment');

export default function CalendarParamsReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_PARAMS':
      return {...action.res.data} ;
    case 'GET_PARAMS_FAILURE': 
    default:
      return state;
  }
}