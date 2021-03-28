import React, { Component } from "react";
import "./components/App.css";
import DashPost from "./components/posts.js";
import DashTeam from "./components/team.js";
import DashTodo from "./components/todos.js";
import DiaryList from "./components/diary.js";
import { connect } from "react-redux";
import axios from "axios";
import { Paper } from "@material-ui/core";

class Dashboard extends Component {
  state = {
    data: {
      diary: true,
      post: true,
      team: true,
    },
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/allidash/`).then((res) => {
        if (res.data.length > 0) {
          this.setState({
            data: res.data[0],
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
      axios.get(`https://${this.props.url}/allidash/`).then((res) => {
        if (res.data.length > 0) {
          this.setState({
            data: res.data[0],
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div style={{ width: "100%" }}>
          <Paper
            style={{
              flexWrap: "wrap",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <DashTodo />
          </Paper>
        </div>
        <div style={{ width: "100%" }}>
          {this.state.data.team ? (
            <Paper
              style={{
                flexWrap: "wrap",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <DashTeam />
            </Paper>
          ) : null}
        </div>
        <div style={{ width: "100%" }}>
          {this.state.data.diary ? (
            <Paper
              style={{
                flexWrap: "wrap",
                backgroundColor: "transparent",
                overflow: "visible",
                boxShadow: "none",
                padding: "30px 0",
              }}
            >
              <DiaryList />
            </Paper>
          ) : null}
        </div>

        <div style={{ width: "100%" }}>
          {this.state.data.post ? <DashPost /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
    username: state.username,
  };
};

export default connect(mapStateToProps)(Dashboard);
