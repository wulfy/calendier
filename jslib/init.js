console.log("hello");
	var events = new Array();
		$(document).ready(function() {

			//today
			var current = new moment();
			var freeMonth = new Array();
			var mine = new Array();
			var free = new Array();
			current.add(1,"days");
			
			for(i=0;i<reservationsBDD.length;i++)
			{
				reservationsBDD[i].start = moment(reservationsBDD[i].start);
				reservationsBDD[i].end = moment(reservationsBDD[i].end);
				if(reservationsBDD[i].idClient)
				{
					mine.push(reservationsBDD[i]);
					reservationsBDD.splice(i, 1);
				}
			}
		    // page is now ready, initialize the calendar...

		    if(reservationsBDD.length>0)
		    {
		    	free = getCreauxLibresHelper(current,reservationsBDD).free;
				freeMonth = getMounthFreeCrenaux(current.month()+1);
		    	events.push(...free,...freeMonth);
		    }
		    /**reservations[2].push(...mine);
		    console.log(reservations[2]);**/
		    var previousEvent = null;
		    var previousDay = null;
		    var previouscolor = '';
		    console.log("generating calendar");
		    //console.log(events);
		    $('#calendar').fullCalendar({
		    	header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
		        events: events,
    			slotDuration: '00:15:00',
    			timeFormat: 'H:mm',
    			displayEventEnd : true,
    			defaultDate:current,

    			eventClick: function(calEvent, jsEvent, view) {

    				var height = document.body.clientHeight;
					var width = document.body.clientWidth;
    				previouscolor = $(this).css('border-color');
			        // change the border color just for fun
			        $(this).css('border-color', 'red');
			        $("#title").val(calEvent.title);
			        $("#dateStart").val(calEvent.start);
			        $("#dateEnd").val(calEvent.end);
			        $("#id").val(calEvent.id);
			        crenaux = getCreauxLibresHelper(calEvent.start,reservationsBDD);
			        $("#dispoDay").val(crenaux.total);
			        var creneauxString = "";
			        for(var value of crenaux.libresliste){
			        	creneauxString += value.title + " - " + value.frees.length+"\n" ;
			        };
			        $("#dispodetail").val(creneauxString);
			        console.log(creneauxString);
			        console.log(calEvent);

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

				  var relativeY = offset.top-100;
			        $("#form-container").show();
			        $("#form-container").css({left: relativeX,top:relativeY});


			    },

			    dayClick: function(date, jsEvent, view) {

			    		if(previousDay != null)
			    			previousDay.css('background-color','');

			    		$(this).css('background-color', 'red');
			    		previousDay = $(this);
			    		$('#calendar').fullCalendar( 'gotoDate', date );
			    		$('#calendar').fullCalendar( 'changeView', 'agendaDay' );
			    		$('#calendar').fullCalendar('removeEvents');
			    		current.month(date.month()).date(date.date()).year(date.year());
			    		free = getCreauxLibresHelper(current,reservationsBDD).free;
			    		events = new Array();
			    		events.push(...reservationsBDD,...free);
			    		$('#calendar').fullCalendar('addEventSource',events);
			    },
			    viewRender: function( view, element ) {

			    		if(view.name == "month")
			    		{
			    		$('#calendar').fullCalendar('removeEvents');
			    		events = new Array();
			    		events.push(...freeMonth,...mine);
			    		$('#calendar').fullCalendar('addEventSource',events);
			    		}
			    }


		    })

		    

		});