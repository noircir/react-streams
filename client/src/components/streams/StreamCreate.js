import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {

    renderError( { error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        // console.log(meta.touched);
        console.log(this);

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit(formValues) {
        console.log(formValues)
    }

    render() {
        // console.log(this.props)
        return (
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error"
            >
                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Enter Title"
                />
                <Field 
                    name="description" 
                    component={this.renderInput} 
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
        errors.title = 'The title field cannot be empty.';
    }
    if (!formValues.description) {
        errors.description = 'The description field cannot be empty.';
    }
    // console.log(errors);
    return errors;
}

export default reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);