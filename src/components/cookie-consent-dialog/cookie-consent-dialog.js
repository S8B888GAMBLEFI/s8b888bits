import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, Link } from "gatsby-plugin-react-intl"
import * as styles from "./cookie-consent-dialog.module.scss";

class CookieConsentDialog extends React.Component {
    state = {
        
    }

    static propTypes = {
        handleCookieConsentVisible: PropTypes.func.isRequired
    }

    _isMounted = false;

    componentDidMount() {

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    handleToggleCookieConsentModal = () =>
    {
        this.props.handleCookieConsentVisible(true);
    }

    render() {
        return (
            <div className={ styles.cookie_wrapper }>
                
                <div className={ styles.cookie_popup }>

                    <div className={ styles.cookie_popup__inner }>
                        <div>
                            We use 
                            <Link to="/resources/privacy-policy/">
                                cookies
                            </Link>
                        </div>
                        <a href="#" aria-label="Close Cookie Dialog" className={styles.cookie_popup__close_icon}
                        onClick={ (event) => {                            
                            event.preventDefault();
                            this.handleToggleCookieConsentModal();
                            }
                        }
                        >
                            <svg className="close" viewBox="0 0 10 10" 
                            version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="4" x2="4" y2="0" stroke="white" 
                                strokeWidth="0.4" />
                                <line x1="0" y1="0" x2="4" y2="4" stroke="white" 
                                strokeWidth="0.4" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        
    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(CookieConsentDialog));

export default hoc;