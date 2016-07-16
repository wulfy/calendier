var moment = require('moment');

const DEBUG_MODE = false;

export function mylog(text){
    if(DEBUG_MODE)
      console.log(text);
  }

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

export function convertDataToCalendarEvents(reservations)
{
      var convertedReservations = reservations;

      if(reservations)
      for(var i=0;i<reservations.length;i++)
      {
        convertedReservations[i].start = myMoment(reservations[i].start);
        convertedReservations[i].end = myMoment(reservations[i].end);
      }

      return convertedReservations;
}

export function myMoment(data,format)
  {
    return moment(data,format).utcOffset('+0200');
  }

export function isClickableDate(date,offDays)
  {
    var today = new moment();
    today.hour(0).seconds(0);
    return !(date < today || offDays.indexOf(date.day())>=0 );
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
