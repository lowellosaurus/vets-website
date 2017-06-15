import React from 'react';
import PropTypes from 'prop-types';

// Copied from src/js/login/containers/Main.jsx
import { handleLogin } from '../../common/helpers/login-helpers.js';

import Modal from './Modal';


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If the loggedIn status went from false to true, close the modal
    const wasLoggedIn = this.props.user.login.currentlyLoggedIn;
    const isLoggedIn = nextProps.user.login.currentlyLoggedIn;
    if (!wasLoggedIn && isLoggedIn) {
      this.props.onClose();
    }
  }

  // Copied from src/js/login/containers/Main.jsx
  componentWillUnmount() {
    if (this.loginUrlRequest && this.loginUrlRequest.abort) {
      this.loginUrlRequest.abort();
    }
  }

  getModalContents = (user) => {
    let contents = (<div>
      <div className="usa-grid">
        <h1>{this.props.title || 'Sign in'}</h1>
        <div className="usa-width-one-half">
          <button className="usa-button-primary full-width" onClick={this.handleLogin}>Sign in</button>
        </div>
        <div className="usa-width-one-third">
          <button className="usa-button-outline full-width" onClick={this.props.onClose}>Cancel</button>
        </div>
      </div>
    </div>);

    // Shouldn't in get here, but just in case
    if (user.login.currentlyLoggedIn) {
      contents = (<div>
        You are signed in as {user.profile.userFullName.first} {user.profile.userFullName.last}!
      </div>);
    }

    return contents;
  }

  handleLogin(e) {
    e.preventDefault(); // Don't try to submit the page
    const loginUrl = this.props.user.login.loginUrl;
    const onUpdateLoginUrl = this.props.onUpdateLoginUrl;
    this.loginUrlRequest = handleLogin(loginUrl, onUpdateLoginUrl);
    this.loginUrlRequest.then(() => this.props.onClose());
  }

  render() {
    return (
      <Modal
          cssClass="va-modal-large"
          contents={this.getModalContents(this.props.user)}
          onClose={this.props.onClose}
          visible={this.props.visible}/>
    );
  }
}

LoginModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  user: PropTypes.object.isRequired, // Taken from the redux store
  onUpdateLoginUrl: PropTypes.func.isRequired // Dispatches updateLogInUrl()
};


export default LoginModal;