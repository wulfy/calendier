	var calendarObject = $('#calendar');
	var previousEvent = null;
	var previousDay = null;
	var previouscolor = '';
	var reservationsBDD = [];
	var user = null;
	mylog("init");

	function myMoment(data,format)
	{
		return moment(data,format).utcOffset('+0100');
	}

	function convertDataToCalendarEvents(reservations)
	{
			var convertedReservations = reservations;

			if(reservations)
			for(i=0;i<reservations.length;i++)
			{
				convertedReservations[i].start = myMoment(reservations[i].start);
				convertedReservations[i].end = myMoment(reservations[i].end);
			}

			return convertedReservations;
	}
	function fadeOut(domid)
	  {
	    $( domid ).fadeOut( "slow");
	  }
                  
	function resetCalendarEvents(newEvents){
		if(typeof calendarObject != "undefined")
		{
			mylog("reset calendar");
			mylog(newEvents);
			calendarObject.fullCalendar('removeEvents');
			calendarObject.fullCalendar('addEventSource',newEvents);
		}
	}
	var free = null;
	function refreshView(view){
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

	
	function updateReservations(reservationsFromReact){
		mylog("update reservations");
		reservationsBDD = convertDataToCalendarEvents(reservationsFromReact);
		refreshView(calendarObject.fullCalendar( 'getView'));
	}
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

	function getReservationsBDD(){
		if(reservationsBDD)
			return reservationsBDD;
		else
			return new Array();
	}

	function setCurrentUser(userFromReact){
		user = userFromReact;
	}
	function getMine(reservations){
		var mine = new Array();
		console.log("user");
		console.log(user);
		if(user)
			if(user.roles)
				if(user.roles[0] == "ROLE_USER")
					mine = reservations;
				else{
					reservations.forEach((element,index)=>{
						console.log(element);
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

		/*if(user)
			reservations.forEach((element,index)=>{
				if(element.idClient == user.id)
					mine.push(element);
			})

		return mine;*/
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

	function findFirstDate(frees,creneau,preferedDay){
		var reservationsForWantedDay = new Array();
		var propositions = new Array();
		var lastDay = null;
		for(var free of frees)
		{

			creneau.start.date(free.start.date());
			creneau.end.date(free.end.date());
			if(free.start >= creneau.start && free.end <= creneau.end && free.start.date() != lastDay){
				lastDay = free.start.date();
				propositions.push(free);
			}
				
		}

		return propositions;
	}

	function buildSelect(name,min,max,step,form)
	{
		var htmlOptions = "";
		var selectHtml = "";
		var value = 0;
		for(var i=min;i<=max;i=i+step)
		{
				value = ((i<10)?"0":"")+i;
				htmlOptions +='<option value="'+value+'">'+value+'</option>';
		}	

		selectHtml = "<select name='"+name+"' form='"+form+"'>"+htmlOptions+"</select>";
		return selectHtml;
	}

	function gotoDay(strDate)
	{
		var date = new myMoment(strDate,"DD-MM");
		console.log(date);
		calendarObject.fullCalendar( 'gotoDate', date );
		calendarObject.fullCalendar( 'changeView', 'agendaDay' );
	}
	function handleSearchForm(e)
	{
		e.preventDefault();
		var start = e.target.fromHour.value+":"+e.target.fromMin.value;
		var end = e.target.toHour.value+":"+e.target.toMin.value;
		var creneau = {start:myMoment(start,"HH:mm"),end:myMoment(end,"HH:mm")};
		free = getMounthFreeCrenaux(creneau.start.month(),getReservationsBDD()).free;
		var res = "";
		var currentMonth = calendarObject.fullCalendar( 'getView' ).intervalStart.month();
		for(var day of findFirstDate(free,creneau))
			res += "<a class='search_result' href='#' onClick='gotoDay("+day.start.date()+")'>"+day.start.date()+"/"+(currentMonth+1)+"</a> &nbsp;&nbsp;" ;

		$("#res").html(res);
	}

	function displayConnectForm()
  {
      $("#login-form").show();
      $("#notConnected").hide();
  }
	/*********/

		$(document).ready(function() {

			
			var selectFrom = buildSelect("fromHour",0,24,1,"search_form") +":"+buildSelect("fromMin",0,59,duree_reservee,"search_form");
			var selectTo = buildSelect("toHour",0,24,1,"search_form") +":"+buildSelect("toMin",0,59,duree_reservee,"search_form");
			var form = '<form onsubmit="handleSearchForm(event);" id="search_form">' + "FROM " + selectFrom + " -  TO"+ selectTo + 
			'<button type="submit"><i class="fa fa-search"></i> Rechercher</button></form>'
			$("#calendar_search_form").html(form + "<div id='res'></div>");

			$("#close-form").click(()=>{$("#form-container").hide()});

	
    		/*$("#notConnected").hover(function(){
    			$(this).html('<a href="#" onClick="displayConnectForm()"><i className="fa fa-link"></i>Se connecter</a>');
    		});*/
  



		    /**reservations[2].push(...mine);
		    mylog(reservations[2]);**/
		    mylog("generating calendar");
		    //mylog(events);
		    calendarObject.fullCalendar({
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
					    }


			    },
			    eventMouseover:function(calEvent, jsEvent, view) {
			    	previouscolor = $(this).css('background-color');
			    	if(calEvent.clickable === true)
    				{
    					$(this).css('background-color', 'red');
    					$(this).children('.text').show();
    				}
			    },
			    eventMouseout:function(calEvent, jsEvent, view) {
			    	if(calEvent.clickable === true)
    				{
    					$(this).css('background-color', previouscolor);
    					$(this).children('.text').hide();
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


		    })

		    

		});