var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 23, 59, 59);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

var weekday = new Array(7);
weekday[0]=  "Dimanche";
weekday[1] = "Lundi";
weekday[2] = "Mardi";
weekday[3] = "Mercredi";
weekday[4] = "Jeudi";
weekday[5] = "Vendredi";
weekday[6] = "Samedi";

var month = new Array(12);
month[1] = "Janvier";
month[2] = "Fevrier";
month[3] = "Mars";
month[4] = "Avril";
month[5] = "Mai";
month[6] = "Juin";
month[7]=  "Juillet";
month[8] = "Aout";
month[9] = "Septembre";
month[10] = "Octobre";
month[11] = "Novembre";
month[12] = "Decembre";


console.log(weekday[firstDay.getDay()]+ " " + firstDay.getUTCDate()+ " " + month[date.getUTCMonth() + 1])
console.log(weekday[lastDay.getDay()] + " " + lastDay.getUTCDate() + " "+ month[date.getUTCMonth() + 1])

var periode = new Array(7);
periode[0]="08:00,12:00,14:30,18:30";
periode[1]="08:00,12:00,14:30,18:30";
periode[2]="08:00,12:00,14:30,18:30";
periode[6]="08:00,12:30";


var duree_reservee = 15;
var reservations = new Array();
var format = "MM/DD/YYYY HH:mm:ss";


reservations[2] = new Array();
/*reservations[2].push({title:"resa1" , start: new Date('01/12/2016 9:45:00'),end:new Date('01/12/2016 10:25:00'),duree:40});
reservations[2].push({title:"resa2" ,start: new Date('01/12/2016 14:30:00'),end:new Date('01/12/2016 14:45:00'),duree:15});
reservations[2].push({title:"resa3" ,start: new Date('01/12/2016 15:30:00'),end:new Date('01/12/2016 16:00:00'),duree:30});
reservations[2].push({title:"resa4" ,start: new Date('01/12/2016 16:30:00'),end:new Date('01/12/2016 16:45:00'),duree:15});
reservations[2].push({title:"resa5" ,start: new Date('01/12/2016 17:30:00'),end:new Date('01/12/2016 17:35:00'),duree:5});*/
reservations[2].push({title:"resa1" , start: moment('01/05/2016 9:00:00',format) , end: moment('01/05/2016 09:40:00',format), duree:40});
reservations[2].push({title:"ruben" ,start: moment('01/05/2016 10:30:00',format),end: moment('01/05/2016 11:00:00',format),duree:30, color:'red'});
reservations[2].push({title:"resa2" ,start: moment('01/05/2016 16:30:00',format),end: moment('01/05/2016 16:45:00',format),duree:15});
reservations[2].push({title:"resa3" ,start: moment('01/05/2016 17:30:00',format),end: moment('01/05/2016 18:00:00',format),duree:30});



function getDuree(periodejour){
  var durees = periodejour.split(",");
  return (durees.length % 2 == 0)? durees : -1;
}

function getNbCreneaux(endDate,startDate,dureeCreneau){
  return (endDate-startDate) / (dureeCreneau*60*1000);
}


function getCreauxLibresHelper(dateDay,reservationforday){
  var dayNumber = dateDay.day();
  var durees = getDuree(periode[dayNumber]);
  var frees = libres = new Array();
  var creneauxLibresListe = new Array();
  var total = 0;
  var dateStart = dateDay.clone();
  var dateEnd = dateDay.clone();
  for(i=0; i<durees.length-1; i=i+2)
  {

       dateStart.hour(moment(durees[i],"HH:mm").hour()).minute(moment(durees[i],"HH:mm").minute());
       dateEnd.hour(moment(durees[i+1],"HH:mm").hour()).minute(moment(durees[i+1],"HH:mm").minute());
       console.log(dateStart);
       console.log("end start");
       libres = getFreeTimeForDuration(dateStart,dateEnd,reservations[2],duree_reservee);
       frees.push(...libres);
       total += frees.length;
      creneauxLibresListe[durees[i] +"-"+durees[i+1]] = frees.length;
  }

  return {total:total,libresliste:creneauxLibresListe, free:frees};
}

function getMounthFreeCrenaux(searchedMonth){
  var startDate = moment('01/05/2016 17:30:00',format);
}


function getFreeTimeForDuration(startDate,endDate,reservations,duree){
    var index_reservation = 0;
    var nbCreneaux = getNbCreneaux(endDate,startDate,duree);
    var testDate = startDate;
    var endtestDate = testDate + duree*60*1000;
    var current_reservation = reservations[index_reservation];
    var startReservations = current_reservation.start;
    var endReservation = current_reservation.end;
    var reservation_available = true;
    var free = new Array();

    for(j=0;j<nbCreneaux;j++)
    { 
      if(endReservation <= testDate){
        index_reservation ++;
        
        //s"il y a encore des réservations on passe a la suivante
        if(index_reservation < reservations.length)
        {
            current_reservation = reservations[index_reservation];
            startReservations = current_reservation.start;
            endReservation = current_reservation.end;
        }else
        {
          reservation_available = false;
        }
      }
      
      //si le créneau testé se termine avant le début de la prochaine réservation ou que l'on a plus de réservation : dispo
      if(endtestDate <= startReservations || !reservation_available){
        free.push({title:"free" ,start: moment(testDate),end: moment(testDate).add(duree,"m"),duree:duree,color:'#01DF3A',free:true});
        console.log(moment(testDate).format(format) + " disponible");
      }
      
        
       testDate += duree*60*1000;
       endtestDate +=duree*60*1000;
    }
    return free;
}
 
var free = null;


function book(form){
  console.log("date from form" + form.start.value);
  var booking = {title:form.title.value ,start: new Date(form.start.value),end:new Date(form.end.value),duree:15,color:'red'};
  $('#calendar').fullCalendar( 'renderEvent', booking, true);
}

free = getCreauxLibresHelper(moment('01/05/2016',"MM/DD/YYYY"),reservations[2]).free;
console.log(free);

