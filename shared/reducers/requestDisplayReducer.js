const defaultState = {status:null,message:"",type:""};

export default function requestDisplayReducer(state = defaultState, action) {

	if(action.type.indexOf("_REQUEST") > -1)
		return {status:"request",message:"",type:action.type} ;
	else if (action.type.indexOf("_FAILURE") > -1)
		return {status:"error",message:action.error.data, type:action.type} ;
	else if(action.res)
		return {status:"success",message:action.res.data, type:action.type} ;
	else
		return state;
  
}