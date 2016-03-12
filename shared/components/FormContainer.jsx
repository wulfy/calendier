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

    handleCloseForm = (e) =>{
         e.preventDefault();
        var {message,formData, dispatch} = this.props;
        dispatch(BookFormActions.hideForm());
    }
	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
        console.log("RENDER Form container");
      var {message,formData, dispatch} = this.props;
      var displayClass = (formData.display?"show":"hide");
      var view = "";
      var msg = (message.error?message.error + " " : "") + this.props.message.data;
      console.log(formData);
      console.log("formdata");
      var details = "";
      
      if(formData.login)
      {
        view = <FormView
                    {...bindActionCreators({...BookFormActions,...CalendarActions},dispatch)} handleCloseForm={this.handleCloseForm} userId={this.props.userId} message={msg} formData={formData}/>
          if(!formData.free)
          {
            view = <DetailsEventView {...bindActionCreators(DetailEventActions,dispatch)} eventId={formData.id} />;
          }
       }else
       {
        view = <div id="loginPopIn"> Vous devez vous logger</div>
       }
		return (
            <div id="form-container" className={displayClass}>
                <div id="close-form" onClick={this.handleCloseForm}>X</div>
                <h3> Réserver </h3>
                
                <span id="creneauForm">{formData.text}</span>
                    {view}
            </div>
      		);
	}

}