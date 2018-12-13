import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    // flash error message when the form field is left empty
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    {error}
                </div>
            );
        }
    }

    renderField = ({
        input,
        label,
        type,
        meta }) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" type={type} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="title"
                    component={this.renderField}
                    label="Enter Title"
                    type="text"
                />
                <Field
                    name="description"
                    component={this.renderField}
                    label="Enter Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Title must be specified.';
    }
    if (!formValues.description) {
        errors.description = 'Description must be specified.';
    }
    return errors;
}

export default reduxForm({
    form: 'StreamForm',
    validate
})(StreamForm);