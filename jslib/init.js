
	var events = new Array();
	var calendarObject = $('#calendar');

	mylog("init");

	function myMoment(data,format)
	{
		return moment(data,format).utcOffset('+0100');
	}

	//today
	var current = new moment();
	var freeMonth = new Array();
	var mine = new Array();
	var free = new Array();
	current.add(1,"days");
	var purgedReservations = new Array();

	
	function fadeOut(domid)
	  {
	    $( domid ).fadeOut( "slow");
	  }
                  
	function resetCalendarEvent(newEvents){
		if(typeof calendarObject != "undefined")
		{
			mylog("reset calendar");
			mylog(newEvents);
			calendarObject.fullCalendar('removeEvents');
			calendarObject.fullCalendar('addEventSource',newEvents);
		}
	}

	function redrawCalendar()
	{
		mylog("redraw");
		calendarObject.fullCalendar( 'changeView','agendaDay' );
	}

	function refreshFreeEvents(reservations){
		events = new Array();
		free = getCreauxLibresHelper(current,reservations,true).free;
		events.push(...reservations,...free);
		return events;
	}

	function changeCurrentDate(month,day,year)
	{
		current.month(month).date(day).year(year);
	}


		$(document).ready(function() {

			$("#close-form").click(()=>{$("#form-container").hide()});
			
			for(i=0;i<reservationsBDD.length;i++)
			{
				reservationsBDD[i].start = myMoment(reservationsBDD[i].start);
				reservationsBDD[i].end = myMoment(reservationsBDD[i].end);
				if(reservationsBDD[i].idClient)
				{
					mine.push(reservationsBDD[i]);
				}else
				{
					purgedReservations.push(reservationsBDD[i]);
				}
			}

			reservationsBDD = purgedReservations;
		    // page is now ready, initialize the calendar...

		    reservationsBDD.push(...mine);
		    if(reservationsBDD.length>0)
		    {
		    	//free = getCreauxLibresHelper(current,reservationsBDD,true).free;
				freeMonth = getMounthFreeCrenaux(current.month());
		    	events.push(...free,...freeMonth);
		    }
		    /**reservations[2].push(...mine);
		    mylog(reservations[2]);**/
		    var previousEvent = null;
		    var previousDay = null;
		    var previouscolor = '';
		    mylog("generating calendar");
		    //mylog(events);
		    calendarObject.fullCalendar({
		    	header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
		        events: events,
    			slotDuration: '00:15:00',
    			timeFormat: 'H:mm',
    			timezone: 'Europe/Paris',
    			minTime: '08:00',
    			maxTime: '22:00',
    			displayEventEnd : true,
    			defaultDate:current,
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
			    		calendarObject.fullCalendar( 'gotoDate', date );
				    	calendarObject.fullCalendar( 'changeView', 'agendaDay' );
			    },
			    viewRender: function( view, element ) {
			    		$("#form-container").hide();
			    		mylog("viewRender "+view.name);
			    		switch(view.name)
			    		{
			    			case "month" :
								    		//calendarObject.fullCalendar('removeEvents');
								    		freeMonth = getMounthFreeCrenaux(view.intervalStart.month());
								    		events = new Array();
								    		events.push(...freeMonth,...mine);
								    		resetCalendarEvent(events);
								    		//calendarObject.fullCalendar('addEventSource',events);
								    		break;
			    			case "agendaDay" :
							    			previousDay = $(this);
								    		free = getCreauxLibresHelper(myMoment(view.intervalStart),reservationsBDD,true).free;
								    		events = new Array();
								    		events.push(...reservationsBDD,...free);
								    		resetCalendarEvent(events);
								    		break;
			    		}


			    }


		    })

		    

		});