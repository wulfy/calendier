import request from 'axios';

const BACKEND_GET_URL = "http://localhost/calendrier_api/web/app_dev.php/reservations/user/2/client/1";
const BACKEND_POST_URL = "http://localhost/calendrier_api/web/app_dev.php/events";

export function getEvents()
{
  return {
    type: 'GET_EVENTS',
    promise: request.get(BACKEND_GET_URL),
    date: Date.now()
  }
}

export function postBooking(formData)
{
  console.log("booking");
  console.log(formData);
  return {
    type: 'POST_BOOKING',
    promise: request.post(BACKEND_POST_URL,formData),
    date: Date.now()
  }
}

/*
promise: request.post(BACKEND_POST_URL,formData,{headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                    }
                }),
*/
/*export function getConfig() {
  return {
    type: 'GET_CONFIG',
    promise: request.get("url"),
    date: Date.now()
  }
}*/
