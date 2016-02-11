var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 23, 59, 59);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

const DEBUG_MODE = false;
function mylog(text){
    if(DEBUG_MODE)
      console.log(text);
  }


var weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

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


mylog(weekday[firstDay.getDay()]+ " " + firstDay.getUTCDate()+ " " + month[date.getUTCMonth() + 1])
mylog(weekday[lastDay.getDay()] + " " + lastDay.getUTCDate() + " "+ month[date.getUTCMonth() + 1])

var periodes = new Array(7);
/*periodes[1]="08:00;12:00;14:30;18:30";
periodes[2]="08:00;12:00;14:30;18:30";
periodes[3]="08:00;12:00;14:30;18:30";
periodes[4]="08:00;12:00;14:30;18:30";
periodes[5]="08:00;12:00;14:30;18:30";
periodes[6]="08:00;12:00";*/

var offDays = [0];


var duree_reservee = null;//30;
var reservations = new Array();

var format = "DD/MM/YYYY HH:mm:ss";



/**
reservations[2] = new Array();
reservations[2].push({title:"resa1" , start: moment('01/01/2016 8:00:00',format),end:moment('01/01/2016 12:00:00',format),duree:40});
reservations[2].push({title:"resa1" , start: moment('06/01/2016 8:00:00',format),end:moment('07/01/2016 12:00:00',format),duree:40});
reservations[2].push({title:"resa2" ,start: moment('01/01/2016 14:30:00',format),end:moment('01/01/2016 14:45:00',format),duree:15});
reservations[2].push({title:"resa3" ,start: moment('01/01/2016 15:30:00',format),end:moment('01/01/2016 16:00:00',format),duree:30});
reservations[2].push({title:"resa4" ,start: moment('01/01/2016 16:30:00',format),end:moment('01/01/2016 16:45:00',format),duree:15});
reservations[2].push({title:"resa5" ,start: moment('01/01/2016 17:30:00',format),end:moment('01/01/2016 17:35:00',format),duree:5});
reservations[2].push({title:"resa1" , start: moment('05/01/2016 9:00:00',format) , end: moment('05/01/2016 09:40:00',format), duree:40});
reservations[2].push({title:"ruben" ,start: moment('05/01/2016 10:30:00',format),end: moment('05/01/2016 14:45:00',format),duree:30, color:'red'});
reservations[2].push({title:"resa2" ,start: moment('05/01/2016 16:30:00',format),end: moment('05/01/2016 16:45:00',format),duree:15});
reservations[2].push({title:"resa3" ,start: moment('05/01/2016 17:30:00',format),end: moment('05/01/2016 18:00:00',format),duree:30});
reservations[2].push({title:"test ludo" ,start: moment(1453105800* 1000),end: moment(1453107600* 1000),duree:30});
**/

function getFirstDayMomentForMonth(monthNumber){
  return moment('01/'+monthNumber+'/2016 01:00:00',format);
}

function getReservationByMonthDays(reservations,searchedMonth){
  var currentDate = getFirstDayMomentForMonth(searchedMonth);
  var daysReservation = new Array();
  var decalage = 0;
  var watchDog = 0;
  while(currentDate.month()+1 == searchedMonth && watchDog <=32)
  {

    for(var i=0; i<reservations.length; i++)
    {
      if(reservations[i].start.date() ==  currentDate.date() && reservations[i].start.month()==currentDate.month())
      {
        if(!Array.isArray(daysReservation[currentDate.date()]))
            daysReservation[currentDate.date()] = new Array();

        daysReservation[currentDate.date()].push(reservations[i]);
      }else
      {
        decalage = i;
        break;
      }
    }
    currentDate.add(1,"d");
    watchDog++;
  }

  return daysReservation;
}

function getDuree(periodejour){
  var durees = periodejour.split(";");
  return (durees.length % 2 == 0)? durees : -1;
}

function getNbCreneaux(endDate,startDate,dureeCreneau){
  return (endDate-startDate) / (dureeCreneau*60*1000);
}


function getCreauxLibresHelper(dateDay,reservationforday,clickable){
  mylog("getCreauxLibresHelper");
  var dayNumber = dateDay.day();
  
  var periode = periodes[dayNumber];
  var frees = new Array();
  var libres = new Array();
  var creneauxLibresListe = new Array();
  var total = 0;

  if(typeof periode != 'undefined')
  {

    var durees = getDuree(periode);

    var dateStart = dateDay.clone();
    var dateEnd = dateDay.clone();
    var currentStartDuree = null;
    var currentEndDuree = null;

    
    for(i=0; i<durees.length-1; i=i+2)
    {
          currentStartDuree = myMoment(durees[i],"HH:mm");
          currentEndDuree = myMoment(durees[i+1],"HH:mm");
          mylog("currentstart");
          mylog(currentStartDuree.clone());
         dateStart.hour(currentStartDuree.hour()).minute(currentStartDuree.minute()).second(0);
         dateEnd.hour(currentEndDuree.hours()).minute(currentEndDuree.minute()).second(0);

         libres = getFreeTimeForDuration(dateStart,dateEnd,reservationforday,duree_reservee,clickable);
         frees.push(...libres);
         total += libres.length;
         
        creneauxLibresListe.push({title:durees[i] +"-"+durees[i+1], frees:libres,start:dateStart.clone(),end:dateEnd.clone(),allDay:false});
    }
  }

  return {total:total,libresliste:creneauxLibresListe, free:frees};
}

function getMounthFreeCrenaux(searchedMonth,reservations,forcedStartDate){

  var realMonth = (searchedMonth<12)?searchedMonth+1:1;
  var startDate = getFirstDayMomentForMonth(realMonth);
  var monthFree = new Array();
  var currentFree = null;
  var watchDog = 0;
  var freeMonth = new Array();
  var allFree = new Array();
mylog("getMounthFreeCrenaux " + realMonth + " " + searchedMonth);

  if(forcedStartDate)
    if(forcedStartDate.month()==searchedMonth)
      startDate = forcedStartDate

  while(startDate.month()+1 == realMonth && watchDog <=32)
  {
    mylog("in");

        currentFree=getCreauxLibresHelper(startDate,reservations);

        for(var libres of currentFree.libresliste)
        {
          if(libres.frees.length < 1)
            freeMonth.push({title:"FULL " ,start: libres.start,end: libres.end,color:'red',free:false});
          else{
            freeMonth.push({title:"free "+libres.frees.length ,start: libres.start,end: libres.end,color:'#01DF3A',free:true});
            allFree.push(...libres.frees);
          }
        }
    

        startDate.add(1,"d");
        watchDog++;

  }

  return {freeMonth:freeMonth,free:allFree};
}


function getFreeTimeForDuration(startDate,endDate,dayreservations,duree,clickable){
  mylog("getFreeTimeForDuration");
    var index_reservation = 0;
    var nbCreneaux = getNbCreneaux(endDate,startDate,duree);
    var starttestDate = startDate.clone();
    var endtestDate = startDate.clone();
    endtestDate.add(duree,"m");//permet de connaitre la fin du créneau testé, ne pas confondre avec endDate qui correspond à la fin de période
    var reservation_available = true;
    var free = new Array();
    var startReservations = myMoment();
    var endReservation = myMoment();
    var current_reservation = myMoment();
    

    if(dayreservations)
    {
      //on parcourt chaque date de réservation pour rechercher la 1ere réservation qui chevauche l'intervalle choisit
      for(var resa of dayreservations)
      {
        
        //si la réservation traverse l'intervalle  testé, on stoppe la recherche
        if(resa.end.isSameOrAfter(startDate) && resa.start.isSameOrBefore(endDate))
          break;

        index_reservation ++;
      }

      //si on a terminé les réservation , on note qu'il n'y en a plus
      if(index_reservation>dayreservations.length-1)
        reservation_available = false;
      else
      {
        //sinon on récupère des réservations de la journée celle concernée
        current_reservation = dayreservations[index_reservation];
        startReservations = current_reservation.start;
        endReservation = current_reservation.end;
      }
    }else
    {
      reservation_available = false;
    }
    
    //on parcourt tous les créneaux de l'intervalle choisit (1h contient 4 créneaux de 15min par exemple)
    for(j=0;j<nbCreneaux;j++)
    { 
      /*console.log("endtestdate ");
      console.log(endtestDate.clone());
      console.log("startReservations ");
      console.log(startReservations.clone());
      console.log(endtestDate.clone().isSameOrBefore(startReservations.clone()));*/
      //si le créneau testé se termine avant le début de la prochaine réservation ou que l'on a plus de réservation : dispo
      if(endtestDate.isSameOrBefore(startReservations) || !reservation_available){
        free.push({title:"free" ,start: starttestDate.clone(),end: endtestDate.clone(),duree:duree,color:'#01DF3A',clickable:clickable, free:true});
        //mylog(moment(starttestDate).format(format) + " disponible");
      }
      
      starttestDate.add(duree,"m");
       endtestDate.add(duree,"m");

       //vérifier que la réservation en cours est terminée sur ce créneau et qu'il y a des réservations après, 
       //si oui la prépare pour une nouvelle boucle
      //suppose que les réservations sont fournies dans l'ordre chronologique
      if(endReservation.unix() <= starttestDate.unix() && reservation_available){
        index_reservation ++;
        
        //s"il y a encore des réservations on passe a la suivante
        if(index_reservation < dayreservations.length)
        {
            current_reservation = dayreservations[index_reservation];
            startReservations = current_reservation.start;
            endReservation = current_reservation.end;
        }else
        {
          reservation_available = false;
        }
      }


       
    }
    return free;
}
 



function book(form){
  mylog("date from form" + form.start.value);
  var booking = {title:form.title.value ,start: new Date(form.start.value),end:new Date(form.end.value),duree:15,color:'red'};
  calendarObject.fullCalendar( 'renderEvent', booking, true);
}


//var test = getReservationByMonthDays(reservations[2],1);
//mylog(test);

