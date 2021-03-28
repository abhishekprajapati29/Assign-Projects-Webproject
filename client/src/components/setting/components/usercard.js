import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
// core components
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "../../css/CustomButtons/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";

import clsx from "clsx";
import Icon from "@material-ui/core/Icon";

import GridItem from "../../css/Grid/GridItem.js";
import GridContainer from "../../css/Grid/GridContainer.js";
import Card from "../../css/Card/Card.js";
import CardHeader from "../../css/Card/CardHeader.js";
import CardAvatar from "../../css/Card/CardAvatar.js";
import CardBody from "../../css/Card/CardBody.js";
import CardFooter from "../../css/Card/CardFooter.js";
import axios from "axios";
import { primaryColor } from "../../as.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Loading from "../../../loading.js";
import LoadSuccess from "../../../success.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearWithValueLabel from "../../../progress.js";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  padd: {
    paddingTop: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
    color: primaryColor,
  },
  create: {
    display: "none",
    margin: theme.spacing(3),
    color: primaryColor,
  },

  input: {
    display: "none",
  },

  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: blue,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function UserProfileSettings(props) {
  const { data, profile, image } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    props.handlecng(event);
  };

  const [open4, setOpen4] = React.useState(false);

  const handleClose4 = () => {
    setOpen4(false);
  };

  function handleSave(event) {
    props.handleImage(event);
    setOpen4(true);
  }
  return (
    <>
      {!props.data.loading ? (
        <>
          <>{props.data.loadSuccess ? <LoadSuccess /> : null}</>
          <div className={classes.root}>
            <CssBaseline />
            <form
              noValidate
              onSubmit={props.handleUpdateSubmitdata}
              onClick={props.handleDataReterieve}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <Card profile>
                    <CardAvatar profile>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {image === null ? (
                          <></>
                        ) : (
                          <img src={image.image} alt="..." />
                        )}
                      </a>
                    </CardAvatar>

                    {profile === null ? (
                      <></>
                    ) : (
                      <CardBody profile>
                        <h6 className={classes.cardCategory}>
                          {profile.designation}
                        </h6>
                        <h4
                          className={classes.cardTitle}
                          style={{ textTransform: "uppercase" }}
                        >
                          {data.username}
                        </h4>
                        <p className={classes.description}>
                          {profile.about_me}
                        </p>
                        <Grid item>
                          <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: "none" }}
                            id="raised-button-file"
                            onChange={(event) => handleSave(event)}
                            multiple
                            type="file"
                          />
                          <label htmlFor="raised-button-file">
                            {/* <Fab variant="extended" component="span" className={classes.button} className={classes.fab}>
                      Upload
                    </Fab> */}
                            <Button component="span" color="primary">
                              <Icon
                                className={clsx("fas fa-upload")}
                                variant="outlined"
                              />
                              Upload
                            </Button>
                          </label>
                        </Grid>
                      </CardBody>
                    )}
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={8}>
                  <Card
                    style={{
                      boxShadow:
                        "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                    }}
                  >
                    <CardHeader
                      color="primary"
                      style={{
                        boxShadow:
                          "0 4px 20px 0 #64b5f6, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                      }}
                    >
                      <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                      <p className={classes.cardCategoryWhite}>
                        Complete your profile
                      </p>
                    </CardHeader>
                    <CardBody style={{ fontSize: "50px" }}>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={6}
                          style={{ fontSize: "11px", fontWeight: 300 }}
                        >
                          <TextField
                            variant="outlined"
                            margin="normal"
                            name="designation"
                            required
                            fullWidth
                            value={props.data.designation}
                            label="Designation"
                            autoFocus
                            onChange={props.handlecng}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            name="location"
                            variant="outlined"
                            margin="normal"
                            value={props.data.location}
                            required
                            fullWidth
                            label="Location"
                            onChange={props.handlecng}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            style={{ width: "100%", marginTop: "17px" }}
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              Gender
                            </InputLabel>
                            <Select
                              margin="normal"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              fullWidth
                              name="gender"
                              value={props.data.gender}
                              onChange={handleChange}
                              label="Gender"
                            >
                              <MenuItem value={"Male"}>Male</MenuItem>
                              <MenuItem value={"Female"}>Female</MenuItem>
                              <MenuItem value={"None"}>None</MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            name="occupation"
                            value={props.data.occupation}
                            required
                            fullWidth
                            label="Occupation"
                            onChange={props.handlecng}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            name="skill"
                            required
                            fullWidth
                            value={props.data.skill}
                            label="Skills"
                            onChange={props.handlecng}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            name="job"
                            value={props.data.job}
                            required
                            fullWidth
                            label="Jobs"
                            onChange={props.handlecng}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            type="number"
                            label="Phone Number"
                            required
                            name="phone_number"
                            fullWidth
                            value={props.data.phone_number}
                            onChange={props.handlecng}
                            className="text-field-amount"
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 10);
                            }}
                            min={0}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            value={props.data.address}
                            name="address"
                            required
                            fullWidth
                            label="Address"
                            onChange={props.handlecng}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            value={props.data.about_me}
                            name="about_me"
                            required
                            fullWidth
                            label="About Me"
                            onChange={props.handlecng}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <div className={classes.wrapper}>
                        <Button
                          style={{
                            boxShadow:
                              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                          }}
                          disabled={props.data.loadingUpdate}
                          color="primary"
                          type="submit"
                        >
                          Update Profile
                        </Button>
                        {props.data.loadingUpdate && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </form>
          </div>
          {props.uploadPercentage !== 0 ? (
            <Dialog
              open={open4}
              aria-labelledby="alert-dialog-title"
              style={{ Width: "100%" }}
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                style={{ minWidth: "600px" }}
              >
                {"UPLOADING"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <LinearWithValueLabel
                    total={props.total}
                    loaded={props.loaded}
                    progress={props.uploadPercentage}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => props.handlerequestCancel()}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            () => handleClose4()
          )}
        </>
      ) : (
        <div className={classes.root}>
          <Loading />
        </div>
      )}
    </>
  );
}

class UserProfileSetting extends Component {
  state = {
    user: {},
    profile: {},
    profiles: "",
    image: {},
    username: "",
    location: "",
    about_me: "",
    designation: "",
    phone_number: "",
    gender: "",
    skill: "",
    job: "",
    occupation: "",
    address: "",
    loadSuccess: false,
    loadingUpdate: false,
    loading: false,
    uploadPercentage: 0,
    total: 0,
    loaded: 0,
  };

  handlerequestCancel = () => {
    window.location.reload(false);
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    var socket = io("http://localhost:3001");
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };

    axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
      const prof = res.data[0];
      socket.emit("join", { name: prof.user, room: prof.teamName }, (error) => {
        if (error) {
          alert(error);
        }
      });

      return () => {
        if (!prof.user & !prof.teamName) {
          socket.emit("disconnect");

          socket.off();
        }
      };
    });
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          user: res.data,
          profile: res.data.profile,
          image: res.data.image,
          username: res.data.username,
          location: res.data.profile.location,
          about_me: res.data.profile.about_me,
          designation: res.data.profile.designation,
          phone_number: res.data.profile.phone_number,
          gender: res.data.profile.gender,
          skill: res.data.profile.skills,
          job: res.data.profile.jobs,
          occupation: res.data.profile.occupation,
          address: res.data.profile.address,
          loading: false,
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      loading: true,
    });
    var socket = io("http://localhost:3001");
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + newProps.token,
    };

    axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
      const prof = res.data[0];
      socket.emit("join", { name: prof.user, room: prof.teamName }, (error) => {
        if (error) {
          alert(error);
        }
      });

      return () => {
        if (!prof.user & !prof.teamName) {
          socket.emit("disconnect");

          socket.off();
        }
      };
    });
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          user: res.data,
          profile: res.data.profile,
          image: res.data.image,
          username: res.data.username,
          location: res.data.profile.location,
          about_me: res.data.profile.about_me,
          designation: res.data.profile.designation,
          phone_number: res.data.profile.phone_number,
          gender: res.data.profile.gender,
          skill: res.data.profile.skills,
          job: res.data.profile.jobs,
          occupation: res.data.profile.occupation,
          address: res.data.profile.address,
          loading: false,
        });
      });
    }
  }

  handlecng = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleUpdateSubmitdata = (event) => {
    this.setState({
      loadingUpdate: true,
    });
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("location", this.state.location);
    form_data.append("phone_number", this.state.phone_number);
    form_data.append("designation", this.state.designation);
    form_data.append("about_me", this.state.about_me);
    form_data.append("gender", this.state.gender);
    form_data.append("skills", this.state.skill);
    form_data.append("occupation", this.state.occupation);
    form_data.append("jobs", this.state.job);
    form_data.append("address", this.state.address);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      const userID = res.data.id;
      const url_post = `https://${this.props.url}/userprofile/${userID}/`;
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios
        .put(url_post, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          axios.defaults.headers = {
            "Content-Type": "application.json",
            Authorization: "Token " + this.props.token,
          };
          axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
            this.setState({
              profile: res.data.profile,
              image: res.data.image,
              loadingUpdate: false,
            });
            this.handleSuccess();
          });
        })
        .catch((err) => console.log(err));
    });
  };

  handleSuccess = () => {
    this.setState({
      loadSuccess: true,
    });
    setTimeout(() => {
      this.setState({
        loadSuccess: false,
      });
    }, 4000);
  };

  handleData = (data) => {
    this.setState({
      image: data,
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
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
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
          this.handleData(res.data);
          var socket = io("https://live-data-manager.herokuapp.com/");
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
          // this.props.handlelong(res.data);
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
      <UserProfileSettings
        data={this.state}
        total={this.state.total}
        loaded={this.state.loaded}
        handlerequestCancel={this.handlerequestCancel}
        uploadPercentage={this.state.uploadPercentage}
        handleImageCreate={this.handleImageCreate}
        handleDataReterieve={this.handleDataReterieve}
        content={this.state}
        handleCreateSubmitdata={this.handleCreateSubmitdata}
        handleUpdateSubmitdata={this.handleUpdateSubmitdata}
        profile={this.state.profile}
        image={this.state.image}
        handleImage={this.handleImage}
        handleSubmit={this.handlecng}
        handlecng={this.handlecng}
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

export default connect(mapStateToProps)(UserProfileSetting);
