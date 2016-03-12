const defaultState = {};

export default function DetailsEventReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_EVENT_DETAILS':
      return {data:action.res.data} ;
    default:
      return state;
  }
}