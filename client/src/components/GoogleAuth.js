import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        // 'window.' is needed to make sure that the 'gapi' variable'
        // is on the window scope.

        // Load OAuth2 library
        // Initialize client with credentials and specify scope
        // getAuthInstance() returns a GoogleAuth object with methods
        // One of the methods can check if the client is signed in: isSignedIn.get()
        // We'll set component's state to the boolean return of isSignedIn
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '610007872408-mevpictn099v31j8ktu3ipvt18dhtj68.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                // listen() passes true to the callback when the user signs in, 
                // and false when the user signs out.
                this.auth.isSignedIn.listen(this.onAuthChange);
                // console.log(this.auth.currentUser.get().getBasicProfile().getGivenName())
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    signInHandler = () => {
        this.auth.signIn();
    }

    signOutHandler = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button 
                    className="ui black google button"
                    onClick={this.signOutHandler}
                >
                    <i className="google icon" />
                    Hello {this.auth.currentUser.get().getBasicProfile().getGivenName()}
                </button>
            );
        } 
        return (
            <button 
                className="ui red google button"
                onClick={this.signInHandler}
            >
                <i className="google icon" />
                Sign in with Google
                </button>
        );
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth);