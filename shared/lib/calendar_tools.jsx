import {mylog, myMoment}  from 'lib/Utils';
var moment = require('moment');

module.exports = {

   getFirstDayMomentForMonth : function(monthNumber){
    var format = "DD/MM/YYYY HH:mm:ss";
    return moment('01/'+monthNumber+'/2016 01:00:00',format);
  },

   getReservationByMonthDays: function (reservations,searchedMonth){
    var currentDate = this.getFirstDayMomentForMonth(searchedMonth);
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
  },

  getDuree: function(periodejour) {
    var durees = periodejour.split(";");
    return (durees.length % 2 == 0)? durees : -1;
  },

  getNbCreneaux: function (endDate,startDate,dureeCreneau){
    return (endDate-startDate) / (dureeCreneau*60*1000);
  },


  getCreauxLibresHelper: function(dateDay,reservationforday,periodes,duree_reservee,clickable){
    mylog("getCreauxLibresHelper");
    var dayNumber = dateDay.day();
    
    var periode = periodes[dayNumber];
    var frees = new Array();
    var libres = new Array();
    var creneauxLibresListe = new Array();
    var total = 0;

    if(typeof periode != 'undefined')
    {

      var durees = this.getDuree(periode);

      var dateStart = dateDay.clone();
      var dateEnd = dateDay.clone();
      var currentStartDuree = null;
      var currentEndDuree = null;

      
      for(var i=0; i<durees.length-1; i=i+2)
      {
            currentStartDuree = myMoment(durees[i],"HH:mm");
            currentEndDuree = myMoment(durees[i+1],"HH:mm");
            mylog("currentstart");
            mylog(currentStartDuree.clone());
           dateStart.hour(currentStartDuree.hour()).minute(currentStartDuree.minute()).second(0);
           dateEnd.hour(currentEndDuree.hours()).minute(currentEndDuree.minute()).second(0);
           libres = this.getFreeTimeForDuration(dateStart,dateEnd,reservationforday,duree_reservee,clickable);
           frees.push(...libres);
           total += libres.length;
           
          creneauxLibresListe.push({title:durees[i] +"-"+durees[i+1], frees:libres,start:dateStart.clone(),end:dateEnd.clone(),allDay:false});
      }
    }

    return {total:total,libresliste:creneauxLibresListe, free:frees};
  },

  getMounthFreeCrenaux : function (searchedMonth,reservations,periodes,duree_reservee,forcedStartDate){

    var realMonth = (searchedMonth<12)?searchedMonth+1:1;
    var startDate = this.getFirstDayMomentForMonth(realMonth);
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

          currentFree=this.getCreauxLibresHelper(startDate,reservations,periodes,duree_reservee,true);

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
  },


  getFreeTimeForDuration : function (startDate,endDate,dayreservations,duree,clickable) {
    mylog("getFreeTimeForDuration");
      var index_reservation = 0;
      var nbCreneaux = this.getNbCreneaux(endDate,startDate,duree);
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
      for(var j=0;j<nbCreneaux;j++)
      { 
        
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
 
};


