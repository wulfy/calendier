import request from 'axios';
var parameters = require('lib/parameters');

const BACKEND_GET_DETAILS_URL = parameters.API_SERVER+"/reservation/details";

export function getDetailForEventId(EventId)
{
	var config = {withCredentials:true};
  return {
    type: 'GET_EVENT_DETAILS',
    promise: request.get(BACKEND_GET_DETAILS_URL+'/'+EventId,config),
    date: Date.now()
  }
}
