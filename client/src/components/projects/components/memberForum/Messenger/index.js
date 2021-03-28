import React, { Component } from "react";
import MessageList from "../MessageList";
import "./Messenger.css";
import axios from "axios";
import { connect } from "react-redux";
import img from "./team.png";
import img1 from "./team1.png";
import { Button, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

function MemberMessengers(props) {
  const classes = useStyles();
  return (
    <div>
      {props.data.teamName ? (
        <>
          {props.data.teamName !== "default_team_name" ? (
            <div className="messenger">
              <Paper style={{ width: "100%" }}>
                <MessageList
                  handleUsers={props.handleUsers}
                  loading={props.loading}
                  project_id={props.project.id}
                  message={props.message}
                />
              </Paper>
            </div>
          ) : (
            <>
              <Paper
                style={{
                  height: "100%",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              >
                <Card style={{ width: "100%" }}>
                  <div className={classes.sectionDesktop}>
                    <CardActionArea>
                      <img
                        alt="a"
                        style={{ height: "1024px", width: "100%" }}
                        src={img}
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        href="/userlist"
                        size="large"
                        color="primary"
                        style={{ margin: "0 auto" }}
                      >
                        Create
                      </Button>
                    </CardActions>
                  </div>
                  <div className={classes.sectionMobile}>
                    <CardActionArea>
                      <img
                        alt="a"
                        style={{ height: "800px", width: "100%" }}
                        src={img1}
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        href="/userlist"
                        size="large"
                        color="primary"
                        style={{ margin: "0 auto" }}
                      >
                        Create
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </Paper>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}

class MemberMessenger extends Component {
  state = {
    data: {},
    users: {},
    loading: true,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          data: res.data.profile,
          loading: false,
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          data: res.data.profile,
          loading: false,
        });
      });
    }
  }
  handleUsers = (data) => {
    this.setState({
      users: data,
    });
  };

  render() {
    return (
      <MemberMessengers
        data={this.state.data}
        project={this.props.data}
        loading={this.state.loading}
        handleUsers={this.handleUsers}
        message = {this.props.message}
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

export default connect(mapStateToProps)(MemberMessenger);
