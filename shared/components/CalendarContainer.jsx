import React from 'react';
import { bindActionCreators } from 'redux';
import * as CalendarActions       from 'actions/CalendarActions';
import { connect }            from 'react-redux';
import {mylog,convertDataToCalendarEvents,myMoment,isClickableDate}  from 'lib/Utils';


@connect(state => ({ events: state.calendar, login: state.login}))
export default class CalendarContainer extends React.Component {

    componentDidMount = ()=>{
      this.state={calendarObject:'',currentReservations:'',freeMonth:'',free:'',mine:'',selectedDay:'',previouscolor:''};
      this.updateReservations(this.props.events.reservations);
      this.state.calendarObject = $('#calendar');
      var reactThis = this;
      this.state.calendarObject.fullCalendar({
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
                var currentObj = $(jsEvent.currentTarget);
                reactThis.state.previouscolor = currentObj.css('border-color');

                if(calEvent.clickable === true)
                {
                     
                      $("#title").val(calEvent.title);
                      $("#dateStart").val(calEvent.start);
                      $("#dateEnd").val(calEvent.end);
                      $("#creneauForm").html( "Créneau de :" + calEvent.start.format("HH:mm")+" - "+ calEvent.end.format("HH:mm"));
                      $("#id").val(calEvent.id);
                      var crenaux = getCreauxLibresHelper(calEvent.start,reactThis.state.currentReservations);
                      $("#dispoDay").val(crenaux.total);
                      var creneauxString = "";
                      for(var value of crenaux.libresliste){
                        creneauxString += value.title + " - " + value.frees.length+"\n" ;
                      };
                      $("#dispodetail").val(creneauxString);
                      mylog(creneauxString);
                      mylog(calEvent);

                      /*if(previousEvent != null)
                        previousEvent.css('border-color', reactThis.state.previouscolor);

                      previousEvent = currentObj;*/
                      var offset = currentObj.offset();
                      var decalage = 150;
                      var relativeX = 0;

                      if((offset.left + 400) < width)
                        relativeX = offset.left + decalage;
                      else
                      relativeX = offset.left - decalage*2;

                  var relativeY = offset.top-150;
                      $("#form-container").show();
                      $("#form-container").css({left: relativeX,top:relativeY});
                      reactThis.state.selectedDay = currentObj;
                  }


              }.bind(reactThis),
              eventMouseover:function(calEvent, jsEvent, view) {
                if(calEvent.clickable === true)
                {
                  reactThis.toggleSelectCreneau($(jsEvent.currentTarget));
                }
              }.bind(reactThis),
              eventMouseout:function(calEvent, jsEvent, view) {
                if(calEvent.clickable === true && this.state.selectedDay==null)
                {
                  reactThis.toggleSelectCreneau($(jsEvent.currentTarget));
                }
              }.bind(reactThis),
              dayClick: function(date, jsEvent, view) {
                if(isClickableDate(date,offDays))
                {
                  reactThis.state.calendarObject.fullCalendar( 'gotoDate', date );
                  reactThis.state.calendarObject.fullCalendar( 'changeView', 'agendaDay' );
                }
                
              }.bind(reactThis),
              viewRender: function( view, element ) {
                  $("#form-container").hide();
                  mylog("viewRender "+view.name);
                  reactThis.refreshView(view);
              }.bind(reactThis),
              dayRender:function( date, cell ) { 
                  if(!isClickableDate(date,offDays))
                    cell[0].bgColor="grey";

              }


            });
      console.log("didmount");
    }

      
  	
    componentDidUpdate =(prevProps,prevState)=>{
      var { events, dispatch} = this.props;
          console.log("update");

         this.updateReservations(events.reservations);
         this.refreshView($('#calendar').fullCalendar( 'getView' ));
            /*var free = getCreauxLibresHelper(current,events.reservations,true).free;
            newevents.push(...reservationsBDD,...free);
            resetCalendarEvent(newevents);*/
    }
    getMine= (reservations)=> {
        var mine = new Array();
        var {login} = this.props;
        mylog("user");
        mylog(login);
        if(login.roles)
            if(login.roles[0] == "ROLE_USER")
              mine = reservations;
            else{
              reservations.forEach((element,index)=>{
                mylog(element);
                if(element.idClient == login.id)
                  mine.push(element);
              });
            }
          
        return mine;
    }
    updateReservations = (newevents) => {
      var today = new myMoment(1, "HH");
      var view = $('#calendar').fullCalendar( 'getView' );
      this.state.currentReservations = convertDataToCalendarEvents(newevents);

      var freeData = getMounthFreeCrenaux(1,this.state.currentReservations,today);

      this.state.freeMonth = freeData.freeMonth;
      this.state.free = freeData.free;
      this.state.mine = this.getMine(this.state.currentReservations);

    }
    toggleSelectCreneau= (element) => {
      if(this.state.selectedDay)
      {
        this.state.selectedDay.css('background-color', this.state.previouscolor);
        this.state.selectedDay.children('.text').hide();
        this.state.previouscolor = null;
      }
      
      if(element)
      {
        this.state.previouscolor = element.css('background-color');
        element.css('background-color', 'red');
        element.children('.text').show();
        this.state.selectedDay = element;
      }

    }
    refreshView = (view)=> {
        mylog("refreshView");
        
        var events = new Array();
        var today = new moment().utcOffset('+0100');
        var currentReservations = this.state.currentReservations;//calendarObject.fullCalendar( 'clientEvents',getReservationsFilter);
        mylog(currentReservations);
        switch(view.name)
        {
          case "month" :
                    //calendarObject.fullCalendar('removeEvents');
                    //freeMonth = getMounthFreeCrenaux(view.intervalStart.month(),currentReservations);
                    hideResSearchForm();
                    console.log("month refresh");
                    events.push(...this.state.freeMonth,...this.state.mine);
                    this.resetCalendarEvents(events);
                    //calendarObject.fullCalendar('addEventSource',events);
                    break;
          case "agendaDay" :
                    //previousDay = $(this);
                    //var free = getCreauxLibresHelper(myMoment(view.intervalStart),this.state.currentReservations,true).free;
                    events.push(...this.state.currentReservations,...this.state.free);
                    this.resetCalendarEvents(events);
                    break;
        }
    
  }
  resetCalendarEvents = (newEvents)=>{
    if(typeof this.state.calendarObject != "undefined")
    {
      mylog("reset calendar");
      mylog(newEvents);
      this.state.calendarObject.fullCalendar('removeEvents');
      this.state.calendarObject.fullCalendar('addEventSource',newEvents);
    }
  }
	render()
	{
		  console.log("STATE RENDERING CALENDAR CONTAINER : ");
    	var { events, dispatch} = this.props;
          
		return (
			<div id="calendar-container">
	      		<div id="calendar">
	      		</div>
      		</div>
      		);
	}

}