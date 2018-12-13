import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends React.Component {

    // Fetch a stream independently of any other routes.
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        console.log('inside componetDidMount: ', this.props.match.params.id)
    }

    renderActions() {
        const { id } = this.props.match.params;

        // React.Fragment is a way of avoiding extraneous divs that can 
        // mess up with styling. Fragment nodes are invisible to DOM.

        // onClick={this.props.deleteStream} --> passing a reference to a function, but no id.
        // onClick={this.props.deleteStream(id)} --> stream will be deleted when rendered
        // This is why passing an arrow function.

        return (
            <React.Fragment>
            
                <button 
                    onClick={() => this.props.deleteStream(id)}
                    className="ui button negative">Delete
                </button>

                <Link 
                    to="/" 
                    className="ui button"
                >
                    Cancel
                </Link>

            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }
        console.log('inside renderContent: ', this.props.stream)
        return `Are you sure you want to delete the stream with title: "${this.props.stream.title}"?`
    }

    render() {
        return (
                <Modal 
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);