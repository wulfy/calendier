	var calendarObject = $('#calendar');
	var previousEvent = null;
	var previousDay = null;
	var previouscolor = '';
	var reservationsBDD = [];
	var user = null;
	var selectedDay = null;
	var free = null;
	mylog("init");

	function myMoment(data,format)
	{
		return moment(data,format).utcOffset('+0100');
	}

	/*function convertDataToCalendarEvents(reservations)
	{
			var convertedReservations = reservations;

			if(reservations)
			for(i=0;i<reservations.length;i++)
			{
				convertedReservations[i].start = myMoment(reservations[i].start);
				convertedReservations[i].end = myMoment(reservations[i].end);
			}

			return convertedReservations;
	}*/
                  
	/*function resetCalendarEvents(newEvents){
		if(typeof calendarObject != "undefined")
		{
			mylog("reset calendar");
			mylog(newEvents);
			calendarObject.fullCalendar('removeEvents');
			calendarObject.fullCalendar('addEventSource',newEvents);
		}
	}*/
	
	/*function refreshView(view){
		mylog("refreshView");
		
		var events = new Array();
		var today = new moment().utcOffset('+0100');
		var currentReservations = getReservationsBDD();//calendarObject.fullCalendar( 'clientEvents',getReservationsFilter);
		mylog(currentReservations);
		switch(view.name)
		{
			case "month" :
				    		//calendarObject.fullCalendar('removeEvents');
				    		//freeMonth = getMounthFreeCrenaux(view.intervalStart.month(),currentReservations);
				    		hideResSearchForm();
				    		freeData = getMounthFreeCrenaux(view.intervalStart.month(),currentReservations,today);
				    		freeMonth = freeData.freeMonth;
				    		free = freeData.free;
				    		var mine = getMine(currentReservations);//calendarObject.fullCalendar( 'clientEvents',getMineFilter);
				    		events.push(...freeMonth,...mine);
				    		resetCalendarEvents(events);
				    		//calendarObject.fullCalendar('addEventSource',events);
				    		break;
			case "agendaDay" :

			    			previousDay = $(this);
				    		var free = getCreauxLibresHelper(myMoment(view.intervalStart),currentReservations,true).free;
				    		mylog("agenda");
				    		mylog(currentReservations);
				    		events.push(...currentReservations,...free);
				    		resetCalendarEvents(events);
				    		break;
		}
		
	}

	/*********** REACT CONNECTORS ***************/
	/*function updateReservations(reservationsFromReact){
		mylog("update reservations");
		reservationsBDD = convertDataToCalendarEvents(reservationsFromReact);
		refreshView(calendarObject.fullCalendar( 'getView'));
	}*/
	function updateParams(paramsFromReact){
		if(paramsFromReact)
		{
			duree_reservee = paramsFromReact.duree;

			for(var i=0; i<paramsFromReact.bookablePeriods.length;i++)
			{
				if(paramsFromReact.bookablePeriods[i].length > 1)
					periodes[i] = paramsFromReact.bookablePeriods[i];
			}
		}
	}
/*
	function getReservationsBDD(){
		if(reservationsBDD)
			return reservationsBDD;
		else
			return new Array();
	}

	function setCurrentUser(userFromReact){
		user = userFromReact;
	}
	/******************************************/

	/*function getMine(reservations){
		var mine = new Array();
		mylog("user");
		mylog(user);
		if(user)
			if(user.roles)
				if(user.roles[0] == "ROLE_USER")
					mine = reservations;
				else{
					reservations.forEach((element,index)=>{
						mylog(element);
						if(element.idClient == user.id)
							mine.push(element);
					});
				}
			
		return mine;
	}


	/******* FULL CALENDAR FILTERS ****/
	function getMineFilter(eventObject){
		var mine = new Array();

		if(user)
			if(eventObject.idClient == user.id)
				return true;

		return false;

	}
	function getReservationsFilter(eventObject){
		if(!eventObject.free)
			return true;
		else
			return false;
	}

	function isClickableDate(date,offDays)
	{
		var today = new moment();
		today.hour(0).seconds(0);
		return !(date < today || offDays.indexOf(date.day())>=0 );
	}
 /***********************************************/

 /****** SEARCH FORM TOOLS *********************/
	function findFirstDate(frees,creneau,preferedDay){
		var reservationsForWantedDay = new Array();
		var propositions = new Array();
		var lastDay = null;
		var isWantedDay = true;
		for(var free of frees)
		{

			creneau.start.date(free.start.date());
			creneau.end.date(free.end.date());
			isWantedDay = (preferedDay?free.start.day()==preferedDay:true); 
			mylog(preferedDay);
			mylog(isWantedDay);
			if(free.start >= creneau.start && free.end <= creneau.end && free.start.date() != lastDay && isWantedDay){
				lastDay = free.start.date();
				propositions.push(free);
			}
				
		}

		return propositions;
	}

	function buildSelect(name,min,max,step,form,values)
	{
		var htmlOptions = "";
		var selectHtml = "";
		var value = 0;
		var currentMin = min;
		var currentMax = max;

		if(values)
		{
			currentMin = 0;
			currentMax = values.length -1;
		}
		htmlOptions +='<option value=""> - </option>';
		for(var i=currentMin;i<=currentMax;i=i+step)
		{
				value =  (values?values[i]:((i<10)?"0":"")+i);
				htmlOptions +='<option value="'+i+'">'+value+'</option>';
		}	

		selectHtml = "<select name='"+name+"' form='"+form+"' >"+htmlOptions+"</select>";
		return selectHtml;
	}

	function gotoDay(strDate)
	{
		var date = new myMoment(strDate,"DD-MM");
		mylog(date);
		calendarObject.fullCalendar( 'gotoDate', date );
		calendarObject.fullCalendar( 'changeView', 'agendaDay' );
	}

	function displaySearchResult(data,displayTime)
	{
		var searchResultObj = $("#res");
		searchResultObj.show();
		searchResultObj.addClass("animate");
		searchResultObj.html(data);

		if(Number.isInteger(displayTime))
		{
			 setTimeout(function(){ searchResultObj.removeClass("animate");  }, displayTime*1000); 
		}
	}

	function handleSearchForm(e)
	{
		e.preventDefault();
		
		var res = "";
		var displayTime = null;
		if(e.target.fromHour.value && e.target.fromMin.value && 
		   e.target.toHour.value && e.target.toMin.value)
		{
			var start = e.target.fromHour.value+":"+e.target.fromMin.value;
			var end = e.target.toHour.value+":"+e.target.toMin.value;
			var creneau = {start:myMoment(start,"HH:mm"),end:myMoment(end,"HH:mm")};
			var day = e.target.day.value;
			free = getMounthFreeCrenaux(creneau.start.month(),getReservationsBDD()).free;
			var days = findFirstDate(free,creneau,day);
			var currentMonth = calendarObject.fullCalendar( 'getView' ).intervalStart.month();
			for(var currentday of days)
				res += "<a class='search_result' href='#' onClick='gotoDay("+currentday.start.date()+")'>"+weekday[currentday.start.day()]+" " +
						currentday.start.date()+"/"+(currentMonth+1)+"</a> &nbsp;&nbsp;" ;

			if(days.length <1)
			{
				res = "Aucun creneau trouvé. Essayez avec une période différente";
				displayTime = 5;
			}
		}else
		{
			mylog(e.target.toHour.value);
			 res = "Veuillez sélectionner une heure de début et de fin";
			 displayTime = 5;
		}
		displaySearchResult(res,displayTime);
		
	}

	function displayConnectForm()
  {
      $("#login-form").show();
      $("#notConnected").hide();
  }

  function displaySearchForm(){
  	
  	$("#displaySearchButton").addClass("rollRight");
  	$("#formContainer").show();
  	$("#formContainer").addClass("appear");
  }
  function hideResSearchForm(){
  		$("#res").removeClass("animate");
  		$("#res").hide();
  }

  function hideSearchForm(e){
  	e.preventDefault();
  	$("#displaySearchButton").removeClass("rollRight");
  	$("#formContainer").removeClass("appear");
  	$("#formContainer").hide();
  	hideResSearchForm();
  	
  }

/****************************************/
/** TOOLS FOR CALENDAR
******************************************/
  /*function toggleSelectCreneau(element){
  	
  	if(selectedDay)
  	{
		selectedDay.css('background-color', previouscolor);
		selectedDay.children('.text').hide();
		previouscolor = null;
	}
    
    if(element)
    {
    	previouscolor = element.css('background-color');
  		element.css('background-color', 'red');
    	element.children('.text').show();
    	selectedDay = element;
	}
  }
	/*********/

		$(document).ready(function() {

			
			var selectFrom = buildSelect("fromHour",0,24,1,"search_form") +" : "+buildSelect("fromMin",0,59,duree_reservee,"search_form");
			var selectTo = buildSelect("toHour",0,24,1,"search_form") +" : "+buildSelect("toMin",0,59,duree_reservee,"search_form");
			var selectDay = buildSelect("day",0,0,1,"search_form",weekday);
			var form = "<div id='searchFormContainer'>"+
			"<div id='displaySearchButton'> <button onClick='displaySearchForm()' ><i class='fa fa-search'></i> Rechercher un creneau selon une date</button></div>"+
            "<div id='formContainer'><form onsubmit='handleSearchForm(event);' id='search_form'>"+
              "<div class='col time'> <i class='fa fa-clock-o'></i> Heure début* " + selectFrom + " </div>"+ 
              "<div class='col time'><i class='fa fa-clock-o'></i> Heure fin* " +selectTo + " </div>"+
              "<div class='col day'> Jour <span>(optionnel)</span>"+selectDay+ "</div>"+
              "<button type='submit'><i class='fa fa-search'></i> Rechercher</button>"+
              "<button id='cancelSearch' onClick='hideSearchForm(event)'><i class='fa fa-times'></i> Cancel</button>"+
              "</form></div>"+
              "</div>";
              
			$("#calendar_search_form").html(form + "<br/><div id='res' class='message'>RES</div>");

			$("#close-form").click(()=>{
				$("#form-container").hide()
					}
				);

	
    		/*$("#notConnected").hover(function(){
    			$(this).html('<a href="#" onClick="displayConnectForm()"><i className="fa fa-link"></i>Se connecter</a>');
    		});*/
  



		    /**reservations[2].push(...mine);
		    mylog(reservations[2]);**/
		    mylog("generating calendar");
		    //mylog(events);
		   /* calendarObject.fullCalendar({
		    	header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaDay'
				},
    			slotDuration: '00:15:00',
    			timeFormat: 'H:mm',
    			timezone: 'Europe/Paris',
    			utcOffset: '+0100',
    			minTime: '08:00',
    			maxTime: '22:00',
    			displayEventEnd : true,
    			lang:'fr',
    			defaultDate: new moment(),
    			eventRender: function(event, element, view){
    				element.append('<p class="text">RESERVER</p>');
    			},
    			eventClick: function(calEvent, jsEvent, view) {

    				var height = document.body.clientHeight;
					var width = document.body.clientWidth;
    				previouscolor = $(this).css('border-color');

    				if(calEvent.clickable === true)
    				{
					       
					        $("#title").val(calEvent.title);
					        $("#dateStart").val(calEvent.start);
					        $("#dateEnd").val(calEvent.end);
					        $("#creneauForm").html( "Créneau de :" + calEvent.start.format("HH:mm")+" - "+ calEvent.end.format("HH:mm"));
					        $("#id").val(calEvent.id);
					        crenaux = getCreauxLibresHelper(calEvent.start,reservationsBDD);
					        $("#dispoDay").val(crenaux.total);
					        var creneauxString = "";
					        for(var value of crenaux.libresliste){
					        	creneauxString += value.title + " - " + value.frees.length+"\n" ;
					        };
					        $("#dispodetail").val(creneauxString);
					        mylog(creneauxString);
					        mylog(calEvent);

					        if(previousEvent != null)
					        	previousEvent.css('border-color', previouscolor);

					        previousEvent = $(this);
					        var offset = $(this).offset();
					        var decalage = 150;
					        var relativeX = 0;

					        if((offset.left + 400) < width)
					        	relativeX = offset.left + decalage;
					        else
						  		relativeX = offset.left - decalage*2;

						  var relativeY = offset.top-150;
					        $("#form-container").show();
					        $("#form-container").css({left: relativeX,top:relativeY});
					        selectedDay = $(this);
					    }


			    },
			    eventMouseover:function(calEvent, jsEvent, view) {
			    	
			    	if(calEvent.clickable === true)
    				{
    					toggleSelectCreneau($(this));
    				}
			    },
			    eventMouseout:function(calEvent, jsEvent, view) {
			    	if(calEvent.clickable === true && selectedDay==null)
    				{
    					toggleSelectCreneau($(this));
    				}
			    },
			    dayClick: function(date, jsEvent, view) {
			    	if(isClickableDate(date,offDays))
			    	{
			    		calendarObject.fullCalendar( 'gotoDate', date );
				    	calendarObject.fullCalendar( 'changeView', 'agendaDay' );
				    }
				    
			    },
			    viewRender: function( view, element ) {
			    		$("#form-container").hide();
			    		mylog("viewRender "+view.name);
			    		refreshView(view);
			    		
			    		


			    },
			    dayRender:function( date, cell ) { 
			    		if(!isClickableDate(date,offDays))
			    			cell[0].bgColor="grey";

			    }


		    })*/

		    

		});