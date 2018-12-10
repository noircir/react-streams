import React from 'react';
import { Field, reduxForm } from 'redux-form';
import{ connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {

    // flash error message when the form field is left empty
    renderError( { error, touched}) {
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

        // the field itself turns pink if a user moved away from it
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        // {...input} means taking all the usual input props (value, onChange, etc) 
        // and add them to the <input /> element
        // It replaces:
        // <input onChange={formProps.input.onChange} value={formProps.input.value} />
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" type={type}/>
                {this.renderError(meta)}
            </div>
        )
    }

    // Every time Submit button is pressed, the field values will be first validated,
    // and if everything is OK, createStream action creator will be called 
    // and passed formValues, and an axios call will be sent out to our API server
    // to 'post' a new stream. 

    onSubmit = (formValues) => {
        // console.log(formValues) // Two values were passed: title and description

        // On submit, send action 'createNewStream' to action creator.
        // This component does not take in any props, so mapStateToProps = null,
        // and mapDispatchToProps is { createNewStream: createStream }
        // The action creator creates a new entry in the db.
        this.props.createNewStream(formValues); 
    }

    render() {
        // console.log(this.props)
        // this.props.handleSubmit() is provided by the redux form.
        // We pass it our own this.onSubmit with all values of our form (formValues).
        return (
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                // Without class 'error' the error won't show up on the page (SemanticUI default)
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
                    type="text"
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
    // console.log(errors);

    // The errors are passed to 'renderField' function.
    return errors;
}

// To wire up both 'connect' and 'reduxForm' to our class StreamCreate,
// separate the wrappers into two:
const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createNewStream: createStream })(formWrapped);