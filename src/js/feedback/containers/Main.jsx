import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { revealForm, setFormValues, sendFeedback, clearError } from '../actions';
import DefaultView from '../components/DefaultView';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackSubmitted from '../components/FeedbackSubmitted';

function Main(props) {
  let content = null;

  if (props.feedbackReceived) {
    content = <FeedbackSubmitted shouldSendResponse={props.shouldSendResponse}/>;
  } else if (props.formIsVisible) {
    content = <FeedbackForm {...props}/>;
  } else {
    content = <DefaultView revealForm={props.revealForm}/>;
  }

  return (
    <div className="feedback-widget">
      <a className="sr-only" href="#feedback-tool" name="feedback-tool">Give feedback on this page</a>
      <div className="row">{content}</div>
    </div>
  );
}

const mapStateToProps = (state) => state.feedback;

const mapDispatchToProps = {
  setFormValues,
  revealForm,
  sendFeedback,
  clearError
};

Main.propTypes = {
  formValues: PropTypes.object.isRequired,
  requestPending: PropTypes.bool,
  feedbackReceived: PropTypes.bool,
  shouldSendResponse: PropTypes.bool,
  setFormValues: PropTypes.func.isRequired,
  revealForm: PropTypes.func.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

export { Main };
