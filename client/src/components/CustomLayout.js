import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Plan_detail from "../plan-detail.js";
import Fab from "@material-ui/core/Fab";
import { loadCSS } from "fg-loadcss";
import { authLogout } from "../store/actions/auth";
import { Redirect } from "react-router";
import axios from "axios";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import io from "socket.io-client";
import NavBar from "./Navbar.js";

const drawerWidth = 230;
const drawerWidth1 = 300;
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  ac: {
    padding: theme.spacing(1),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  right: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: "64px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentClose: {
    height: "100%",
    paddingLeft: "73px",
    paddingTop: "45px",
    transition: theme.transitions.create(["paddingRight", "padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content1: {
    height: "100%",
  },
  list: {
    width: "300px",
  },
  root: {
    margin: "25px",

    paddingLeft: "0",
    marginLeft: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    background: "#3f51b5",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  webkitScrollbar: {
    width: "10px",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  drawer1: {
    width: drawerWidth1,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen1: {
    width: drawerWidth1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#3f51b5",
  },
  drawerClose1: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#3f51b5",
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  appBarShift1: {
    marginLeft: drawerWidth1,
    width: `calc(100% - ${drawerWidth1}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomLayouts = (props) => {
  const classes = useStyles();
  const [open12, setOpen12] = React.useState(false);

  const handleClickOpen12 = () => {
    setOpen12(true);
  };

  const handleClose12 = () => {
    setOpen12(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    if (props.token) {
      window.location.assign("/");
      props.logout();
    }
  };

  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const [state, setState] = React.useState({
    right: false,
  });

  const [state1, setState1] = React.useState({
    right: false,
  });

  const [state2, setState2] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const toggleDrawer1 = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState1({ ...state1, [side]: open });
  };

  const toggleDrawer2 = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState2({ ...state2, [side]: open });
  };

  const [open7, setOpen7] = React.useState(false);

  const handleClickOpen7 = () => {
    setOpen7(true);
  };

  const handleClose7 = () => {
    setOpen7(false);
  };

  const [open8, setOpen8] = React.useState(false);

  const handleClickOpen8 = () => {
    setOpen8(true);
  };

  const handleClose8 = () => {
    setOpen8(false);
  };

  const [open9, setOpen9] = React.useState(false);

  const handleClickOpen9 = () => {
    setOpen9(true);
  };

  const handleClose9 = () => {
    setOpen9(false);
  };

  const [SideBar, setSideBar] = React.useState(false);

  const handleSideBarOpen = () => {
    setSideBar(true);
  };

  const handleSideBarClose = () => {
    setSideBar(false);
  };

  const handleAgree8 = () => {
    setOpen8(false);
    props.handleAgree8();
  };

  const handleAgree9 = () => {
    setOpen9(false);
    props.handleAgree9();
  };

  const handleAgree7 = () => {
    setOpen7(false);
    props.handleAgree7();
  };

  const sideListInvoice = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(side, false)}
    >
      <h1
        style={{
          fontSize: "x-large",
          fontWeight: 700,
          fontFamily: "none",
          textAlignLast: "center",
        }}
      >
        <img
          alt="invites"
          src="https://img.icons8.com/fluent/24/000000/invite.png"
        />
        Invite
      </h1>
      <hr style={{ width: "90%" }} />
      {props.invoice.reverse().map((invo) => (
        <Card className={classes.root}>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            style={{
              background: "rgba(0,0,0,.08)",
              padding: "7px 12px",
              fontSize: "20px",
              color: "grey",
              height: "43px",
            }}
            avatar={
              <img
                alt="invite"
                src="zzz"
                style={{
                  background: "unset",
                  color: "#7467ef",
                  fontSize: "1.3rem",
                  marginTop: "5px",
                  marginRight: "4px",
                }}
              />
            }
            title="Invites"
          />
          <CardContent style={{ padding: "2px 13px" }}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={{ textTransform: "capitalize" }}
            >
              {invo.invoice}
            </Typography>
            <Typography variant="body2" component="p">
              {invo.message}
            </Typography>
          </CardContent>
          <hr style={{ width: "90%" }} />
          <CardActions disableSpacing style={{ padding: "4px" }}>
            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: "auto" }}
              onClick={() => props.handleCancelInvoice(invo)}
            >
              Cancel
            </Button>
            {
              // data = (props.projects.filter(res=>{
              //   return res.id === invo.project_number
              // }))[0]

              true ? (
                true ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ margin: "auto" }}
                    onClick={(event) => props.handleAcceptInvoice(event, invo)}
                  >
                    Accept
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ margin: "auto" }}
                      onClick={handleClickOpen12}
                    >
                      Accept
                    </Button>
                    <Dialog
                      open={open12}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose12}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle id="alert-dialog-slide-title">
                        Alert
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          You Limit For Accepting Project Member is Full,
                          Upgrade to add more.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          href="/plan"
                          onClick={handleClose12}
                          style={{ color: "aliceblue", background: "black" }}
                        >
                          Upgrade
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )
              ) : null
            }
          </CardActions>
        </Card>
      ))}
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      <div></div>
      {props.invoice.length > 0 ? (
        <Button
          onClick={handleClickOpen9}
          style={{ width: "100%", background: "aquamarine" }}
        >
          Clear All
        </Button>
      ) : (
        <Typography style={{ textAlignLast: "center", fontSize: "x-large" }}>
          No Invites
        </Typography>
      )}
      <Dialog
        open={open9}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose9}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Delete All Invoice ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Sure.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose9} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleAgree9()} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const sideListMessage = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer1(side, false)}
    >
      <h1
        style={{
          fontSize: "x-large",
          fontWeight: 700,
          fontFamily: "none",
          textAlignLast: "center",
        }}
      >
        <img
          alt="notification"
          src="https://img.icons8.com/flat_round/24/000000/speech-bubble.png"
        />
        Messages
      </h1>
      <hr style={{ width: "90%" }} />
      {props.message.reverse().map((invo) => (
        <Card className={classes.root}>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            style={{
              background: "rgba(0,0,0,.08)",
              padding: "7px 12px",
              fontSize: "20px",
              color: "grey",
              height: "43px",
            }}
            avatar={
              <MessageIcon
                style={{
                  background: "unset",
                  color: "#7467ef",
                  fontSize: "1.3rem",
                  marginTop: "5px",
                  marginRight: "4px",
                }}
              />
            }
            action={
              <Fab
                aria-label="like"
                style={{ height: "0px", width: "36px", margin: "5px" }}
                onClick={(e) => props.handleDeleteMessage(e, invo)}
              >
                <HighlightOffIcon />
              </Fab>
            }
            title="Invites"
          />
          <CardContent style={{ padding: "2px 13px" }}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={{ textTransform: "capitalize" }}
            >
              {invo.message}
            </Typography>
            <Typography variant="body2" component="p">
              {`Message By:- ${invo.message_by}`}
            </Typography>
          </CardContent>
          {/* <hr style={{width: '90%'}}/>
        <CardActions disableSpacing style={{padding: '4px'}}>
          <Button variant="outlined" color="secondary" style={{margin: 'auto'}} onClick={()=>props.handleCancelInvoice(invo)} >
                Cancel
            </Button>
            <Button variant="outlined" color="primary" style={{margin: 'auto'}} onClick={(event)=>props.handleAcceptInvoice(event, invo)}>
                Accept
            </Button>
        </CardActions> */}
        </Card>
      ))}
      {props.message.length > 0 ? (
        <Button
          onClick={handleClickOpen8}
          style={{ width: "100%", background: "aquamarine" }}
        >
          Clear All
        </Button>
      ) : (
        <Typography style={{ textAlignLast: "center", fontSize: "x-large" }}>
          No Messages
        </Typography>
      )}
      <Dialog
        open={open8}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose8}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Delete All Messages ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Sure.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose8} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleAgree8()} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const sideListNotification = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer2(side, false)}
    >
      <h1
        style={{
          fontSize: "x-large",
          fontWeight: 700,
          fontFamily: "none",
          textAlignLast: "center",
        }}
      >
        <img
          alt="notification"
          src="https://img.icons8.com/color/24/000000/appointment-reminders.png"
        />
        Notifications
      </h1>
      <hr style={{ width: "90%" }} />
      {props.notification.reverse().map((invo) => (
        <Card className={classes.root}>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            style={{
              background: "rgba(0,0,0,.08)",
              padding: "7px 12px",
              fontSize: "20px",
              color: "grey",
              height: "43px",
            }}
            avatar={
              <NotificationsIcon
                style={{
                  background: "unset",
                  color: "#7467ef",
                  fontSize: "1.3rem",
                  marginTop: "5px",
                  marginRight: "4px",
                }}
              />
            }
            action={
              <Fab
                aria-label="like"
                style={{ height: "0px", width: "36px", margin: "5px" }}
                onClick={(e) => props.handleDeleteNotification(e, invo)}
              >
                <HighlightOffIcon />
              </Fab>
            }
            title="Notification"
          />
          <CardContent style={{ padding: "2px 13px" }}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={{ textTransform: "capitalize" }}
            >
              {invo.content}
            </Typography>
            <Typography variant="body2" component="p">
              {`Message By:- ${invo.posted_by}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {props.notification.length > 0 ? (
        <Button
          onClick={handleClickOpen7}
          style={{ width: "100%", background: "aquamarine" }}
        >
          Clear All
        </Button>
      ) : (
        <Typography style={{ textAlignLast: "center", fontSize: "x-large" }}>
          No Notifications
        </Typography>
      )}
      <Dialog
        open={open7}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose7}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Delete All Notifications ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Sure.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose7} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleAgree7()} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const setRedirect = (data) => {
    props.setRedirect(data);
  };

  return (
    <div>
      {props.renderRedirect()}
      <NavBar
        username={props.image.user}
        user_image={props.image.image}
        SideBar={SideBar}
        children={props.children}
        handleSideBarOpen={handleSideBarOpen}
        handleSideBarClose={handleSideBarClose}
        invoice={props.invoice.length}
        state1={state.right}
        state2={state1.right}
        state3={state2.right}
        messages={props.message.length}
        sideListNotification={sideListNotification}
        sideListMessage={sideListMessage}
        sideListInvoice={sideListInvoice}
        notification={props.notification.length}
        toggleDrawer={toggleDrawer}
        toggleDrawer1={toggleDrawer1}
        toggleDrawer2={toggleDrawer2}
        isAuthenticated={props.isAuthenticated}
        setRedirect={setRedirect}
        handleLogout={handleLogout}
      />
    </div>
  );
};

class CustomLayout extends Component {
  state = {
    redirect: false,
    images: {},
    invoice: [],
    message: [],
    notification: [],
    redirect1: false,
    redirectTo: "",
    plan: [],
    projects: [],
    username: "",
  };

  componentDidMount() {
    const { token, url } = this.props;
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
      socket.on("notificationSent", ({ name, room, message }) => {
        if (name !== this.props.username) {
          this.setState((previousState) => ({
            notification: [message, ...previousState.notification],
          }));
        }
      });

      socket.on("invoiceSent", ({ name, room, sendTo, message }) => {
        if (name !== this.props.username) {
          this.setState((previousState) => ({
            invoice: [...previousState.invoice, message],
          }));
        }
      });

      socket.on("sendUserImage", ({ name, message }) => {
        if (name === this.state.username) {
          this.setState({
            images: message,
          });
        }
      });

      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/create-all/`).then((res) => {
        this.setState({
          projects: res.data,
        });
      });
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const data = res.data[0];
        this.setState({
          username: data.user,
        });
      });
      axios.get(`https://${url}/userprofile_image/`).then((res) => {
        this.setState({
          images: res.data[0],
        });
      });
      axios.get(`https://${url}/list-project-invoice/`).then((res) => {
        this.setState({
          invoice: res.data,
        });
      });
      axios.get(`https://${url}/user_message/`).then((res) => {
        this.setState({
          message: res.data,
        });
      });
      axios.get(`https://${url}/notification/`).then((res) => {
        this.setState({
          notification: res.data,
        });
      });
      axios
        .get(`https://${this.props.url}/Subs/?username=${this.props.username}`)
        .then((res) => {
          const val = res.data[0];
          if (res.data.length > 0) {
            this.setState({
              plan: Plan_detail.filter((data) => {
                return data.price === ~~val.amount;
              })[0],
            });
          }
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
      socket.on("notificationSent", ({ name, room, message }) => {
        if (name !== this.props.username) {
          this.setState((previousState) => ({
            notification: [...previousState.notification, message],
          }));
        }
      });
      socket.on("invoiceSent", ({ name, room, sendTo, message }) => {
        if (name !== this.props.username) {
          this.setState((previousState) => ({
            invoice: [...previousState.invoice, message],
          }));
        }
      });
      socket.on("messageSent", ({ name, room, sendTo, message }) => {
        if (name !== this.props.username) {
          this.setState((previousState) => ({
            message: [...previousState.message, message],
          }));
        }
      });

      socket.on("sendUserImage", ({ name, message }) => {
        if (name === this.state.username) {
          this.setState({
            images: message,
          });
        }
      });

      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/create-all/`).then((res) => {
        this.setState({
          projects: res.data,
        });
      });
      axios.get(`https://${this.props.url}/userprofile_image/`).then((res) => {
        this.setState({
          images: res.data[0],
        });
      });
      axios
        .get(`https://${this.props.url}/list-project-invoice/`)
        .then((res) => {
          this.setState({
            invoice: res.data,
          });
        });
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const data = res.data[0];
        this.setState({
          username: data.user,
        });
      });
      axios.get(`https://${this.props.url}/user_message/`).then((res) => {
        this.setState({
          message: res.data,
        });
      });
      axios.get(`https://${this.props.url}/notification/`).then((res) => {
        this.setState({
          notification: res.data,
        });
      });
      axios
        .get(`https://${this.props.url}/Subs/?username=${this.props.username}`)
        .then((res) => {
          const val = res.data[0];
          if (res.data.length > 0) {
            this.setState({
              plan: Plan_detail.filter((data) => {
                return data.price === ~~val.amount;
              })[0],
            });
          }
        });
    }
  }

  handlelong = (event) => {};
  handleRedirect = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  };

  handleCancelInvoice = (data) => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .delete(`https://${this.props.url}/list-project-invoice/${data.id}`)
      .then((res) => {
        this.handleInvoiceRefresh();
      });
  };

  handleDeleteMessage = (event, data) => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .delete(`https://${this.props.url}/user_message/${data.id}`)
      .then((res) => {
        axios.get(`https://${this.props.url}/user_message/`).then((res) => {
          this.setState({
            message: res.data,
          });
        });
      });
  };

  handleDeleteNotification = (event, data) => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .delete(`https://${this.props.url}/notification/${data.id}`)
      .then((res) => {
        axios.get(`https://${this.props.url}/notification/`).then((res) => {
          this.setState({
            notification: res.data,
          });
        });
      });
  };

  handleInvoiceRefresh = () => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/list-project-invoice/`).then((res) => {
      this.setState({
        invoice: res.data,
      });
    });
  };

  handleAcceptInvoice = (event, data) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("member", data.requested_by);
    form_data.append("project_id", data.project_number);
    const url_post = `https://${this.props.url}/project-member/`;
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
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios
          .delete(`https://${this.props.url}/list-project-invoice/${data.id}`)
          .then((res) => {
            this.handleInvoiceRefresh();
          });
      })
      .catch((err) => console.log(err));
  };

  setRedirect = (data) => {
    this.setState({
      redirectTo: data,
      redirect1: true,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect1) {
      this.setState({
        redirect1: false,
      });
      return <Redirect to={`/${this.state.redirectTo}`} />;
    }
  };

  handleRefreshNotification = () => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/notification/`).then((res) => {
      this.setState({
        notification: res.data,
      });
    });
  };

  handleRefreshMessage = () => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/user_message/`).then((res) => {
      this.setState({
        message: res.data,
      });
    });
  };

  handleAgree9 = () => {
    setTimeout(
      () => {
        this.setState({
          invoice: [],
        });
      },
      this.state.invoice.forEach((data) => {
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios.delete(
          `https://${this.props.url}/list-project-invoice/${data.id}/`
        );
      })
    );
  };

  handleAgree7 = () => {
    setTimeout(
      () => {
        this.setState({
          notification: [],
        });
      },
      this.state.notification.forEach((data) => {
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios.delete(`https://${this.props.url}/notification/${data.id}/`);
      })
    );
  };

  handleAgree8 = () => {
    setTimeout(
      () => {
        this.setState({
          message: [],
        });
      },
      this.state.message.forEach((data) => {
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios.delete(`https://${this.props.url}/user_message/${data.id}/`);
      })
    );
  };

  handleRefreshInvoice = () => {
    this.handleInvoiceRefresh();
  };

  render() {
    if (this.state.redirect === true) {
      this.setState({
        redirect: false,
      });
      return <Redirect to="/" />;
    }
    return (
      <CustomLayouts
        {...this.props}
        handleAgree7={this.handleAgree7}
        handleAgree8={this.handleAgree8}
        handleAgree9={this.handleAgree9}
        plan={this.state.plan}
        projects={this.state.projects}
        handleRefreshMessage={this.handleRefreshMessage}
        handleRefreshInvoice={this.handleRefreshInvoice}
        handleRefreshNotification={this.handleRefreshNotification}
        setRedirect={this.setRedirect}
        url={this.props.url}
        renderRedirect={this.renderRedirect}
        username={this.props.username}
        token={this.props.token}
        activeUser={this.state.activeUser}
        notification={this.state.notification}
        image={this.state.images}
        handleDeleteNotification={this.handleDeleteNotification}
        message={this.state.message}
        invoice={this.state.invoice}
        handleDeleteMessage={this.handleDeleteMessage}
        handleAcceptInvoice={this.handleAcceptInvoice}
        handleCancelInvoice={this.handleCancelInvoice}
        handlelong={this.handlelong}
        redirect={this.state.redirect}
        handleRedirect={this.handleRedirect}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    token: state.token,
    url: state.baseurl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
