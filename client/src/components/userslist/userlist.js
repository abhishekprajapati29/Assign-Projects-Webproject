import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { connect } from "react-redux";
import UsersTable from "./usertable.js";
import UsersToolbar from "./usertoolbar.js";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "60px 20px 0 20px",
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

function UserLists(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UsersToolbar
        handleDataChange={props.handleDataChange}
        handleCurrentUserInvoice={props.handleCurrentUserInvoice}
        handleInvoice={props.handleInvoice}
        teamNameChange={props.teamNameChange}
        handleDelete={props.handleDelete}
        data={props.data}
        users={props.data.userlist}
      />
      <div className={classes.content}>
        <UsersTable
          url={props.url}
          loading={props.loading}
          fulluserdata={props.fulluserdata}
          handlerequestdata={props.handlerequestdata}
          invoice_data={props.invoice_data}
          token={props.token}
          data={props.data}
          renderRedirect={props.renderRedirect}
          setRedirect={props.setRedirect}
          teamName={props.data.teamName}
          users={props.data.userlist}
        />
      </div>
    </div>
  );
}

class UserList extends Component {
  state = {
    userlist: [],
    teamName: null,
    redirect: false,
    id: "",
    loading: true,
    user_id: -1,
    invoice: [],
    currentuserInvoice: [],
    fulluserdata: {},
    invoice_data: [],
  };

  setRedirect = (data) => {
    this.setState({
      redirect: true,
      id: data,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/team-member-profile/${this.state.id}/`} />;
    }
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      var socket = io("https://live-data-manager.herokuapp.com");
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };

      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        this.setState({
          name: prof.user,
          room: prof.teamName,
        });
        socket.emit(
          "join",
          { name: prof.user, room: prof.teamName },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );

        return () => {
          if (!prof.user & !prof.teamName) {
            socket.emit("disconnect");

            socket.off();
          }
        };
      });
      socket.on("addUser", ({ name, room, sendTo, message }) => {
        this.setState((previousState) => ({
          currentuserInvoice: [...previousState.currentuserInvoice, message],
        }));
      });
      socket.on("acceptUser", ({ name, room, sendTo, message }) => {
        const team = message.team[0];
        const userdata = message.userdata[0];
        this.setState({
          teamName: team.teamName,
        });
        this.setState((previousState) => ({
          userlist: [...previousState.userlist, userdata],
        }));
      });

      socket.on("acceptOther", ({ name, room, message }) => {
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
          const data = res.data[0];
          if (room === data.teamName && name !== data.user) {
            this.setState({
              teamName: room,
            });
            this.setState({
              userlist: message,
            });
          }
        });
      });
      socket.on("acceptUserAgain", ({ name, room, message }) => {
        const userdata = message.userdata[0];
        this.setState((previousState) => ({
          userlist: [...previousState.userlist, userdata],
        }));
      });

      socket.on("acceptUsertoback", ({ name, room, sendTo, message }) => {
        if (sendTo === this.props.username) {
          const team = message[0];
          this.setState({
            teamName: team.teamName,
          });
          this.setState({
            userlist: message,
          });
        }
      });

      socket.on("userLeave", ({ name, room, message }) => {
        if (name !== this.props.username) {
          this.setState({
            userlist: message,
          });
        }
      });
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        if (prof.teamName !== "default_team_name") {
          this.setState({
            teamName: prof.teamName,
          });
          axios
            .get(
              `https://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}`
            )
            .then((res) => {
              this.setState({
                userlist: res.data,
                loading: false,
              });
            });
        } else {
          this.setState({
            teamName: prof.teamName,
          });
          axios
            .get(`https://${this.props.url}/userprofileList/`)
            .then((res) => {
              this.setState({
                userlist: res.data.filter((data) => {
                  return data.profile.teamName !== "default_team_name";
                }),
                loading: false,
              });
            });
        }
      });
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`http://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          fulluserdata: res.data,
        });
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios.get(`http://${this.props.url}/invoice/`).then((res1) => {
          this.setState({
            user_id: res.data.id,
            invoice_data: res1.data,
            teamName: res.data.profile.teamName,
            invoice: res1.data.filter((data) => {
              return data.requested_by === res.data.id;
            }),
            currentuserInvoice: res1.data.filter((data) => {
              return data.user === res.data.id;
            }),
          });
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      var socket = io("https://live-data-manager.herokuapp.com");
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };

      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        this.setState({
          name: prof.user,
          room: prof.teamName,
        });
        socket.emit(
          "join",
          { name: prof.user, room: prof.teamName },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );

        return () => {
          if (!prof.user & !prof.teamName) {
            socket.emit("disconnect");

            socket.off();
          }
        };
      });
      socket.on("addUser", ({ name, room, sendTo, message }) => {
        this.setState((previousState) => ({
          currentuserInvoice: [...previousState.currentuserInvoice, message],
        }));
      });
      socket.on("acceptUser", ({ name, room, sendTo, message }) => {
        const team = message.team[0];
        const userdata = message.userdata[0];
        this.setState({
          teamName: team.teamName,
        });
        this.setState((previousState) => ({
          userlist: [...previousState.userlist, userdata],
        }));
      });
      socket.on("userLeave", ({ name, room, message }) => {
        if (name !== this.props.username) {
          this.setState({
            userlist: message,
          });
        }
      });
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        if (prof.teamName !== "default_team_name") {
          this.setState({
            teamName: prof.teamName,
          });
          axios
            .get(
              `http://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}`
            )
            .then((res) => {
              this.setState({
                userlist: res.data,
                loading: false,
              });
            });
        } else {
          this.setState({
            teamName: prof.teamName,
          });
          axios.get(`http://${this.props.url}/userprofileList/`).then((res) => {
            this.setState({
              userlist: res.data.filter((data) => {
                return data.profile.teamName !== "default_team_name";
              }),
              loading: false,
            });
          });
        }
      });
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`http://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          fulluserdata: res.data,
        });
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + newProps.token,
        };
        axios.get(`http://${this.props.url}/invoice/`).then((res1) => {
          this.setState({
            user_id: res.data.id,
            invoice_data: res1.data,
            teamName: res.data.profile.teamName,
            invoice: res1.data.filter((data) => {
              return data.requested_by === res.data.id;
            }),
            currentuserInvoice: res1.data.filter((data) => {
              return data.user === res.data.id;
            }),
          });
        });
      });
    }
  }
  handleDataChange = (data) => {
    this.setState({
      userlist: data,
    });
  };

  teamNameChange = (name) => {
    this.setState({
      teamName: name,
    });
  };

  handleInvoice = (data) => {
    this.setState({
      invoice: data.filter((data1) => {
        return data1.requested_by === Number(this.state.user_id);
      }),
    });
  };

  handleCurrentUserInvoice = (data) => {
    this.setState({
      currentuserInvoice: data,
    });
  };

  handleDelete = (event, id) => {
    axios.delete(`https://${this.props.url}/invoice/${id}/`);
    this.setState({
      currentuserInvoice: this.state.currentuserInvoice.filter((fil) => {
        return fil.id !== id;
      }),
    });
  };

  handlerequestdata = (data) => {

    const remove_data = this.state.userlist.filter((filt) => {
      return filt.id === data.user;
    })[0];
    this.setState({
      userlist: this.state.userlist.filter((filt) => {
        return filt.id !== data.user;
      }),
    });
    this.setState((previousState) => ({
      userlist: [remove_data, ...previousState.userlist],
      invoice_data: [...previousState.invoice_data, data],
    }));
  };

  render() {
    return (
      <UserLists
        loading={this.state.loading}
        fulluserdata={this.state.fulluserdata}
        handlerequestdata={this.handlerequestdata}
        invoice_data={this.state.invoice_data}
        token={this.props.token}
        handleCurrentUserInvoice={this.handleCurrentUserInvoice}
        handleInvoice={this.handleInvoice}
        teamNameChange={this.teamNameChange}
        handleDelete={this.handleDelete}
        url={this.props.url}
        renderRedirect={this.renderRedirect}
        setRedirect={this.setRedirect}
        data={this.state}
        handleDataChange={this.handleDataChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(UserList);
