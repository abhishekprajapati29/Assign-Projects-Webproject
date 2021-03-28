import React, { Component } from "react";
import { Picker } from "emoji-mart";
import "./Compose.css";

class Emojis extends Component {
  state = {};
  addEmoji = (emoji) => {
    const text = `${emoji.native}`;
    this.props.handletext(text);
  };
  render() {
    return (
      <>
        <ul className="chat-messages">
          <Picker set="apple" onSelect={this.addEmoji} />
        </ul>
      </>
    );
  }
}

export default Emojis;
