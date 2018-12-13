import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    // Fetch a stream independently of any other routes.
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // Pass only the properties that we want to change, not userId and stream id.
        this.props.editStream(this.props.match.params.id, formValues); 
        console.log(formValues)
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
};

// 'props' know the 'id' of the stream to be edited 
// (coming from the <Link> on the Edit button on the StreamList page)
// ( <Link> sends its own info: path, url, isExact, id as a part of url.
// It would be too much to overload it with extra load of stream's info).

// 'state' knows all the streams, but not the id of the stream to edit.

const mapStateToProps = (state, ownProps) => {
    // Now this function has access to both state and props.
    // We can combine them, to find the stream that we need.

    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);