import React from "react";
import "../css/ToggleProfileButton.css"
import HiddenToggleBox from "./HiddenToggleBox";
import downArrow from "../../admin/img/caret-down-fill.svg";




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
            <div className = "profileDot">
            <button className = "profileBtn" onClick={this.handleClick}>
                    <div className = "profilePic"/>
                    <img src={downArrow}/>
            </button>

            <HiddenToggleBox />
            </div>
          </div>
        )
    } else {
    return (
          <div>
              <div className = "profileDot">
            <button className = "profileBtn" onClick={this.handleClick}>
                <div className = "profilePic"/>
                <img src={downArrow}/>
            </button>
              </div>

          </div>
    )
    }
  }
}

