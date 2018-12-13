import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        // Programmatically return to the main page when clicking anywhere
        // BUT on the visible message area. Stop event propagating
        // when clicked anywhere on the white area so it doesn't continue 
        // to bubble up until it hits the parent div and dismisses the modal.

        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
        
        <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;