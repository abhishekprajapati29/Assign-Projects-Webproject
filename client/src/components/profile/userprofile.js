import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "../css/CustomButtons/Button";
import GridItem from "../css/Grid/GridItem.js";
import GridContainer from "../css/Grid/GridContainer.js";
import Card from "../css/Card/Card.js";
import CardHeader from "../css/Card/CardHeader.js";
import CardBody from "../css/Card/CardBody.js";
import CardFooter from "../css/Card/CardFooter.js";
import axios from "axios";
import { primaryColor } from "../as.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import LoadSuccess from "../../success.js";

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

function UserProfiles(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.handlecng(event);
  };

  return (
    <>
      {
        <>
          {props.data.loadSuccess ? <LoadSuccess /> : null}
          <div className={classes.root}>
            <CssBaseline />
            <form
              noValidate
              onSubmit={props.handleUpdateSubmitdata}
              onClick={props.handleDataReterieve}
            >
              <GridContainer>
                <GridItem xs={12}>
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
                            autoFocus
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
                              style={{ marginLeft: "-8px" }}
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
                            style={{ marginLeft: "4px" }}
                            value={props.data.occupation}
                            required
                            fullWidth
                            label="Occupation"
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            autoFocus
                            onChange={props.handlecng}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <div className={classes.wrapper}>
                        <Button
                          disabled={props.data.loadCreate}
                          style={{
                            boxShadow:
                              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                          }}
                          color="primary"
                          type="submit"
                        >
                          Update Profile
                        </Button>
                        {props.data.loadCreate && (
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
        </>
      }
    </>
  );
}

class UserProfile extends Component {
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
    loading: true,
    loadSuccess: false,
    loadCreate: false,
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
      loadCreate: true,
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
          this.setState({
            loadCreate: false,
          });
          this.handleSuccess();
          // this.handledata(res.data);
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

  handleImageCreate = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("image", event.target.files[0]);
    const url_post = `https://${this.props.url}/userprofile_image/`;
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
        this.handleData(res.data);
        this.handlelong(res.data);
        localStorage.setItem("profile_image_id", res.data.id);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <UserProfiles
        data={this.state}
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

export default connect(mapStateToProps)(UserProfile);
