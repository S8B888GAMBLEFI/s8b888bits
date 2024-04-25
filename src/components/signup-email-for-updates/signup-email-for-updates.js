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
      <div className="signup-email-for-updates">

        <div>
          Sign up for updates!
        </div>

        <div>
          Don't Miss Out! Substribe Now for
          <br />
          Exclusive Content and Special Offers.
        </div>

        <div>
          <form>
            <div className="input-container">
              <img alt="Email" src="/pictures/image-icons/icon-email.svg" loading="lazy" />
              <input type="email" placeholder="Enter email" />
              <button type="button" className="btn signup-email">Sign Up</button>

            </div>
          </form>
        </div>

      </div >
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