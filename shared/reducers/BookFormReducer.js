const defaultState = {};

export default function BookFormReducer(state = defaultState, action) {
  switch(action.type) {
    case 'DISPLAY_FORM':
      return {display:true, ...action} ;
    case 'HIDE_FORM':
      return {display:false, ...action} ;
    default:
      return state;
  }
}