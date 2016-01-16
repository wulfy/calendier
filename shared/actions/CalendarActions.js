import request from 'axios';


export function getEvents()
{
  return {
    type: 'GET_EVENTS',
    promise: request.get("url"),
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
