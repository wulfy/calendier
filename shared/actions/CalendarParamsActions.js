import request from 'axios';

//const BACKEND_GET_URL = "http://localhost/calendrier_api/web/app_dev.php/reservations/user/";
const BACKEND_GET_CALENDAR_PARAMS_URL = "http://localhost/calendrier_api/web/app_dev.php/params/user/";


export function getParams(params)
{
  return {
    type: 'GET_PARAMS',
    promise: request.get(BACKEND_GET_CALENDAR_PARAMS_URL+params.userId),
    date: Date.now()
  }
}
