import React, { Component } from "react";
import FileAdd from "./profiles";

function Profiles(props) {
  return <FileAdd />;
}

class Profile extends Component {
  render() {
    return <Profiles />;
  }
}

export default Profile;
