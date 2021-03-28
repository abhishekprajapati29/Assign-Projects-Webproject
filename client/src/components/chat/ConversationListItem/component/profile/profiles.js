import React, { Component } from "react";
import img from "./assests/profile-bg.jpg";
import "../../../../profile/profile.css";
import Photo from "./photos.js";
import Preview from "./file";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import Posts from "./post";
import { connect } from "react-redux";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Skeleton from "@material-ui/lab/Skeleton";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/styles";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function FileAdds(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open5, setOpen5] = React.useState(false);

  const handleMessageOpen = () => {
    setOpen5(true);
  };

  const handleMessageClose = () => {
    setOpen5(false);
  };

  const handleMessageSend = (event) => {
    props.handleMessageSend(event);
    handleMessageClose();
  };

  const { id, username, profile, image } = props;
  const classes = useStyles();
  return (
    <div
      key="container"
      className="container"
      style={{ padding: "0", marginTop: "-10px" }}
    >
      {!props.loading ? (
        <>
          <div className={classes.sectionDesktop}>
            <div
              key="2"
              className="images"
              style={{
                backgroundImage: `url(${props.profile.background_image})`,
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "35px",
                  marginTop: "390px",
                }}
              >
                <Button
                  style={{ marginLeft: "10px", background: "aqua" }}
                  onClick={handleMessageOpen}
                >
                  <MessageIcon />
                  Message
                </Button>
                <Dialog
                  open={open5}
                  onClose={handleMessageClose}
                  aria-labelledby="form-dialog-title"
                  style={{ width: "1000px" }}
                >
                  <DialogTitle id="form-dialog-title">Message</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={props.message}
                      onChange={(event) => props.handleMessage(event)}
                      label="Message"
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleMessageClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={(event) => handleMessageSend(event)}
                      color="primary"
                    >
                      Send
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <div
              key="4"
              className="images_mobile"
              style={{
                backgroundImage: `url(${props.profile.background_image})`,
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "30px",
                  marginTop: "130px",
                }}
              >
                <Button
                  style={{ background: "aqua" }}
                  onClick={handleMessageOpen}
                >
                  <MessageIcon />
                </Button>
                <Dialog
                  open={open5}
                  onClose={handleMessageClose}
                  aria-labelledby="form-dialog-title"
                  style={{ width: "1000px" }}
                >
                  <DialogTitle id="form-dialog-title">Message</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={props.message}
                      onChange={(event) => props.handleMessage(event)}
                      label="Message"
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleMessageClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={(event) => handleMessageSend(event)}
                      color="primary"
                    >
                      Send
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.sectionDesktop}>
            <Skeleton
              variant="rect"
              animation="wave"
              width={"100%"}
              height={560}
            />
          </div>
          <div className={classes.sectionMobile}>
            <Skeleton
              variant="rect"
              animation="wave"
              width={"100%"}
              height={300}
            />
          </div>
        </>
      )}
      <div className="card">
        <div>
          <div className="pagal1">
            <div className="pagal2">
              <div className="pagal3">
                <div className="pagal4">
                  <div style={{ textAlign: "center" }}>
                    <div className="pagalSlide1" style={{ marginTop: "-75px" }}>
                      <div className="pagalSlide2" style={{ align: "center" }}>
                        <div style={{ zIndex: 1, position: "relative" }}>
                          {!props.loading ? (
                            <img
                              src={image.image}
                              alt="..."
                              className="profile"
                              style={{
                                transform: "translate3d(0, 0, 0)",
                                boxShadow:
                                  " 0px 4px 20px 0px, rgba(244, 67, 54, 0.4) 0px 7px 10px -5px",
                              }}
                            />
                          ) : (
                            <Skeleton
                              variant="circle"
                              className="profile"
                              width={200}
                              height={198}
                              style={{
                                transform: "translate3d(0, 0, 0)",
                                boxShadow:
                                  " 0px 4px 20px 0px, rgba(244, 67, 54, 0.4) 0px 7px 10px -5px",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <h3
                        className="pagal5"
                        style={{ textTransform: "uppercase" }}
                      >
                        {!props.loading ? (
                          <>{username}</>
                        ) : (
                          <Skeleton animation="wave" width={200} />
                        )}
                      </h3>
                      {!props.loading ? (
                        <h6
                          style={{
                            textTransform: "capitalize",
                            fontSize: "20px",
                            marginBlockStart: "0.53em",
                          }}
                        >
                          {profile.designation}
                        </h6>
                      ) : (
                        <Skeleton animation="wave" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pagal6">
              {!props.loading ? (
                <p>{profile.about_me}</p>
              ) : (
                <Skeleton
                  animation="wave"
                  style={{ margin: "auto" }}
                  width={200}
                />
              )}
            </div>
            <div className="pagal7">
              <div className="pagal8">
                <div>
                  <div className="pagal9">
                    <div className="pagal10" style={{ overflow: "hidden" }}>
                      <div className="pagal11">
                        <div>
                          <div className={classes.sectionDesktop}>
                            <AppBar
                              position="relative"
                              color="inherit"
                              className="pagal12"
                            >
                              <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                aria-label="scrollable force tabs example"
                              >
                                <Tab
                                  label="Posts"
                                  icon={
                                    <img
                                      alt="c"
                                      src="https://img.icons8.com/cotton/24/000000/comments--v2.png"
                                    />
                                  }
                                  {...a11yProps(0)}
                                />
                                <Tab
                                  label="Images"
                                  icon={
                                    <img
                                      alt="c"
                                      src="https://img.icons8.com/plasticine/30/000000/image.png"
                                    />
                                  }
                                  {...a11yProps(1)}
                                />
                                <Tab
                                  label="About Me"
                                  icon={<PersonPinIcon />}
                                  {...a11yProps(2)}
                                />
                              </Tabs>
                            </AppBar>
                          </div>
                          <div className={classes.sectionMobile}>
                            <AppBar
                              position="relative"
                              color="inherit"
                              className="pagal12"
                            >
                              <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                aria-label="scrollable force tabs example"
                              >
                                <Tab
                                  icon={
                                    <img
                                      alt="c"
                                      src="https://img.icons8.com/cotton/24/000000/comments--v2.png"
                                    />
                                  }
                                  {...a11yProps(0)}
                                />
                                <Tab
                                  icon={
                                    <img
                                      alt="c"
                                      src="https://img.icons8.com/plasticine/30/000000/image.png"
                                    />
                                  }
                                  {...a11yProps(1)}
                                />
                                <Tab
                                  icon={<PersonPinIcon />}
                                  {...a11yProps(2)}
                                />
                              </Tabs>
                            </AppBar>
                          </div>
                          <TabPanel value={value} index={0}>
                            <>
                              <div className={classes.sectionDesktop}>
                                <div
                                  style={{ padding: "5% 20%", flexGrow: "1" }}
                                >
                                  {props.data.posts ? (
                                    <Posts user={id} />
                                  ) : (
                                    <Typography>User Protected</Typography>
                                  )}
                                </div>
                              </div>
                              <div className={classes.sectionMobile}>
                                <div
                                  style={{ padding: "5% 0%", flexGrow: "1" }}
                                >
                                  {props.data.posts ? (
                                    <Posts user={id} />
                                  ) : (
                                    <Typography>User Protected</Typography>
                                  )}
                                </div>
                              </div>
                            </>
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <>
                              <div className={classes.sectionDesktop}>
                                <div>
                                  {props.data.images ? (
                                    <Photo user={id} />
                                  ) : (
                                    <Typography>User Protected</Typography>
                                  )}
                                </div>
                              </div>
                              <div className={classes.sectionMobile}>
                                <div
                                  style={{ padding: "5% 0%", flexGrow: "1" }}
                                >
                                  {props.data.images ? (
                                    <Photo user={id} />
                                  ) : (
                                    <Typography>User Protected</Typography>
                                  )}
                                </div>
                              </div>
                            </>
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            <>
                              <div className={classes.sectionDesktop}>
                                <div
                                  style={{ padding: "5% 20%", flexGrow: "1" }}
                                >
                                  {props.data.info ? (
                                    <Preview user={id} />
                                  ) : (
                                    <Typography>User Protected</Typography>
                                  )}
                                </div>
                              </div>
                              <div className={classes.sectionMobile}>
                                <div
                                  style={{ padding: "5% 0%", flexGrow: "1" }}
                                >
                                  {props.data.info ? (
                                    <Preview user={id} />
                                  ) : (
                                    <Typography>User Protected</Typography>
                                  )}
                                </div>
                              </div>
                            </>
                          </TabPanel>
                        </div>
                      </div>
                      <span className="pagal16"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class FileAdd extends Component {
  state = {
    id: "",
    username: "",
    profile: {},
    image: {},
    message: "",
    loading: true,
    posts: true,
    images: true,
    info: true,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      const memberID = this.props.match.params.memberID;
      axios.get(`https://${this.props.url}/api/auth/user`).then((res1) => {
        const teamName = res1.data.profile.teamName;
        axios
          .get(
            `https://${this.props.url}/userprofileList/?id=${memberID}&profile__teamName=${teamName}`
          )
          .then((res) => {
            const data = res.data[0];
            this.setState({
              id: data.id,
              username: data.username,
              profile: data.profile,
              image: data.image,
              loading: false,
            });
            axios
              .get(`https://${this.props.url}/user_allow/?user=${data.id}`)
              .then((res2) => {
                if (res2.data.length > 0) {
                  const data = res2.data[0];
                  this.setState({
                    posts: data.post,
                    images: data.images,
                    info: data.info,
                  });
                }
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
      const memberID = this.props.match.params.memberID;
      axios.get(`https://${this.props.url}/api/auth/user`).then((res1) => {
        const teamName = res1.data.profile.teamName;
        axios
          .get(
            `https://${this.props.url}/userprofileList/?id=${memberID}&profile__teamName=${teamName}`
          )
          .then((res) => {
            const data = res.data[0];
            this.setState({
              id: data.id,
              username: data.username,
              profile: data.profile,
              image: data.image,
              loading: false,
            });

            axios
              .get(`https://${this.props.url}/user_allow/?user=${data.id}`)
              .then((res2) => {
                if (res2.data.length > 0) {
                  const data = res2.data[0];
                  this.setState({
                    posts: data.post,
                    images: data.images,
                    info: data.info,
                  });
                }
              });
          });
      });
    }
  }

  handleMessage = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  handleMessageSend = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("message", this.state.message);
    form_data.append("message_by", this.props.username);
    form_data.append("user", this.state.id);
    const url_post = `https://${this.props.url}/user_message/`;
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
        console.log(res.data);
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
              socket.emit("messageSent", { name, room, sendTo, message });
            });
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <FileAdds
        id={this.props.match.params.memberID}
        data={this.state}
        loading={this.state.loading}
        username={this.state.username}
        handleMessageSend={this.handleMessageSend}
        message={this.state.message}
        handleMessage={this.handleMessage}
        profile={this.state.profile}
        image={this.state.image}
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

export default connect(mapStateToProps)(FileAdd);
