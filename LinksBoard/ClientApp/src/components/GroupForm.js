import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { actionCreators } from '../store/LinkleyStore';

class GroupForm extends Component {
    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        this.props.initialize(this.props.groupFormData);
    }

    handleCancel() {
        this.props.cancelGroupForm(this.props.groupFormData.groupId);
    }

    /*
     todo handle onsubmit with the component
     for some reason its not working with redux-form library
      
    handleSubmit(value) {
        console.log(value);
    }
    */

    renderField = ({ input, label, type, autoFocus, meta: { touched, error, warning } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} autoFocus={autoFocus} />
                {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

    render() {

        return (
            <form className="link-form " onSubmit={this.props.handleSubmit} autoComplete="off" >

                <div className="card-header">{this.props.groupFormData.groupId?'Edit':'Add'} group</div>

                <Field name="groupName" label="Group Name" type="text" component={this.renderField} autoFocus={true} />

                <div className="actions">
                    <button type="button" onClick={() => this.handleCancel()}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
                <div className="clearfix"/>
            </form>
        )
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.groupName) {
        errors.groupName = 'Please enter group name';
    }

    return errors;
}

const form = reduxForm({
    form: 'GroupForm',
    validate
});

export default connect(
    (state) => { return state.linkleyReducer },
    dispatch => bindActionCreators(actionCreators, dispatch)
)(form(GroupForm));
