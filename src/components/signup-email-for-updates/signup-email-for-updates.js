import { injectIntl } from "gatsby-plugin-react-intl";
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SignupEmailForUpdates extends React.Component {

  state = {
  }

  static propTypes = {
    siteTitle: PropTypes.string,
    casinoName: PropTypes.string,
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    return (
      <div className="signup-email-for-updates container">

        <div className="row">
          <div className="col-6 col-md-6 col-xs-6">
            <p className="title">
              Sign up for updates
            </p>
            <p className="content">
              Don't Miss Out! Subscribe Now for Exclusive Content and Special Offers.
            </p>
          </div>
          <div className="col-6 col-md-6 col-xs-6">
            <form>
              <div className="input-container">
                <img alt="Email" src="/pictures/image-icons/icon-email.svg" loading="lazy" />
                <input type="email" placeholder="Enter email" />
                <button type="button" className="btn signup-email">Sign Up</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {

  return {

  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SignupEmailForUpdates));

export default hoc;