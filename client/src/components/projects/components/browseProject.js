import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ReactHtmlParser from "react-html-parser";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loading from "../../../loading.js";
import io from "socket.io-client";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: "37px",
    fontSize: "1.5rem",
    flex: 1,
  },
  iconButton: {
    padding: 10,
    marginRight: "13px",
  },
  root1: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 40px",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
    margin: "0px",
  },
  root3: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textTransform: "capitalize",
  },
  heading: {
    margin: "33px",
    height: "fit-content",
    textAlignLast: "center",
    fontSize: "xx-large",
    fontStyle: "italic",
    background: "aqua",
  },
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Browse(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen = (val) => {
    props.handleDialogData(val);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleInvoiceSend = (event) => {
    props.handleInvoiceSend(event);
    setOpen3(false);
  };
  return (
    <div>
      {!props.loading ? (
        <>
          <Paper
            component="form"
            className={classes.root}
            style={{ height: "64px", borderRadius: "87px", margin: "40px" }}
          >
            <InputBase
              className={classes.input}
              placeholder="Search Project"
              value={props.search}
              onChange={props.handleSearch}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Paper
            elevation={3}
            className={classes.root1}
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
          >
            <Grid container spacing={3}>
              {props.data.map((val) => (
                <Grid item xs={12} sm={4}>
                  <Card className={classes.root3}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          className={classes.avatar}
                          src={
                            props.team.filter((data) => {
                              return data.username === val.username;
                            })[0].image.image
                          }
                        />
                      }
                      title={`Owner:- ${val.username}`}
                      subheader={`Team Name:- ${
                        props.team.filter((data) => {
                          return data.username === val.username;
                        })[0].profile.teamName
                      }`}
                    />
                    <CardContent>
                      <div style={{ borderRadius: "5px" }}>
                        <Table
                          aria-label="sticky table"
                          style={{
                            background: "lightgrey",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                        >
                          <TableBody>
                            <TableRow key="1">
                              <TableCell component="th" scope="row">
                                Project Name
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ textTransform: "capitalize" }}
                              >
                                {val.project_name}
                              </TableCell>
                            </TableRow>
                            <TableRow key="1">
                              <TableCell component="th" scope="row">
                                Start Date
                              </TableCell>
                              <TableCell align="right">
                                {val.start_date}
                              </TableCell>
                            </TableRow>
                            <TableRow key="1">
                              <TableCell component="th" scope="row">
                                DeadLine
                              </TableCell>
                              <TableCell align="right">
                                {val.end_date}
                              </TableCell>
                            </TableRow>
                            <TableRow key="1">
                              <TableCell component="th" scope="row">
                                Main Application
                              </TableCell>
                              <TableCell align="right">
                                {val.main_application}
                              </TableCell>
                            </TableRow>
                            <TableRow key="1">
                              <TableCell component="th" scope="row">
                                Project Type
                              </TableCell>
                              {val.preferenece === "Team" ? (
                                <TableCell align="right">Team</TableCell>
                              ) : (
                                <TableCell align="right">Private</TableCell>
                              )}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ margin: "auto" }}
                        onClick={() => handleClickOpen(val)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <>
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <>
                  <div className={classes.sectionDesktop}>
                    <AppBar className={classes.appBar}>
                      <Toolbar>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClose}
                          aria-label="close"
                        >
                          <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          {`Owner:- ${props.dialog.username}`}
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                          {`Project Name:- ${props.dialog.project_name}`}
                        </Typography>

                        <Button
                          autoFocus
                          color="inherit"
                          onClick={handleClickOpen3}
                          style={{
                            boxShadow:
                              "0px 0px 13px 5px rgba(246, 242, 242, 0.75)",
                            backgroundColor: "black",
                          }}
                        >
                          Contribute to Project
                        </Button>
                      </Toolbar>
                    </AppBar>
                  </div>
                  <div className={classes.sectionMobile}>
                    <AppBar className={classes.appBar}>
                      <Toolbar style={{ display: "grid" }}>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClose}
                          aria-label="close"
                        >
                          <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          {`Owner:- ${props.dialog.username}`}
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                          {`Project Name:- ${props.dialog.project_name}`}
                        </Typography>

                        <Button
                          autoFocus
                          color="inherit"
                          onClick={handleClickOpen3}
                          style={{
                            boxShadow:
                              "0px 0px 13px 5px rgba(246, 242, 242, 0.75)",
                            backgroundColor: "black",
                          }}
                        >
                          Contribute to Project
                        </Button>
                      </Toolbar>
                    </AppBar>
                  </div>
                </>
                <Paper className={classes.heading}>Project Overview</Paper>
                <Typography style={{ margin: "35px" }}>
                  {ReactHtmlParser(props.dialog.project_description)}
                </Typography>

                <Dialog
                  open={open3}
                  onClose={handleClose3}
                  aria-labelledby="form-dialog-title1"
                >
                  <DialogTitle
                    id="form-dialog-title1"
                    style={{
                      boxShadow:
                        "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
                      background: "black",
                      overflowX: "auto",
                      color: "aliceblue",
                    }}
                  >
                    Invoice
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      style={{ marginTop: "10px", fontSize: "large" }}
                    >
                      Want to Join the Project To contribute the Time and
                      Knowlege to make this project Successfull
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Message"
                      type="text"
                      value={props.invoive}
                      onChange={(event) => props.handleInvoice(event)}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={(event) => handleInvoiceSend(event)}
                      color="primary"
                    >
                      Send
                    </Button>
                  </DialogActions>
                </Dialog>
              </Dialog>
            </>
          </Paper>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

class BrowseProject extends Component {
  state = {
    teamList: [],
    AllProject: [],
    data: [],
    dialog: {},
    search: "",
    invoice: "",
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
        const teamName = res.data.profile.teamName;
        axios
          .get(
            `https://${this.props.url}/userprofileList/?profile__teamName=${teamName}`
          )
          .then((res1) => {
            this.setState({
              teamList: res1.data.filter((data) => {
                return data.username !== this.props.username;
              }),
            });
          });
        axios.get(`https://${this.props.url}/create-all-user/`).then((res2) => {
          console.log(res2.data);
          this.setState({
            AllProject: res2.data,
          });
          var data = [];
          this.state.teamList.forEach((val) => {
            data.concat(
              this.state.AllProject.filter((filt) => {
                return (
                  filt.username === val.username && filt.preferenece === "Team"
                );
              })
            );
          });

          this.setState({
            data: data,
            loading: false,
          });
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
        const teamName = res.data.profile.teamName;
        axios
          .get(
            `https://${this.props.url}/userprofileList/?profile__teamName=${teamName}`
          )
          .then((res1) => {
            this.setState({
              teamList: res1.data.filter((data) => {
                return data.username !== this.props.username;
              }),
            });
          });
        axios.get(`https://${this.props.url}/create-all-user/`).then((res2) => {
          this.setState({
            AllProject: res2.data,
          });
          var data = [];
          this.state.teamList.forEach((val) => {
            data = data.concat(
              this.state.AllProject.filter((filt) => {
                return (
                  filt.username === val.username && filt.preferenece === "Team"
                );
              })
            );
          });
          this.setState({
            data: data,
            loading: false,
          });
        });
      });
    }
  }

  handleDialogData = (val) => {
    this.setState({
      dialog: val,
    });
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
    this.handleData();
  };

  handleInvoice = (event) => {
    this.setState({
      invoice: event.target.value,
    });
  };

  handleData = () => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      const teamName = res.data.profile.teamName;
      axios
        .get(
          `https://${this.props.url}/userprofileList/?profile__teamName=${teamName}`
        )
        .then((res1) => {
          this.setState({
            teamList: res1.data.filter((data) => {
              return data.username !== this.props.username;
            }),
          });
        });
      axios.get(`https://${this.props.url}/create-all/`).then((res2) => {
        this.setState({
          AllProject: res2.data,
        });
        var data = [];
        this.state.teamList.forEach((val) => {
          data = data.concat(
            this.state.AllProject.filter((filt) => {
              return (
                filt.username === val.username && filt.preferenece === "Team"
              );
            })
          );
        });
        this.setState({
          data: data.filter((data1) => {
            return (
              data1.username
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              data1.project_name
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          }),
        });
      });
    });
  };

  handleInvoiceSend = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("user", this.state.dialog.user_id);
    form_data.append("requested_by", this.props.username);
    form_data.append(
      "invoice",
      `${this.props.username} want to join the project name ${this.state.dialog.project_name}`
    );
    form_data.append("message", this.state.invoice);
    form_data.append("project_name_to_join", this.state.dialog.project_name);
    form_data.append("project_number", this.state.dialog.id);
    const url_post = `https://${this.props.url}/list-project-invoice/`;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .post(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        var socket = io("http://192.168.0.114:3001");
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        console.log(res.data.user, typeof res.data.user);
        axios.get(`https://${this.props.url}/userprofile/`).then((res1) => {
          const prof = res1.data[0];
          const name = prof.user;
          const room = prof.teamName;
          const message = res.data;

          axios
            .get(
              `https://${this.props.url}/userprofileList/?id=${res.data.user}`
            )
            .then((res2) => {
              const prod = res2.data[0];
              const sendTo = prod.username;
              socket.emit("invoiceSent", { name, room, sendTo, message });
            });
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Browse
        loading={this.state.loading}
        data={this.state.data}
        team={this.state.teamList}
        handleInvoiceSend={this.handleInvoiceSend}
        search={this.state.search}
        handleSearch={this.handleSearch}
        dialog={this.state.dialog}
        username={this.props.username}
        handleDialogData={this.handleDialogData}
        handleInvoice={this.handleInvoice}
        invoice={this.state.invoice}
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

export default connect(mapStateToProps)(BrowseProject);
