import request from 'axios';

//const BACKEND_GET_URL = "http://localhost/calendrier_api/web/app_dev.php/reservations/user/";
const BACKEND_GET_USER_URL = "http://localhost/calendrier_api/web/app_dev.php/reservations/user/";
const BACKEND_POST_URL = "http://localhost/calendrier_api/web/app_dev.php/events";

export function getEvents(params)
{
  var config = {withCredentials:true};
  return {
    type: 'GET_EVENTS',
    promise: request.get(BACKEND_GET_USER_URL+params.userId,config),
    date: Date.now()
  }
}

export function getUserEvents()
{
  var config = {withCredentials:true};
  return {
    type: 'GET_EVENTS',
    promise: request.get(BACKEND_GET_USER_URL,config),
    date: Date.now()
  }
}

export function postBooking(formData,callback,params)
{
  var headers = {withCredentials:true};
  console.log("booking");
  console.log(formData);
  return {
    type: 'POST_BOOKING',
    promise: request.post(BACKEND_POST_URL,formData,headers),
    then:callback,
    thenParams:params,
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
