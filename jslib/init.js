console.log("hello");
	var events = new Array();
		$(document).ready(function() {

		    // page is now ready, initialize the calendar...
		    events.push(...reservationsBDD,...free);
		    /**reservations[2].push(...mine);
		    console.log(reservations[2]);**/
		    var previous = null;
		    var previouscolor = '';
		    console.log("generating calendar");
		    console.log(events);
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

    			eventClick: function(calEvent, jsEvent, view) {

    				previouscolor = $(this).css('border-color');
			        // change the border color just for fun
			        $(this).css('border-color', 'red');
			        $("#title").val(calEvent.title);
			        $("#start").val(calEvent.start);
			        $("#end").val(calEvent.end);
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

			        if(previous != null)
			        	previous.css('border-color', previouscolor);

			        previous = $(this);

			    }


		    })

		    

		});