import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import CardHeader from "../../css/Card/CardHeader";
import Card from "../../css/Card/Card";
import Button from "../../css/CustomButtons/Button";
import { connect } from "react-redux";
import axios from "axios";
import LoadSuccess from "../../../success.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import {
  CardContent,
  Grid,
  Divider,
  FormControlLabel,
  FormGroup,
  FormControl,
  Checkbox,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
  },
  formControl: {
    height: 168,
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
  item: {
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    margin: 1,
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

const Notification = (props) => {
  const classes = useStyles();

  return (
    <>
      {props.data.success ? <LoadSuccess /> : null}

      <Card className={classes.root}>
        <form>
          <CardHeader
            color="info"
            style={{
              boxShadow:
                "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
            }}
          >
            <h4 className={classes.cardTitleWhite}>Notifications</h4>
            <p className={classes.cardCategoryWhite}>
              Manage the notifications
            </p>
          </CardHeader>
          <CardContent>
            <Grid container spacing={6} wrap="wrap">
              <Grid className={classes.item} item md={4} sm={6} xs={12}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ textAlignLast: "center" }}
                >
                  Allign Dashboard
                </Typography>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.data.todo}
                          onChange={(event) => props.handleChange(event)}
                          name="todo"
                        />
                      }
                      label="Show Todo"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.data.team}
                          onChange={(event) => props.handleChange(event)}
                          name="team"
                        />
                      }
                      label="Show Team"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.data.diary}
                          onChange={(event) => props.handleChange(event)}
                          name="diary"
                        />
                      }
                      label="Show Diary"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.data.post}
                          onChange={(event) => props.handleChange(event)}
                          name="post"
                        />
                      }
                      label="Show Post"
                    />
                  </FormGroup>
                </FormControl>
                <br />
                <Divider />
                <div className={classes.wrapper}>
                  <Button
                    color="info"
                    variant="outlined"
                    style={{
                      boxShadow:
                        "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                      width: "100%",
                    }}
                    onClick={(event) => props.handleAllignment(event)}
                    disabled={props.data.loadingCreate1}
                  >
                    Save
                  </Button>
                  {props.data.loadingCreate1 && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
              <Grid className={classes.item} item md={4} sm={6} xs={12}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ textAlignLast: "center" }}
                >
                  Profile Privacy
                </Typography>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.data.posts}
                          onChange={(event) => props.handleChange(event)}
                          name="posts"
                        />
                      }
                      label="Show Posts"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.data.images}
                          onChange={(event) => props.handleChange(event)}
                          name="images"
                        />
                      }
                      label="Show Images"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.data.info}
                          onChange={(event) => props.handleChange(event)}
                          name="info"
                        />
                      }
                      label="Show Info"
                    />
                  </FormGroup>
                </FormControl>
                <br />
                <Divider />
                <div className={classes.wrapper}>
                  <Button
                    color="info"
                    variant="outlined"
                    style={{
                      boxShadow:
                        "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                      width: "100%",
                    }}
                    onClick={(event) => props.handlePrivacy(event)}
                    disabled={props.data.loadingCreate2}
                  >
                    Save
                  </Button>
                  {props.data.loadingCreate2 && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </>
  );
};

class Notifications extends Component {
  state = {
    todo: true,
    team: true,
    diary: true,
    post: true,
    loadingCreate1: false,
    loadingCreate2: false,
    success: false,
    posts: true,
    images: true,
    info: true,
  };

  componentDidMount() {
    this.setState({
      loadingCreate1: true,
      loadingCreate2: true,
    });
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/allidash/`).then((res1) => {
      if (res1.data.length > 0) {
        const data = res1.data[0];
        this.setState({
          todo: data.todo,
          team: data.team,
          diary: data.diary,
          post: data.post,
        });
      }
    });
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      axios
        .get(`https://${this.props.url}/user_allow/?user=${res.data.id}`)
        .then((res1) => {
          if (res1.data.length > 0) {
            const data = res1.data[0];
            this.setState({
              posts: data.post,
              images: data.images,
              info: data.info,
            });
          }
          this.setState({
            loadingCreate1: false,
            loadingCreate2: false,
          });
        });
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  handleAllignment = (event) => {
    event.preventDefault();
    this.setState({ loadingCreate1: true });
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/allidash/`).then((res1) => {
      if (res1.data.length > 0) {
        const data = res1.data[0];
        let form_data = new FormData();
        form_data.append("todo", this.state.todo);
        form_data.append("team", this.state.team);
        form_data.append("diary", this.state.diary);
        form_data.append("post", this.state.post);
        const url_post = `https://${this.props.url}/allidash/${data.id}/`;
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
            this.setState({ loadingCreate1: false, success: true });
            setTimeout(() => {
              this.setState({
                success: false,
              });
            }, 3000);
          })
          .catch((err) => console.log(err));
          
      } else {
        let form_data = new FormData();
        form_data.append("todo", this.state.todo);
        form_data.append("team", this.state.team);
        form_data.append("diary", this.state.diary);
        form_data.append("post", this.state.post);
        const url_post = `https://${this.props.url}/allidash/`;
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
            this.setState({ loadingCreate1: false, success: true });
            setTimeout(() => {
              this.setState({
                success: false,
              });
            }, 3000);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  handlePrivacy = (event) => {
    event.preventDefault();
    this.setState({ loadingCreate2: true });
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      axios
        .get(`https://${this.props.url}/user_allow/?user=${res.data.id}`)
        .then((res1) => {
          if (res1.data.length > 0) {
            const data = res1.data[0];
            let form_data = new FormData();
            form_data.append("post", this.state.posts);
            form_data.append("images", this.state.images);
            form_data.append("info", this.state.info);
            const url_post = `https://${this.props.url}/user_allow/${data.id}/`;
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
                this.setState({ loadingCreate2: false, success: true });
                setTimeout(() => {
                  this.setState({
                    success: false,
                  });
                }, 3000);
              })
              .catch((err) => console.log(err));
          } else {
            let form_data = new FormData();
            form_data.append("post", this.state.posts);
            form_data.append("images", this.state.images);
            form_data.append("info", this.state.info);
            const url_post = `https://${this.props.url}/user_allow/`;
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
                this.setState({ loadingCreate2: false, success: true });
                setTimeout(() => {
                  this.setState({
                    success: false,
                  });
                }, 3000);
              })
              .catch((err) => console.log(err));
          }
        });
    });
  };

  render() {
    return (
      <Notification
        data={this.state}
        handlePrivacy={this.handlePrivacy}
        handleAllignment={this.handleAllignment}
        handleChange={this.handleChange}
      />
    );
  }
}

Notifications.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(Notifications);
