import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import {mylog,myMoment}  from 'lib/Utils';

@connect(state => ({ calendarParams: state.calendarParams}))
export default class SearchContainer extends React.Component {

    componentWillMount= () => {
    this.setState({toStartHour: 0,display:false,displayTime:0,searchResult:null});
    }
    componentDidMount = () => {
        this.messageDiv = document.getElementById("res");
        this.formContainer = document.getElementById("formContainer");
        this.displaySearchButton = document.getElementById("displaySearchButton");
    }
    gotoDay = (strDate) =>{
        console.log("gotoday");
        var date = new myMoment(strDate,"DD-MM");
        mylog(date);
        this.props.getCalendarObj().fullCalendar( 'gotoDate', date );
        this.props.getCalendarObj().fullCalendar( 'changeView', 'agendaDay' );
    }
    findFirstDate = (frees,creneau,preferedDay)=>{
        var reservationsForWantedDay = new Array();
        var propositions = new Array();
        var lastDay = null;
        var intPreferedDay = parseInt(preferedDay);
        var isWantedDay = true;
        for(var free of frees)
        {

            creneau.start.date(free.start.date());
            creneau.end.date(free.end.date());
            isWantedDay = (preferedDay?free.start.day()==intPreferedDay:true); 
            console.log(intPreferedDay);
            console.log(isWantedDay);
            if(free.start >= creneau.start && free.end <= creneau.end && free.start.date() != lastDay && isWantedDay){
                lastDay = free.start.date();
                propositions.push(free);
            }
                
        }

        return propositions;
    }

    componentDidUpdate = (prevProps,prevState) => {
        console.log("component updated");
        if(this.state.display)
        {
            this.displayMessage();
            if(Number.isInteger(this.state.displayTime))
            {
                 setTimeout(function(){ this.handleMessage(null); }.bind(this), this.state.displayTime*1000); 
            }
        }else
        {
            this.hideMessage();
        }
    }
    handleSearchForm = (e) =>{
        e.preventDefault();
        const weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
        
        var res = "";
        var displayTime = 5;
        if(e.target.fromHour.value && e.target.fromMin.value && 
           e.target.toHour.value && e.target.toMin.value)
        {
            var start = e.target.fromHour.value+":"+e.target.fromMin.value;
            var end = e.target.toHour.value+":"+e.target.toMin.value;
            var creneau = {start:myMoment(start,"HH:mm"),end:myMoment(end,"HH:mm")};
            var day = e.target.day.value;
            console.log("before free");
            var free = this.props.getFree();
            console.log("free");
            console.log(free);
            var days = this.findFirstDate(free,creneau,day);
            var currentMonth = this.props.getCalendarObj().fullCalendar( 'getView' ).intervalStart.month();
            

            res=days.map(function(currentday , i)
                {
                     return <a className='search_result' href="#" key={i} onClick={this.gotoDay.bind(null,currentday.start.date())}>
                                {weekday[currentday.start.day()]} {currentday.start.date()}/{(currentMonth+1)} </a> ;
                    }.bind(this));

            if(days.length <1)
            {
                res = "Aucun creneau trouvé. Essayez avec une période différente";
                //displayTime = 5;
            }
        }else
        {
            mylog(e.target.toHour.value);
             res = "Veuillez sélectionner une heure de début et de fin";
             //displayTime = 5;
        }
        this.handleMessage(res,displayTime);
        
    }

    buildSelect = (name,min,max,step,form,values) => {
        var htmlOptions = null;
        var selectHtml = "";
        var value = 0;
        var currentMin = min;
        var currentMax = max;
        var datas = values;

        if(!values)
        {
           // currentMin = 0;
           // currentMax = values.length -1;
           datas = new Array();
           for(var i=currentMin;i<=currentMax;i=i+step)
            {
                datas[i]=((i<10)?"0":"")+i;
            }
        }
        var initialOptions =<option value="" key=""> - </option>;
        
        htmlOptions = datas.map(function(value , i)
                        {
                            return  <option value={i} key={i}>{value}</option>
                        });

        selectHtml = <select name={name} form={form} >{initialOptions} {htmlOptions}</select>;
        return selectHtml;
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
        var initialOptions =<option value="" key=""> - </option>;
        htmlOptions = datas.map(function(value , i)
                        {
                            return  <option value={i} key={i}>{value}</option>
                        });

        return htmlOptions;
    }
    defaultOption = (text) =>{
        return <option value="" key="-"> {text} </option>;
    }
    displaySearchForm = () =>{
        this.displaySearchButton.classList.add("rollRight");
        this.formContainer.style.display = "block";
        this.formContainer.classList.add("appear");
    }
    hideSearchForm = (e) => {
        e.preventDefault();
        this.displaySearchButton.classList.remove("rollRight");
        this.formContainer.classList.remove("appear");
        this.formContainer.style.display = "none";
        this.hideMessage();
   }
   displayMessage = () => {
        this.messageDiv.style.display = "block";
        this.messageDiv.classList.add("animate");

   }
   hideMessage = () => {

        this.messageDiv.style.display = "none";
        this.messageDiv.classList.remove("animate");
   }
   handleChange = (event) => {
        const { toStartHour, searchResult, ...rest } = this.state;
        this.setState({toStartHour: event.target.value,searchResult:null,...rest});
    }
    handleMessage = (newSearchResult,newDisplayTime) => {
        const { searchResult, displayTime,  display, ...rest } = this.state;
        var newDisplay = (newSearchResult != null);
        this.setState({searchResult:newSearchResult,displayTime:newDisplayTime, display:newDisplay, ...rest});
    }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
      var {calendarParams} = this.props;
      const weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
      console.log("RENDER SEARCH CONTAINER");
      var selectFrom = <div className="selectBoxes"> <select name="fromHour" ref='fromHour' form="search_form" onChange={this.handleChange}>{this.buildSelectOptions(0,24,1)} </select>  :  <select name="fromMin" form="search_form" >{this.buildSelectOptions(0,59,calendarParams.duree)} </select> </div>;
      var selectTo = <div className="selectBoxes"> <select name="toHour" form="search_form" >{this.buildSelectOptions(this.state.toStartHour,24,1)} </select>  :  <select name="toMin" form="search_form" >{this.buildSelectOptions(0,59,calendarParams.duree)} </select> </div>;
      var selectDay = <select name="day" form="search_form" >{this.defaultOption("Choisir un jour")} {this.buildSelectOptions(0,0,1,weekday)} </select> ;
      var {message,dispatch} = this.props;


		return (
            <div id='searchFormContainer'>
                <div id='displaySearchButton'> 
                    <button onClick={this.displaySearchForm} >
                        <i className='fa fa-search'></i> Rechercher un creneau selon une date
                    </button>
                </div>
                <div id='formContainer'>
                    <form onSubmit={this.handleSearchForm} id='search_form'>
                        <div className='col time'> 
                            <i className='fa fa-clock-o'></i> Heure début*   {selectFrom}   
                        </div> 
                        <div className='col time'>
                            <i className='fa fa-clock-o'></i> Heure fin*  {selectTo}   
                        </div>
                        <div className='col day'> 
                            Jour <span>(optionnel)</span>{selectDay} 
                        </div>
                        <button type='submit'>
                            <i className='fa fa-search'></i> Rechercher
                        </button>
                        <button id='cancelSearch' onClick={this.hideSearchForm}>
                            <i className='fa fa-times'></i> Cancel
                        </button>
                    </form>
                </div>
                <div id='res' className="message"  >{this.state.searchResult}</div>
            </div>
      		);
	}

}