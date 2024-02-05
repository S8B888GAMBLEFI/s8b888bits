import React from "react";
import moment from "moment-timezone";

class Clock extends React.Component {

  state = {
    currentCasinoTime: moment().tz("Europe/Berlin").format("HH:mm z")
  }

  static propTypes = {
    
  }

  _isMounted = false;

  componentDidMount(){
    this._isMounted = true;
    window.currentCasinoTimeInterval = setInterval( () => {
        if(this._isMounted){
          this.setState({
            currentCasinoTime: moment().tz("Europe/Berlin").format("HH:mm z")
          });
        }
    }, 5000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(window.currentCasinoTimeInterval);
  }

  render(){
    return(        
        this.state.currentCasinoTime        
    );
  }
}

export default Clock;