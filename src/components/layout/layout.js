import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import HeaderAnonymous from "../header/header";
import Footer from "../footer/footer"
import * as config from "../../configuration/Config";
import SubmenuDialog from "../submenu-dialog/submenu-dialog";
import { deleteSubmenuDialogStatusAction } from "../../redux/actions/submenuDialog/SubmenuDialogActions";
import "../../scss/styles/main.scss";
import {
  isIOS
} from "react-device-detect";

class Layout extends React.Component {
  state = {

    cookieConsent: { consent: false },

    loadGameWithUrlStatus: false,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,

    submenuDialogStatus: PropTypes.object,

    deleteSubmenuDialogStatusAction: PropTypes.func,
  }

  static defaultProps = {

  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    if (isIOS) {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 1000);
      if (window.addEventListener) {
        window.addEventListener("load", function () {
          setTimeout(function () {
            window.scrollTo(0, 0);
          }, 0);
        });
        window.addEventListener("orientationchange", function () {
          setTimeout(function () {
            window.scrollTo(0, 0);
          }, 0);
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if ((JSON.stringify(prevProps.submenuDialogStatus) !== JSON.stringify(this.props.submenuDialogStatus))) {
      this.setState({
        submenuDialogStatus: this.props.submenuDialogStatus,
      });
    }
  }

  render() {
    return (
      <React.StrictMode>
        <>
          {
            <HeaderAnonymous siteTitle={config.casinoDomainName} />
          }

          <div className="page-outer">
            <div className="wrapper">
              {this.props.children}
            </div>
          </div>

          <SubmenuDialog />

          <Footer casinoName={config.casinoName} />

        </>
      </React.StrictMode >
    );
  }
}

const mapStateToProps = state => {

  const { submenuDialogStatus } = state.submenuDialogStatus;

  return {

    submenuDialogStatus,

  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({

    deleteSubmenuDialogStatusAction,

  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Layout));

export default hoc;
