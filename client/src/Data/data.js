import React, { Component } from "react";
import Image from "./components/Images/image";
import { connect } from "react-redux";

function ImageBlocks(props) {
  return <Image />;
}

class ImageBlock extends Component {
  render() {
    return <ImageBlocks />;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(ImageBlock);
