const defaultState = {};
var moment = require('moment');

export default function CreateAccountReducer(state = defaultState, action) {
  switch(action.type) {
    case 'POST_CREATE_ACCOUNT':
      return {data:action.res.data, error:false} ;
    case 'POST_CREATE_ACCOUNT_FAILURE':
      return {data:action.error.data, error:action.error.statusText} ;
    default:
      return state;
  }
}