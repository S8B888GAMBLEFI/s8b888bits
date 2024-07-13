import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl";
import { saveSignupEmailService } from "../../redux/services/ApiService";
class SignupEmailForUpdates extends React.Component {

  state = {
  }

  static propTypes = {
    siteTitle: PropTypes.string,
    casinoName: PropTypes.string,
  }

  _isMounted = false;
  refEmail = null;

  constructor(props, context) {
    super(props, context);

    this.refEmail = React.createRef();
  }

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
              {/*
              <img alt="Email" src="/pictures/image-icons/icon-email.svg" loading="lazy" />
              */}
              <input type="email" placeholder="Enter email" ref={this.refEmail} />
              <button type="button" className="btn signup-email" onClick={(event) => {
                event.preventDefault();
                if (this.refEmail.current.value !== "") {
                  saveSignupEmailService({ email: this.refEmail.current.value })
                    .then((response) => {
                      if (response === "1") {
                        this.refEmail.current.value = '';
                        this.refEmail.value = '';
                      }
                    })
                    .catch((reason) => {

                    });
                }
              }}>Sign Up</button>

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