import React, { Component } from "react";
import "./profile.css";
import Photo from "./photos.js";
import Preview from "./file";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Posts from "./post";
import { connect } from "react-redux";
import axios from "axios";
import UserProfiles from "./userprofile.js";
import EditIcon from "@material-ui/icons/Edit";
import { Button, makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import SwipeableViews from "react-swipeable-views";
import Skeleton from "@material-ui/lab/Skeleton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearWithValueLabel from "../../progress.js";
import io from "socket.io-client";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

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

function FileAdds(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const { username, profile, image } = props;

  const [open4, setOpen4] = React.useState(false);

  const handleClose4 = () => {
    setOpen4(false);
  };

  function handleImage(event) {
    props.handleImage(event);
    setOpen4(true);
  }

  function handleBackground(event, file) {
    props.handleBackground(event, file);
    setOpen4(true);
  }

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
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file11"
                  onChange={(e) => handleBackground(e, e.target.files[0])}
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file11">
                  <Tooltip title="Edit Background">
                    <Button component="span" style={{ background: "aqua" }}>
                      <EditIcon />
                      Edit
                    </Button>
                  </Tooltip>
                </label>
              </div>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <div
              key="2"
              className="images_mobile"
              style={{
                backgroundImage: `url(${props.profile.background_image})`,
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "35px",
                  marginTop: "130px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file11"
                  onChange={(e) => handleBackground(e, e.target.files[0])}
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file11">
                  <Tooltip title="Edit Background">
                    <Button component="span" style={{ background: "aqua" }}>
                      <EditIcon />
                    </Button>
                  </Tooltip>
                </label>
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
      <>
        <div className={classes.sectionDesktop}>
          <div className="card" style={{ width: "100%" }}>
            <div>
              <div className="pagal1">
                <div className="pagal2">
                  <div className="pagal3">
                    <div className="pagal4">
                      <div style={{ textAlign: "center" }}>
                        <div
                          className="pagalSlide1"
                          style={{ marginTop: "-75px" }}
                        >
                          <div
                            className="pagalSlide2"
                            style={{ align: "center" }}
                          >
                            <div style={{ zIndex: 1, position: "relative" }}>
                              {!props.loading ? (
                                <img
                                  src={image}
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
                          {!props.loading ? (
                            <>
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"
                                onChange={(event) => handleImage(event)}
                                multiple
                                type="file"
                              />
                              <label htmlFor="raised-button-file">
                                <Tooltip title="Edit">
                                  <Button
                                    component="span"
                                    color="primary"
                                    style={{
                                      margin: "0 15px 0 20px",
                                      background: "transparent",
                                    }}
                                  >
                                    <EditIcon className="edit" />
                                  </Button>
                                </Tooltip>
                              </label>
                            </>
                          ) : null}
                        </div>

                        <div>
                          <h3
                            className="pagal5"
                            style={{ textTransform: "uppercase" }}
                          >
                            {!props.loading ? (
                              <>{username}</>
                            ) : (
                              <Skeleton animation="wave" width={200} />
                            )}{" "}
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
                          <div
                            className="pagal11"
                            style={{ background: "inherit" }}
                          >
                            <div>
                              <div className={classes.sectionDesktop}>
                                <AppBar
                                  position="static"
                                  color="default"
                                  style={{ marginTop: "10px" }}
                                  className="tabprofile"
                                >
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    scrollButtons="on"
                                    style={{ fontColor: "#fff" }}
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                  >
                                    <Tab
                                      label="Posts"
                                      icon={
                                        <img
                                          alt="a"
                                          src="https://img.icons8.com/cotton/24/000000/comments--v2.png"
                                        />
                                      }
                                      {...a11yProps(0)}
                                    />
                                    <Tab
                                      label="Images"
                                      icon={
                                        <img
                                          alt="a"
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
                                    <Tab
                                      label="Edit Profile"
                                      icon={<EditIcon />}
                                      {...a11yProps(3)}
                                    />
                                  </Tabs>
                                </AppBar>
                              </div>
                              <div className={classes.sectionMobile}>
                                <AppBar
                                  position="static"
                                  color="default"
                                  style={{ marginTop: "10px" }}
                                  className="tabprofile"
                                >
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    scrollButtons="on"
                                    style={{ fontColor: "#fff" }}
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                  >
                                    <Tab
                                      icon={
                                        <img
                                          alt="a"
                                          src="https://img.icons8.com/cotton/24/000000/comments--v2.png"
                                        />
                                      }
                                      {...a11yProps(0)}
                                    />
                                    <Tab
                                      icon={
                                        <img
                                          alt="a"
                                          src="https://img.icons8.com/plasticine/30/000000/image.png"
                                        />
                                      }
                                      {...a11yProps(1)}
                                    />
                                    <Tab
                                      icon={<PersonPinIcon />}
                                      {...a11yProps(2)}
                                    />
                                    <Tab
                                      icon={<EditIcon />}
                                      {...a11yProps(3)}
                                    />
                                  </Tabs>
                                </AppBar>
                              </div>

                              <div style={{ flexGrow: 1, width: "101%" }}>
                                <SwipeableViews
                                  axis="x-reverse"
                                  index={value}
                                  onChangeIndex={handleChangeIndex}
                                >
                                  <TabPanel value={value} index={0}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div
                                          style={{
                                            padding: "5% 20%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Posts />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Posts />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                  <TabPanel value={value} index={1}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div>
                                          <Photo />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Photo />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                  <TabPanel value={value} index={2}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div
                                          style={{
                                            padding: "5% 20%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Preview />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Preview />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                  <TabPanel value={value} index={3}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div
                                          style={{
                                            padding: "5% 20%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <UserProfiles />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <UserProfiles />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                </SwipeableViews>
                              </div>
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
        <div className={classes.sectionMobile}>
          <div className="card" style={{ margin: 0, width: "100%" }}>
            <div>
              <div className="pagal1">
                <div className="pagal2">
                  <div className="pagal3">
                    <div className="pagal4">
                      <div style={{ textAlign: "center" }}>
                        <div
                          className="pagalSlide1"
                          style={{ marginTop: "-75px" }}
                        >
                          <div
                            className="pagalSlide2"
                            style={{ align: "center" }}
                          >
                            <div style={{ zIndex: 1, position: "relative" }}>
                              {!props.loading ? (
                                <img
                                  src={image}
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
                          {!props.loading ? (
                            <>
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"
                                onChange={(event) => handleImage(event)}
                                multiple
                                type="file"
                              />
                              <label htmlFor="raised-button-file">
                                <Tooltip title="Edit">
                                  <Button
                                    component="span"
                                    color="primary"
                                    style={{
                                      margin: "0 15px 0 20px",
                                      background: "transparent",
                                    }}
                                  >
                                    <EditIcon className="edit" />
                                  </Button>
                                </Tooltip>
                              </label>
                            </>
                          ) : null}
                        </div>

                        <div>
                          <h3
                            className="pagal5"
                            style={{ textTransform: "uppercase" }}
                          >
                            {!props.loading ? (
                              <>{username}</>
                            ) : (
                              <Skeleton animation="wave" width={200} />
                            )}{" "}
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
                          <div
                            className="pagal11"
                            style={{ background: "inherit" }}
                          >
                            <div>
                              <div className={classes.sectionDesktop}>
                                <AppBar
                                  position="static"
                                  color="default"
                                  style={{ marginTop: "10px" }}
                                  className="tabprofile"
                                >
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    scrollButtons="on"
                                    style={{ fontColor: "#fff" }}
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                  >
                                    <Tab
                                      label="Posts"
                                      icon={
                                        <img
                                          alt="a"
                                          src="https://img.icons8.com/cotton/24/000000/comments--v2.png"
                                        />
                                      }
                                      {...a11yProps(0)}
                                    />
                                    <Tab
                                      label="Images"
                                      icon={
                                        <img
                                          alt="a"
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
                                    <Tab
                                      label="Edit Profile"
                                      icon={<EditIcon />}
                                      {...a11yProps(3)}
                                    />
                                  </Tabs>
                                </AppBar>
                              </div>
                              <div className={classes.sectionMobile}>
                                <AppBar
                                  position="static"
                                  color="default"
                                  style={{ marginTop: "10px" }}
                                  className="tabprofile"
                                >
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    scrollButtons="on"
                                    style={{ fontColor: "#fff" }}
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                  >
                                    <Tab
                                      icon={
                                        <img
                                          alt="a"
                                          src="https://img.icons8.com/cotton/24/000000/comments--v2.png"
                                        />
                                      }
                                      {...a11yProps(0)}
                                    />
                                    <Tab
                                      icon={
                                        <img
                                          alt="a"
                                          src="https://img.icons8.com/plasticine/30/000000/image.png"
                                        />
                                      }
                                      {...a11yProps(1)}
                                    />
                                    <Tab
                                      icon={<PersonPinIcon />}
                                      {...a11yProps(2)}
                                    />
                                    <Tab
                                      icon={<EditIcon />}
                                      {...a11yProps(3)}
                                    />
                                  </Tabs>
                                </AppBar>
                              </div>

                              <div style={{ flexGrow: 1, width: "101%" }}>
                                <SwipeableViews
                                  axis="x-reverse"
                                  index={value}
                                  onChangeIndex={handleChangeIndex}
                                >
                                  <TabPanel value={value} index={0}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div
                                          style={{
                                            padding: "5% 20%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Posts />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Posts />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                  <TabPanel value={value} index={1}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div>
                                          <Photo />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Photo />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                  <TabPanel value={value} index={2}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div
                                          style={{
                                            padding: "5% 20%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Preview />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <Preview />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                  <TabPanel value={value} index={3}>
                                    <>
                                      <div className={classes.sectionDesktop}>
                                        <div
                                          style={{
                                            padding: "5% 20%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <UserProfiles />
                                        </div>
                                      </div>
                                      <div className={classes.sectionMobile}>
                                        <div
                                          style={{
                                            padding: "5% 0%",
                                            flexGrow: "1",
                                          }}
                                        >
                                          <UserProfiles />
                                        </div>
                                      </div>
                                    </>
                                  </TabPanel>
                                </SwipeableViews>
                              </div>
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
      </>

      {props.uploadPercentage !== 0 ? (
        <Dialog
          open={open4}
          aria-labelledby="alert-dialog-title"
          style={{ minWidth: "600px" }}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ minWidth: "600px" }}>
            {"UPLOADING"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <LinearWithValueLabel
                progress={props.uploadPercentage}
                total={props.data.total}
                loaded={props.data.loaded}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.handlerequestCancel()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        () => handleClose4()
      )}
    </div>
  );
}

class FileAdd extends Component {
  state = {
    username: "",
    profile: {},
    image: {},
    loading: true,
    total: 0,
    loaded: 0,
    uploadPercentage: 0,
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
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          username: res.data.username,
          profile: res.data.profile,
          image: res.data.image.image,
          loading: false,
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      var socket = io("https://live-data-manager.herokuapp.com");
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };

      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
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
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          username: res.data.username,
          profile: res.data.profile,
          image: res.data.image.image,
          loading: false,
        });
      });
    }
  }
  handlerequestCancel = () => {
    window.location.reload(false);
  };

  handleBackground = (event, data) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("background_image", data);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
      },
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      const userID = res.data.id;
      const url_post = `https://${this.props.url}/userprofile/${userID}/`;
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios
        .patch(url_post, form_data, options, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
            this.setState({
              profile: res.data.profile,
            });
            this.setState({ uploadPercentage: 100 }, () => {
              setTimeout(() => {
                this.setState({ uploadPercentage: 0 });
              }, 1000);
            });
          });
        })
        .catch((err) => console.log(err));
    });
  };

  handleImage = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("image", event.target.files[0]);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        this.setState({
          total: total,
        });
        if (percent < 100) {
          this.setState({ uploadPercentage: percent, loaded: loaded });
        }
      },
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      const userID = res.data.id;
      const url_post = `https://${this.props.url}/userprofile_image/${userID}/`;
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios
        .put(url_post, form_data, options, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.setState({
            image: res.data.image,
          });
          var socket = io("https://live-data-manager.herokuapp.com");
          axios.defaults.headers = {
            "Content-Type": "application.json",
            Authorization: "Token " + this.props.token,
          };

          axios.get(`https://${this.props.url}/userprofile/`).then((res1) => {
            const prof = res1.data[0];
            const name = prof.user;
            const message = res.data;
            socket.emit("sendUserImage", { name, message });
          });
          this.setState({ uploadPercentage: 100 }, () => {
            setTimeout(() => {
              this.setState({ uploadPercentage: 0 });
            }, 1000);
          });
        })
        .catch((err) => console.log(err));
    });
  };

  render() {
    return (
      <FileAdds
        username={this.state.username}
        data={this.state}
        handlerequestCancel={this.handlerequestCancel}
        uploadPercentage={this.state.uploadPercentage}
        loading={this.state.loading}
        handleImage={this.handleImage}
        handleBackground={this.handleBackground}
        profile={this.state.profile}
        image={this.state.image}
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

export default connect(mapStateToProps)(FileAdd);
