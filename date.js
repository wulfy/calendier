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
periode[0]="8:00,12:00,14:30,18:30";
periode[1]="8:00,12:00,14:30,18:30";
periode[2]="8:00,12:00,14:30,18:30";
periode[6]="8:00,12:30";

var duree_reservee = 15;
var reservations = new Array();
var premiereReservation = new Date('01/12/2016 9:45:00');
var secondeReservation = new Date('01/12/2016 14:30:00');

reservations[2] = new Array();
reservations[2][0] =  premiereReservation.getTime();
reservations[2][1] = secondeReservation.getTime();


function getDuree(periodejour){
  var durees = periodejour.split(",");
  return (durees.length % 2 == 0)? durees : -1;
}

function getNextAvailable(date){
  var jour = date.getDay();
  var durees = getDuree(periode[jour]);
  console.log(durees);
  var jour_reservations = reservations[jour];
  var currentDate = date;
  console.log(jour_reservations);
  for(i=0; i<durees.length-1; i=i+2)
  {
    var hours = durees[i].split(":");
    var hoursEnd = durees[i+1].split(":");
    console.log(hours[0] + ':' + hours[1] + '-' + hoursEnd);
    console.log(currentDate.setHours(hours[0],hours[1]));
    var startDate = currentDate.setHours(hours[0],hours[1]);
    var endDate = currentDate.setHours(hoursEnd[0],hoursEnd[1]);
    var startReservations = reservations[jour];
    
    var nbCreneaux = (endDate-startDate) / (duree_reservee*60*1000);
    var testDate = startDate;
    console.log(nbCreneaux);

    for(j=0;j<=nbCreneaux;j++)
    { 
    
      console.log(new Date(testDate) + " testing");
      console.log(jour_reservations + " = " + testDate);
      console.log(jour_reservations.indexOf(testDate));
      if(jour_reservations.indexOf(testDate)<0)
        console.log(new Date(testDate) + " disponible");
        
       testDate = testDate + duree_reservee*60*1000;
    }
    
  }
  
  
}

getNextAvailable(new Date('01/12/2016'));
