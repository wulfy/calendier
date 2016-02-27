const defaultState = {};
var moment = require('moment');

export default function CalendarParamsReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_PARAMS':
    case 'GET_PARAMS_4_USER':
      return {...action.res.data} ;
    case 'GET_PARAMS_FAILURE': 
    default:
      return state;
  }
}