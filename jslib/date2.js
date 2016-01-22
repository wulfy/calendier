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

var periodes = new Array(7);
periodes[1]="08:00,12:00,14:30,18:30";
periodes[2]="08:00,12:00,14:30,18:30";
periodes[3]="08:00,12:00,14:30,18:30";
periodes[4]="08:00,12:00,14:30,18:30";
periodes[5]="08:00,12:00,14:30,18:30";
periodes[6]="08:00,12:00";


var duree_reservee = 15;
var reservations = new Array();

var format = "DD/MM/YYYY HH:mm:ss";




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

console.log("start");
console.log(moment(1453105800* 1000));

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
  var durees = periodejour.split(",");
  return (durees.length % 2 == 0)? durees : -1;
}

function getNbCreneaux(endDate,startDate,dureeCreneau){
  return (endDate-startDate) / (dureeCreneau*60*1000);
}


function getCreauxLibresHelper(dateDay,reservationforday){
  console.log("getCreauxLibresHelper");
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
          currentStartDuree = moment(durees[i],"HH:mm");
          currentEndDuree = moment(durees[i+1],"HH:mm");

         dateStart.hours(currentStartDuree.hour()).minute(currentStartDuree.minute());
         dateEnd.hour(currentEndDuree.hour()).minute(currentEndDuree.minute());
         libres = getFreeTimeForDuration(dateStart,dateEnd,reservationforday,duree_reservee);
         frees.push(...libres);
         total += libres.length;
         console.log(frees.length);
        creneauxLibresListe.push({title:durees[i] +"-"+durees[i+1], frees:libres,start:dateStart.clone(),end:dateEnd.clone()});
    }
  }

  return {total:total,libresliste:creneauxLibresListe, free:frees};
}

function getMounthFreeCrenaux(searchedMonth){
  var startDate = getFirstDayMomentForMonth(searchedMonth);
  var monthFree = new Array();
  var currentFree = null;
  var watchDog = 0;
console.log(startDate.month());
  while(startDate.month()+1 == searchedMonth && watchDog <=32)
  {
    console.log("in");
    if(startDate.date() != 5)
    {
        currentFree=getCreauxLibresHelper(startDate,reservationsBDD);

        for(var libres of currentFree.libresliste)
        {
          if(libres.frees.length < 1)
            free.push({title:"FULL " ,start: libres.start,end: libres.end,color:'red',free:false});
          else
            free.push({title:"free "+libres.frees.length ,start: libres.start,end: libres.end,color:'#01DF3A',free:true});
        }
    }
        startDate.add(1,"d");
        watchDog++;

  }
}


function getFreeTimeForDuration(startDate,endDate,dayreservations,duree){
  console.log("getFreeTimeForDuration");
    var index_reservation = 0;
    var nbCreneaux = getNbCreneaux(endDate,startDate,duree);
    var starttestDate = startDate.clone();
    var endtestDate = startDate.clone();
    endtestDate.add(duree,"m");//permet de connaitre la fin du créneau testé, ne pas confondre avec endDate qui correspond à la fin de période
    var reservation_available = true;
    var free = new Array();
    var startReservations = 0;
    var endReservation = 0;
    var current_reservation = 0;
    

    for(var resa of dayreservations)
    {
      if(resa.end >= starttestDate && resa.start.date()<=endtestDate.date())
        break;

      index_reservation ++;
    }
    if(index_reservation>dayreservations.length-1)
      reservation_available = false;
    else
    {
      current_reservation = dayreservations[index_reservation];
      startReservations = current_reservation.start;
      endReservation = current_reservation.end;
    }
    

    for(j=0;j<nbCreneaux;j++)
    { 

      //permet de véifier s'il y a une réservation après, si oui la prépare pour une nouvelle boucle
      //suppose que les réservations sont fournies dans l'ordre chronologique
      if(endReservation <= starttestDate && reservation_available){
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
      

      //si le créneau testé se termine avant le début de la prochaine réservation ou que l'on a plus de réservation : dispo
      if(endtestDate <= startReservations || !reservation_available){
        free.push({title:"free" ,start: starttestDate.clone(),end: endtestDate.clone(),duree:duree,color:'#01DF3A',free:true});
        //console.log(moment(starttestDate).format(format) + " disponible");
      }
      
        
       starttestDate.add(duree,"m");
       endtestDate.add(duree,"m");
    }
    return free;
}
 
var free = null;


function book(form){
  console.log("date from form" + form.start.value);
  var booking = {title:form.title.value ,start: new Date(form.start.value),end:new Date(form.end.value),duree:15,color:'red'};
  $('#calendar').fullCalendar( 'renderEvent', booking, true);
}

free = getCreauxLibresHelper(moment('01/05/2016',"MM/DD/YYYY"),reservationsBDD).free;
getMounthFreeCrenaux(1);
//var test = getReservationByMonthDays(reservations[2],1);
//console.log(test);

