var moment = require('moment');

const DEBUG_MODE = false;

export function mylog(text){
    if(DEBUG_MODE)
      console.log(text);
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
