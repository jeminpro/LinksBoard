import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { actionCreators } from '../store/LinkleyStore';

class LinkForm extends Component {
    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        this.props.initialize(this.props.formData);
    }

    handleCancel() {
        this.props.cancelForm(this.props.formData.linkId, this.props.formData.groupId);
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


            <form className="link-form" onSubmit={this.props.handleSubmit} autoComplete="off"  >

                <div className="title">{this.props.formData.linkId ? 'Edit' : 'Add'} link</div>

                <Field name="name" label="Name" type="text" component={this.renderField} autoFocus={true}  />
                <Field name="url" label="URL" type="text" component={this.renderField} />
                <Field name="description" label="Description" type="textarea" component={this.renderField} />

                <div className="actions">
                    <button type="button" onClick={() => this.handleCancel()}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
                <div className="clearfix"/>
            </form>
        )
    }
}

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter name';
    }

    if (!values.url) {
        errors.url = 'Please enter url';
    }

    return errors;
}

const form = reduxForm({
    form: 'LinkForm',
    validate
});

export default connect(
    (state) => { return state.linkleyReducer },
    dispatch => bindActionCreators(actionCreators, dispatch)
)(form(LinkForm));
