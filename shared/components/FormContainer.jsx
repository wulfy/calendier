import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import FormView              from 'components/FormView';
import DetailsEventView              from 'components/DetailEventView';
import * as CalendarActions       from 'actions/CalendarActions';
import * as BookFormActions       from 'actions/BookFormActions';
import * as DetailEventActions       from 'actions/DetailEventActions';

@connect(state => ({ message: state.messages, formData: state.bookForm}))
export default class FormContainer extends React.Component {

    handleCloseForm = () =>{
         //e.preventDefault();
         console.log("hide form");
        var {message,formData, dispatch} = this.props;
        console.log("hide form");
        dispatch(BookFormActions.hideForm());
        
    }
    
    componentDidUpdate = (prevProps,prevState) =>{
      //var {target} = this.props;

       //var display = (formData.display?"show":"hide");
       
      /*if(formData.display)
        target.className += " greyscale";
      else
        target.className.replace(" greyscale",'');*/
    }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
        console.log("RENDER Form container");
      var {message,formData, dispatch} = this.props;
      /*var displayClass = (formData.display?"show":"hide");
      displayClass += " modal fade";*/
     var displayClass = {display:formData.display?"block":"none"};
     var stylegrey = {position:"absolute", width:"100%", height:"100%", "backgroundColor":"grey",opacity:"0.6"};
      var view = "";
      var msg = (message.error?message.error + " " : "") + this.props.message.data;
      console.log(formData);
      console.log("formdata");
      var details = "";
      var logged = false;
      var modalTitle = "Réserver";

      if(typeof formData.login !== "undefined")//server rendering
        logged = typeof formData.login.id !== "undefined" ;
      
      if(logged)
      {
          if(formData.free)
          {
            view = <FormView
                    {...bindActionCreators({...BookFormActions,...CalendarActions},dispatch)} handleCloseForm={this.handleCloseForm} userId={this.props.formData.calendarparams.idUser} message={msg} formData={formData}/>;
          }else
          {
            view        = <DetailsEventView {...bindActionCreators(DetailEventActions,dispatch)} formData={formData} />;
            modalTitle  = "détails réservation";
          }
       }else
       {
        view = <div id="loginPopIn"> Vous devez vous logger</div>
       }
		return (
            <div id="book-modal" style={displayClass} className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
                <div id="greybackground" style={stylegrey} onClick={this.handleCloseForm} ></div>
                <div className="modal-dialog modal-sm" role="document">
                  <div className="modal-content">

                    <div className="modal-header" >
                        <div id="close-form" onClick={this.handleCloseForm}>X</div>
                        <h4 className="modal-title" id="myModalLabel"> {modalTitle} </h4>
                    </div>    
                    <div className="modal-body" >
                        <span id="creneauForm">{formData.text}</span>
                            {view}

                    </div>
                    
                  </div>

                </div>
            </div>
      		);
	}

}