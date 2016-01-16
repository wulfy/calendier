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

function getCreneauxLibres(startDate,endDate,reservations,duree){
  var creneauxReserves = 0;
  var diffTotaux = endDate.diff(startDate);
 
  
  var dureems = duree *60*1000;

  var creneauxTotaux = diffTotaux/dureems + (diffTotaux%dureems?1:0);
  
  for(var momentdate of reservations)
  {
      comparemomentEnd = moment(momentdate.end.hours() +":" + momentdate.end.minutes(), "HH:mm");
      comparemomentStart = moment(momentdate.start.hours() +":" + momentdate.start.minutes(), "HH:mm");
      
      if(comparemomentStart.isBetween(startDate,endDate))
      {
        var diff = comparemomentEnd.diff(comparemomentStart);
        diff = comparemomentEnd.diff(comparemomentStart);
        creneauxReserves += parseInt(diff/dureems) + (diff%dureems?1:0);
        
      }
  }
  console.log("pouet");
   console.log(creneauxTotaux);
  console.log(creneauxReserves);
  console.log("prout");
    return creneauxTotaux-creneauxReserves;
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
function getAvailabilitiesForDay(date,reservationsForDay){
  free = new Array();
  var jourtotest = date.getDay();
  var durees_ouverture = getDuree(periode[jourtotest]);
  console.log(durees_ouverture);
  var jour_reservations = reservationsForDay;
  var currentDate = date;
  console.log(jour_reservations);
  var index_reservation = 0;
  var reservation_available = true;
  
  for(i=0; i<durees_ouverture.length-1; i=i+2)
  {
    
    
    var hours = durees_ouverture[i].split(":");
    var hoursEnd = durees_ouverture[i+1].split(":");
    console.log(hours[0] + ':' + hours[1] + '-' + hoursEnd);
    console.log(currentDate.setHours(hours[0],hours[1]));
    var startDate = currentDate.setHours(hours[0],hours[1]);
    var endDate = currentDate.setHours(hoursEnd[0],hoursEnd[1]);
    
    
    var nbCreneaux = getNbCreneaux(endDate,startDate,duree_reservee);
    var testDate = startDate;
    var endtestDate = testDate + duree_reservee*60*1000;
    console.log("creneaux " + nbCreneaux);
    console.log("resa " + jour_reservations);
    var current_reservation = jour_reservations[index_reservation];
    //var startReservations = current_reservation.start.getTime();
    //var endReservation = startReservations + current_reservation.duree*60*1000;
    var startReservations = current_reservation.start;
    var endReservation = current_reservation.end;
    for(j=0;j<nbCreneaux;j++)
    { 
    //console.log(new Date(testDate) + " testing");
      //console.log(endReservation + " = " + testDate);
      
      //si la réservation se termine avant le créneau testé
      //on passe à la réservation suivante
      if(endReservation <= testDate){
      //console.log("index : " +index_reservation );
        index_reservation ++;
        
        //s"il y a encore des réservations on passe a la suivante
        if(index_reservation < jour_reservations.length)
        {
            current_reservation = jour_reservations[index_reservation];
            //startReservations = current_reservation.start.getTime();
            startReservations = current_reservation.start;
            //endReservation = startReservations +       current_reservation.duree*60*1000;
            endReservation = current_reservation.end;
        }else
        {
          reservation_available = false;
        }
      }
      
      //si le créneau testé se termine avant le début de la prochaine réservation ou que l'on a plus de réservation : dispo
      if(endtestDate <= startReservations || !reservation_available){
        free.push({title:"free" ,start: moment(testDate),end: moment(testDate).add(duree_reservee,"m"),duree:duree_reservee,color:'#01DF3A',free:true});
        console.log(new Date(testDate) + " disponible");
      }
      
      
      //console.log(jour_reservations.indexOf(testDate));
      //if(jour_reservations.indexOf(testDate)<0)
        //console.log(new Date(testDate) + " disponible");
        
       testDate += duree_reservee*60*1000;
       endtestDate +=duree_reservee*60*1000;
    }
    
  }
  
  
}

function book(form){
  console.log("date from form" + form.start.value);
  var booking = {title:form.title.value ,start: new Date(form.start.value),end:new Date(form.end.value),duree:15,color:'red'};
  $('#calendar').fullCalendar( 'renderEvent', booking, true);
}

free = getCreauxLibresHelper(moment('01/05/2016',"MM/DD/YYYY"),reservations[2]).free;
console.log(free);

