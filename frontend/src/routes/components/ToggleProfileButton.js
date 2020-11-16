import React from "react";
import "../../css/ToggleProfileButton.css"
import HiddenToggleBox from "./HiddenToggleBox";


export default class ToggleProfileButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    if(this.state.isToggleOn){
      return (
          <div>

            <button className = "profileDot" onClick={this.handleClick}></button>
            <HiddenToggleBox />

          </div>
        )
    } else {
    return (
          <div>
            <button className = "profileDot" onClick={this.handleClick}></button>
          </div>
    )
    }
  }
}

