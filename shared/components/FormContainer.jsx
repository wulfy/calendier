import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import FormView              from 'components/FormView';
import * as CalendarActions       from 'actions/CalendarActions';

@connect(state => ({ message: state.messages}))
export default class FormContainer extends React.Component {

	render()
	{
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
      var {message,dispatch} = this.props;
		return (
            <div id="form-container">
                <div id="close-form">X</div>
                <h3> Réserver </h3>
                <span id="creneauForm"></span>
                <FormView
                    {...bindActionCreators(CalendarActions,dispatch)} userId={this.props.userId} message={this.props.message.data}/>
            </div>
      		);
	}

}