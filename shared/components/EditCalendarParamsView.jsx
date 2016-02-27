import React from 'react';
import { connect }            from 'react-redux';
import * as CalendarParamsActions       from 'actions/CalendarParamsActions';
import {mylog,myMoment}  from 'lib/Utils';

@connect(state => ({ calendarParams: state.calendarParams}))
export default class EditCalendarParamsView extends React.Component {

  componentWillMount = () =>{
      var {dispatch} = this.props;
      this.setState({data:{},error:{},toStartHour:[],bookablePeriods:[]});
      this.weekdays = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
      this.pickersDayBase = "dayPickers_";
      this.minId = "min";
      this.periods = ["AM","PM"];
      this.dayOffBase = "day_off_";
      dispatch(CalendarParamsActions.getParamsForConnectedUser());
    }

  componentWillReceiveProps = (nextProps) => {
    console.log("nextprops");

    if(nextProps.calendarParams.idUser)
    {
      var bookablePeriodsByDay = this.getPeriodsByDay(nextProps.calendarParams.bookablePeriods);
      this.setState({data:nextProps.calendarParams, bookablePeriods:bookablePeriodsByDay, error:false});
      this.updateSelectedBoxes(bookablePeriodsByDay);
    }
    else
      this.setState({data:{},error:{'global':'no data'}});
  }
  componentDidUpdate = (prevProps, prevState) => {
  
  }
  updateSelectedBoxes = (bookablePeriodsByDay) =>{
    
    var daysPickers = this.weekdays.map(function(dayName,dayNumber){

      //TODO : rendre dynamique AM/PM (ou les definir quelque part , partagé partout comme les jours!)
       var partIdFrom = "D"+dayNumber+"_AM_0";
       var partIdTo = "D"+dayNumber+"_AM_1";
       var partIdFrom2 = "D"+dayNumber+"_PM_2";
       var partIdTo2 = "D"+dayNumber+"_PM_3";
      var partId = "D"+dayNumber+"_AM";
       var partId2 = "D"+dayNumber+"_PM";

        var from_H = 0;
        var from_M = 0;
        var to_H = 12;
        var to_M =0;
        var displayH = true;
        var displayH2 = true;
        var from_H2 = 13;
        var from_M2 = 0;
        var to_H2 = 24;
        var to_M2 = 0;
        var format = "HH:mm";
        if(bookablePeriodsByDay)
        {
            var currentPeriod = bookablePeriodsByDay[dayNumber];

            displayH = currentPeriod[0]?!(currentPeriod[0]>=13):false;
            displayH2 = currentPeriod[2]?true:false;


              //utilise moment pour parser minutes et heures 
              from_H  = currentPeriod[0]?myMoment(currentPeriod[0],format).format("HH"):null;
              to_H    = currentPeriod[1]?myMoment(currentPeriod[1],format).format("HH"):null;
              from_M  = currentPeriod[0]?myMoment(currentPeriod[0],format).format("mm"):null;
              to_M    = currentPeriod[1]?myMoment(currentPeriod[1],format).format("mm"):null;
            
            from_H2  = currentPeriod[2]?myMoment(currentPeriod[2],format).format("HH"):null;
            to_H2    = currentPeriod[3]?myMoment(currentPeriod[3],format).format("HH"):null;
            from_M2  = currentPeriod[2]?myMoment(currentPeriod[2],format).format("mm"):null;
            to_M2    = currentPeriod[3]?myMoment(currentPeriod[3],format).format("mm"):null;


        }
        $("#"+partIdFrom).val(from_H);
        $("#"+partIdTo).val(to_H);
        $("#"+partIdFrom+"_min").val(from_M);
        $("#"+partIdTo+"_min").val(to_M);
        (displayH)?$("#"+partId).show():$("#"+partId).hide();
        $("#"+"off_"+dayNumber+"_AM").prop('checked', displayH);
        this.updateOffDays("off_"+dayNumber+"_AM");
        
        $("#"+partIdFrom2).val(from_H2);
        $("#"+partIdTo2).val(to_H2);
        $("#"+partIdFrom2+"_min").val(from_M2);
        $("#"+partIdTo2+"_min").val(to_M2);
        (displayH2)?$("#"+partId2).show():$("#"+partId2).hide();
        $("#"+"off_"+dayNumber+"_PM").prop('checked', displayH2);
        this.updateOffDays("off_"+dayNumber+"_PM");

      }.bind(this));
  }
  buildBookablePeriodsString = () =>{
    var currentBookable = this.state.bookablePeriods;
    var creneauString = "";
    var bookablePeriodsString = "";
    console.log(this.state);
    console.log(currentBookable);
    for(var dayNumber=0; dayNumber<currentBookable.length;dayNumber++)
    {
      creneauString = "";
      console.log(currentBookable[dayNumber]);
      for(var creneauIndex=0; creneauIndex<currentBookable[dayNumber].length;creneauIndex++)
      {
          //si creneau activé par la checkbox alors il est pris en compte, sinon non
          creneauString +=  ( (creneauIndex<2 && $("#off_"+dayNumber+"_AM").prop('checked')) ||
                            (creneauIndex>1 && $("#off_"+dayNumber+"_PM").prop('checked'))) ? currentBookable[dayNumber][creneauIndex]:"";

        if(creneauIndex+1<currentBookable[dayNumber].length)
          creneauString += ";";
      }
      bookablePeriodsString +=creneauString;
      if(dayNumber+1<currentBookable.length)
          bookablePeriodsString += ",";
    }

    return bookablePeriodsString;
  }
  handleEdit = (e) => {
      var {dispatch} = this.props;
      /* si ID alors on édite sinon on insert . sera géré sur l'api, il faut juste envoyer le formulaire */
      e.preventDefault();
      var buildBookablePeriodsString = this.buildBookablePeriodsString();
      var data = {bookable_period:buildBookablePeriodsString, duree:e.target.duree.value,message:e.target.message.value};
      dispatch(CalendarParamsActions.updateParams(data,this.props.getEvents,{userId:this.props.userId}));
  }
  handleCancelClick = () => {
    e.preventDefault();
  }
  getPeriodsByDay = (bookablePeriods) => {
    var periodsArray = bookablePeriods;
    var periodsByDayArray = new Array();
    periodsArray.forEach(function(value,key){
      periodsByDayArray[key]=value.split(";"); 
    });
   
    return periodsByDayArray;
  }
  buildSelectOptions = (min,max,step,values) => {
        var htmlOptions = null;
        var selectHtml = "";
        var value = 0;
        var currentMin = parseInt(min);
        var currentMax = parseInt(max);
        var datas = values;

        if(!values)
        {
           // currentMin = 0;
           // currentMax = values.length -1;
           datas = new Array();
           for(var i=currentMin;i<=currentMax;i=i+parseInt(step))
            {
                datas[i]=((i<10)?"0":"")+i;
            }
        }
        htmlOptions = datas.map(function(value , i)
                        {
                            return  <option value={value} key={i}>{value}</option>
                        });

        return htmlOptions;
    }
    handleTimeChange = (event) => {

      /** Prend en compte le changement d'horaire et met à jour le state pour modifier les heures enregistrées : bookableperiods **/
      var {calendarParams} = this.props;
      var name = event.target.name;
      var nameArray = name.split("_");
      var dayNum = nameArray[0].substring(1);
      var creneau = nameArray[2];
      var newbookablePeriods = this.state.bookablePeriods;
      var hourId = "D"+dayNum+"_"+nameArray[1]+"_"+creneau;
    
      newbookablePeriods[dayNum][creneau] = $("#"+hourId).val() + ":" + $("#"+hourId+"_min").val();

      var newtoStartHour = {...this.state.toStartHour};
      newtoStartHour[name] = event.target.value;
      this.setState({toStartHour: newtoStartHour,bookablePeriods:newbookablePeriods});

    }
    updateOffDays = (elementId) => {
      var nameArray = elementId.split("_");
      var offAM = nameArray[0]+"_"+nameArray[1]+"_AM";
      var offPM = nameArray[0]+"_"+nameArray[1]+"_PM";
      var dayOffWarn = $("#"+this.dayOffBase+nameArray[1]);
      (!$("#"+offAM).prop('checked') && !$("#"+offPM).prop('checked'))?dayOffWarn.show():dayOffWarn.hide();
    }
    toggleElement = (id,elementId) => {
        $("#"+id).toggle();

        this.updateOffDays(elementId);
    }
  buildDayhourPicker = (dayNumber,form,partOfTheDayObj, min, max) =>{
    var partOfTheDay = partOfTheDayObj.value *2;
    var partId = "D"+dayNumber+"_"+partOfTheDayObj.name;
    var dayHourPickerId = dayNumber+"_"+partOfTheDayObj.name;
    var fromHourId = partId+"_"+(0+partOfTheDay);
    var toHourId = partId+"_"+(1+partOfTheDay);
    var fromMinId = partId+"_"+(0+partOfTheDay)+"_min";
    var toMinId = partId+"_"+(1+partOfTheDay)+"_min";

    var fromStartHour = this.state.toStartHour[toHourId]?parseInt(this.state.toStartHour[toHourId])-1:max;
    var selectFrom = <div className="selectPickers"> <select id={fromHourId} name={fromHourId} ref='fromHour' form={form} onChange={this.handleTimeChange}  >{this.buildSelectOptions(min,fromStartHour,1)} </select>  :  <select id={fromMinId} name={fromMinId} form={form} onChange={this.handleTimeChange}>{this.buildSelectOptions(0,59,30)} </select> </div>;
    var toStartHour = this.state.toStartHour[fromHourId]?parseInt(this.state.toStartHour[fromHourId])+1:min+1;
    var selectTo = <div className="selectPickers"> <select id={toHourId} name={toHourId} form={form} onChange={this.handleTimeChange}>{this.buildSelectOptions(toStartHour,max,1)} </select>  :  <select id={toMinId} name={toMinId} form={form} onChange={this.handleTimeChange}>{this.buildSelectOptions(0,59,30)} </select> </div>;

    var checkboxOff = "off_"+dayNumber+"_"+  partOfTheDayObj.name;   

    var creneauOffCheckBox = <input type="checkbox" id={checkboxOff} name={checkboxOff} onClick={this.toggleElement.bind(this,partId,checkboxOff)} /> 
   
    return <div id={dayHourPickerId}> {creneauOffCheckBox} {partOfTheDayObj.name} <div id={partId} className="dayHourPicker" >  {selectFrom} -> {selectTo} </div> </div>
  }
  handleChangeInput = (e)=> {
    console.log("CHANGE");
    var newState = this.state.data?this.state.data:{};
    newState[e.target.id] = e.target.value
    this.setState({data:newState});
  }
  render() 
  {
    var message = this.state.error;
    console.log("PARAMS RENDER");
    //const weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    var AM = {"name":"AM","value":0};
    var PM = {"name":"PM","value":1};
    var hiddenStyle = {"display":"none"};
    var bookablePeriodsString = this.buildBookablePeriodsString();
    var daysPickers = this.weekdays.map(function(dayName,dayNumber){
        var id = "day"+ dayNumber;
        var pickersDayId = this.pickersDayBase+dayNumber;
        var dayoffId = this.dayOffBase+dayNumber;

        return <div id={id} className="dayPickers"> {dayName} <div id={dayoffId} className="red" style={hiddenStyle}> Non travaillé </div><div id={pickersDayId}> {this.buildDayhourPicker(dayNumber,"editCalendarParams-form",AM,0,12)} {this.buildDayhourPicker(dayNumber,"editCalendarParams-form",PM,13,24)}<br/></div></div>
    }.bind(this))
    //this.state.toStartHour[dayNumber]
    return (
      <div id="editCalendarParams-content">
          <form id="editCalendarParams-form" onSubmit={this.handleEdit}> 
                    Crenaux : <input id="bookablePeriods" placeholder="Créneaux" name="bookablePeriods" type="hidden" value={bookablePeriodsString} />  
                    <div className="error">{message.bookable_periods}</div>
                    {daysPickers}
                    Duree : <input id="duree" placeholder="duree" name="duree" type="text" value={this.state.data.duree} onChange={this.handleChangeInput} required />  
                    <div className="error">{message.duree}</div>
                    Message : <input id="message" placeholder="message" name="message" type="text" onChange={this.handleChangeInput} value={this.state.data.message} />
                    <div className="error">{message.username}</div>
                    <br/> <button id="editparams" type="submit" className="green"><i className="fa fa-calendar-check-o">Valider</i></button>
                    <button id="cancel" onClick={this.handleCancelClick} className="red"><i className="fa fa-times">Annuler</i></button>          
           </form>
      </div>
    );
  }
}