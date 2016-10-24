import request from 'axios';
var parameters = require('lib/parameters');

//const BACKEND_GET_URL = "http://localhost/calendrier_api/web/app_dev.php/reservations/user/";
const BACKEND_CALENDAR_PARAMS_URL = parameters.API_SERVER+"/params/user";


export function getParams(params)
{
  return {
    type: 'GET_PARAMS',
    promise: request.get(BACKEND_CALENDAR_PARAMS_URL+'/'+params.userId),
    date: Date.now()
  }
}

export function getParamsForConnectedUser()
{
	var config = {withCredentials:true};
  return {
    type: 'GET_PARAMS_4_USER',
    promise: request.get(BACKEND_CALENDAR_PARAMS_URL,config),
    date: Date.now()
  }
}


export function updateParams(data)
{
  var config = {withCredentials:true};
  return {
    type: 'PUT_PARAMS',
    promise: request.put(BACKEND_CALENDAR_PARAMS_URL,data,config),
    date: Date.now()
  }
}