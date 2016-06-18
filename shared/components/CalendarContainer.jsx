import React from 'react';
import { bindActionCreators } from 'redux';
import * as CalendarActions       from 'actions/CalendarActions';
import * as BookFormActions       from 'actions/BookFormActions';
import { connect }            from 'react-redux';
import {mylog,convertDataToCalendarEvents,myMoment,isClickableDate}  from 'lib/Utils';
import SearchContainer       from 'components/SearchContainer';

var tools = require('lib/calendar_tools');

@connect(state => ({ events: state.calendar, login: state.login, calendarParams: state.calendarParams}))
export default class CalendarContainer extends React.Component {

    componentWillMount= () => {
      var {calendarParams,dispatch} = this.props;

      this.calendarObject = '';
      this.currentReservations = '';
      this.freeMonth='';
      this.free = '';
      this.mine = '';
      this.selectedDay = '';
      this.previouscolor = '';
      this.blockSelectedDay = false;
      this.offDays = [0];
      this.login = null;
      this.loginId = null;
      this.displayLoginBox = false;
      this.today = new myMoment(1, "HH");
      this.currentMonth =  this.today.month();
    

    }
    componentDidMount = ()=>{
      var {calendarParams,login} = this.props;
      console.log("didmount CalendarContainer");
      //do not use state, use data in "component will mount"
      this.state={calendarObject:'',currentReservations:'',freeMonth:'',free:'',mine:'',selectedDay:'',previouscolor:'',blockSelectedDay:false};
      console.log("before update");
      console.log(calendarParams);
      if(typeof calendarParams.duree != 'undefined')
        this.updateReservations();
      console.log("after update");
      this.offDays = [0];
      this.state.calendarObject = $('#calendar');
      var reactThis = this;
      var {dispatch} = this.props;
      this.state.calendarObject.fullCalendar({
              header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaDay'
            },
              slotDuration: '00:15:00',
              timeFormat: 'H:mm',
              timezone: 'Europe/Paris',
              utcOffset: '+0200',
              minTime: '08:00',
              maxTime: '22:00',
              displayEventEnd : true,
              lang:'fr',
              allDaySlot:false,
              defaultDate: new myMoment(1, "HH"),
              eventRender: function(event, element, view){
                  element.append('<p class="text">RESERVER</p>');
              },
              eventClick: function(calEvent, jsEvent, view) {

                var height = document.body.clientHeight;
                var width = document.body.clientWidth;
                var currentObj = $(jsEvent.currentTarget);
                reactThis.state.previouscolor = currentObj.css('border-color');

                if(calEvent.clickable === true || this.loginId == calendarParams.idUser)
                {
                      var offset = currentObj.offset();
                      var decalage = 150;
                      var relativeX = 0;
                      var text = "Créneau de :" + calEvent.start.format("HH:mm")+" - "+ calEvent.end.format("HH:mm");
                      if((offset.left + 400) < width)
                        relativeX = offset.left + decalage;
                      else
                      relativeX = offset.left - decalage*2;

                  var relativeY = offset.top-150;
                      $("#form-container").css({left: relativeX,top:relativeY});
                      
                      console.log(calEvent);
                      console.log("start");

                      dispatch(BookFormActions.displayForm(calEvent.title,calEvent.start.toDate(),calEvent.end.toDate(),calEvent.id,text,this.props.login, this.props.calendarParams, calEvent.free));
                  }


              }.bind(reactThis),
              eventMouseover:function(calEvent, jsEvent, view) {
                if(calEvent.clickable === true)
                {
                  this.toggleSelectCreneau($(jsEvent.currentTarget));
                }
              }.bind(reactThis),
              eventMouseout:function(calEvent, jsEvent, view) {
                if(calEvent.clickable === true)
                {
                  this.toggleSelectCreneau();
                }
              }.bind(reactThis),
              dayClick: function(date, jsEvent, view) {
                if(isClickableDate(date,this.offDays))
                {
                  this.state.calendarObject.fullCalendar( 'gotoDate', date );
                  this.state.calendarObject.fullCalendar( 'changeView', 'agendaDay' );
                }
                
              }.bind(reactThis),
              viewRender: function( view, element ) {
                  reactThis.refreshView(view);
              }.bind(reactThis),
              dayRender:function( date, cell ) { 
                  if(!isClickableDate(date,reactThis.offDays))
                    cell[0].bgColor="grey";

              }.bind(reactThis)


            });

      //ne pas utiliser setinterval tout seul car le composant se recharge et il semble qu'il perde l'identifiant de retour
      //en gros set interval ne sait plus à qui donner le "promise"
      this.interval = setInterval(() => {
                var {calendarParams} = this.props;
                if(document.getElementById("book-modal").style.display != "block" && typeof calendarParams.idUser !== "undefined")
                  dispatch(CalendarActions.getEvents({userId:calendarParams.idUser}));
                }, 2000);
      console.log("didmount");
    }

      
  	
    componentDidUpdate =(prevProps,prevState)=>{
          console.log("update");
          var {login} = this.props;
          this.login = login.login;
          if(login.id)
            this.loginId = login.id;
          this.blockSelectedDay = false;
         this.updateReservations();
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
    updateReservations = () => {
      var { events, calendarParams} = this.props;

      var newevents = events.reservations;
      var duree = calendarParams.duree;
      var periodes = calendarParams.bookablePeriods;
      var today = new myMoment(1, "HH");
      this.state.currentReservations = convertDataToCalendarEvents(newevents);

      var freeData = tools.getMounthFreeCrenaux(this.currentMonth,this.state.currentReservations,periodes,duree,today);

      this.state.freeMonth = freeData.freeMonth;
      this.state.free = freeData.free;
      this.state.mine = this.getMine(this.state.currentReservations);

    }
    toggleSelectCreneau= (element) => {

      if($("#book-modal").css('display') != 'block')
      {
        
        if(this.state.selectedDay )
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

    }
    refreshView = (view)=> {
        mylog("refreshView");
        this.blockSelectedDay = false;
        var events = new Array();
        var currentReservations = this.state.currentReservations;//calendarObject.fullCalendar( 'clientEvents',getReservationsFilter);
        mylog(currentReservations);
        switch(view.name)
        {
          case "month" :
                    //calendarObject.fullCalendar('removeEvents');
                    //freeMonth = getMounthFreeCrenaux(view.intervalStart.month(),currentReservations);
                    if(this.currentMonth != view.intervalStart.month() && this.today.month()<=view.intervalStart.month())
                    {
                      this.currentMonth = view.intervalStart.month();
                      this.updateReservations();
                    }
                      
                    $("#res").removeClass("animate");
                    $("#res").hide();
                    console.log("month refresh");
                    view.intervalStart.month()
                    events.push(...this.state.freeMonth,...this.state.mine);
                    this.resetCalendarEvents(events);
                    console.log("end ref");
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
  getFreeHandler = () => {
    return this.state.free;
  }
  getCalendarObjHandler = () => {
    return this.state.calendarObject;
  }
	render()
	{
		  console.log("STATE RENDERING CALENDAR CONTAINER : ");
    	var { events, dispatch, calendarParams, login} = this.props;
      
		return (
			<div id="calendar-container">
          <div className="panel panel-default">
            <div className="panel-body">
              <p className="text-center"><i className="fa fa-bullhorn"></i> {calendarParams.message}</p>
            </div>
          </div>
            <SearchContainer getFree={this.getFreeHandler} getCalendarObj={this.getCalendarObjHandler}/>
	      		<div id="calendar">
	      		</div>
      		</div>
      		);
	}

}