import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"

class LoggedInSubmenu extends React.Component {

    state = {
        loggedInSubmenuDialogStatus: false,


    }

    static propTypes = {
        loggedInSubmenuDialogStatus: PropTypes.object
    }

    refModalLoggedInSubmenuDialog = null;

    constructor(props, context) {
        super(props, context);

        this.refModalLoggedInSubmenuDialog = React.createRef();
    }

    componentDidMount() {
        this.setState({
            loggedInSubmenuDialogStatus: this.props.loggedInSubmenuDialogStatus
        })
    }

    render = () => {
        return (
            <div className={this.state?.registrationDialogStatus?.status && this.state.registrationDialogStatus.status === "OPEN" ? "modal-outer visible" : "modal-outer"}
                id="register"
                ref={this.refModalLoggedInSubmenuDialog}
            >

            </div>
        );
    }
}

const mapStateToProps = state => {

    const { loggedInSubmenuDialogStatus } = state.loggedInSubmenuDialogStatus;

    return {
        loggedInSubmenuDialogStatus
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoggedInSubmenu));

export default hoc;