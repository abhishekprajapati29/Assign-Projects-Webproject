import React, { Component } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { connect } from "react-redux";
import axios from "axios";

import "./ConversationList.css";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function ConversationLists(props) {
  const classes = useStyle();

  return (
    <>
      <div className={classes.sectionDesktop}>
        <div className="conversation-list">
          <Toolbar
            title="Team Members"
            leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
            rightItems={[
              <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
            ]}
          />
          <ConversationSearch handleDataChange={props.handleDataChange} />
          <ConversationListItem users={props.users} data={props.data} />
        </div>
      </div>
      <div className={classes.sectionMobile} style={{ width: "100%" }}>
        <div className="conversation-list1">
          <ConversationListItem users={props.users} data={props.data} />
        </div>
      </div>
    </>
  );
}

class ConversationList extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    if (this.props.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        if (prof.teamName !== "default_team_name") {
          axios
            .get(
              `https://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}`
            )
            .then((res) => {
              this.setState({
                data: res.data,
              });
            });
        }
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        if (prof.teamName !== "default_team_name") {
          axios
            .get(
              `https://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}`
            )
            .then((res) => {
              this.setState({
                data: res.data,
              });
            });
        }
      });
    }
  }
  handleDataChange = (data) => {
    this.setState({
      data: data,
    });
  };

  render() {
    return (
      <ConversationLists
        users={this.props.users}
        data={this.state.data}
        handleDataChange={this.handleDataChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};
export default connect(mapStateToProps)(ConversationList);
