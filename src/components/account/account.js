import React from "react";

class Account extends React.Component {

    state = {

    }

    static propTypes = {

    }

    static defaultPropTypes = {

    }

    constructor(props, context) {
        super(props, context);


    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    shortUsername = (username) => {
        if (username && username.length === 42) {
            //return username.slice(0, 20) + "...";
            return username.slice(0, 8) + "..." + username.slice(username.length - 7, username.length);
        } else {
            return username;
        }
    }

    render = () => {
        return (
            <div className="account">
                <div className="title centered">
                    Account
                </div>
                <div className="single-col">
                    <div className="col centered">
                        <div className="message">
                            Please login
                        </div>
                    </div>
                    <div className="col centered">
                        <button type="button" className="btn login">
                            Log In
                        </button>
                    </div>
                    <div className="col centered">
                        <div className="message">
                            or
                        </div>
                    </div>
                    <div className="col centered">
                        <button type="button" className="btn signup">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;