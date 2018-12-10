import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {

    // Turn the component into class because we want to fetch all the streams
    // once only, when the component mounts, and not re-render the list all the time.
    // Only classes have lifecycle methods. 

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        // console.log(this.props.streams)
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    // Object.values turns values of an object into an array.
    // But for streams state, we prefer to keep them as an object: it makes it
    // easier to update, add, delete...
    return {streams: Object.values(state.streams)}
}

const mapDispatchToProps = { fetchStreams }

export default connect(mapStateToProps, mapDispatchToProps )(StreamList);