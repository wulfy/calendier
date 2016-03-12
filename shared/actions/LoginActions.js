import request from 'axios';

const BACKEND_GET_CONNECT_URL = "http://localhost/calendrier_api/web/app_dev.php/auth/user/";
const BACKEND_GET_DISCONNECT_URL = "http://localhost/calendrier_api/web/app_dev.php/logout";
const BACKEND_EDIT_USER = "http://localhost/calendrier_api/web/app_dev.php/edit/user";

export function connectUser(data,callback)
{
  console.log("connecting");
  var config = {withCredentials:true};
  if(data)
  {
    config = {
    headers: {'login': data.login,'password': data.password},
    withCredentials:true
    };
  }
  return {
    type: 'CONNECT_USER',
    promise: request.get(BACKEND_GET_CONNECT_URL,config),
    then:callback,
    date: Date.now()
  }
}

export function logoutUser(callback)
{
  console.log("logout");
  var config = {withCredentials:true};
  
  return {
    type: 'DISCONNECT_USER',
    promise: request.get(BACKEND_GET_DISCONNECT_URL,config),
    then:callback,
    date: Date.now()
  }
}

export function updateUser(data)
{
  console.log("edit");
  var config = {withCredentials:true};
  
  return {
    type: 'EDIT_USER',
    promise: request.put(BACKEND_EDIT_USER,data,config),
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
