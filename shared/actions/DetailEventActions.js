import request from 'axios';

const BACKEND_GET_DETAILS_URL = "http://localhost/calendrier_api/web/app_dev.php/reservation/details";

export function getDetailForEventId(EventId)
{
	var config = {withCredentials:true};
  return {
    type: 'GET_EVENT_DETAILS',
    promise: request.get(BACKEND_GET_DETAILS_URL+'/'+EventId,config),
    date: Date.now()
  }
}
