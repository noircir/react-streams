import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {

    // Turn the component into class because we want to fetch all the streams
    // once only, when the component mounts, and not re-render the list all the time.
    // Only classes have lifecycle methods. 

    // Yes we import 'fetchStreams' but it doesn't mean that we can use it
    // without making sure that it comes from props. To get 'fetchStreams' to props, 
    // we map it in the mapDispatchToProps.

    componentDidMount() {
        this.props.getStreamsFromDatabase();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link 
                        to={`/streams/edit/${stream.id}`} 
                        className="ui button primary"
                    >
                        EDIT
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative"
                    >
                        DELETE
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <h4>{stream.title}</h4>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    // Make a Create button
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button secondary inverted">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        // console.log(this.props.streams)
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // Object.values turns values of an object into an array.
    // But for streams state, we prefer to keep them as an object: it makes it
    // easier to update, add, delete...
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
// Map our function 'getStreamsFromDatabase' to the action creator.
// The action creator fetches all the streams from the db.

export default connect(mapStateToProps, { getStreamsFromDatabase: fetchStreams })(StreamList);