import request from 'axios';

const BACKEND_URL = "http://localhost/calendrier_api/web/app_dev.php/events";

export function getEvents()
{
  return {
    type: 'GET_EVENTS',
    promise: request.get(BACKEND_URL),
    date: Date.now()
  }
}

/*export function getConfig() {
  return {
    type: 'GET_CONFIG',
    promise: request.get("url"),
    date: Date.now()
  }
}*/
