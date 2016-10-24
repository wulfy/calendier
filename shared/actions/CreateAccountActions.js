import request from 'axios';
var parameters = require('lib/parameters');

const BACKEND_POST_URL = parameters.API_SERVER+"/users";


export function createUser(formData,callback,callbackparams)
{
  console.log("create account");
  if(formData)
  {
    //var headers = {withCredentials:true};
    console.log("create account");
    console.log(formData);
  
  }
  return {
    type: 'POST_CREATE_ACCOUNT',
    promise: request.post(BACKEND_POST_URL,formData),
    then:callback,
    thenParams:callbackparams,
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
