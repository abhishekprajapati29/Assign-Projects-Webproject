import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
// core components
import TextField from "@material-ui/core/TextField";
import Button from "../../css/CustomButtons/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import Card from "../../css/Card/Card.js";
import CardHeader from "../../css/Card/CardHeader.js";
import CardBody from "../../css/Card/CardBody.js";
import CardFooter from "../../css/Card/CardFooter.js";
import { primaryColor } from "../../as.js";
import { connect } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  root1: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
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

const Contactuss = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.data.success ? (
        <div className={classes.root1}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>Form Submited Successfully.</strong>
          </Alert>
        </div>
      ) : null}
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
          <h4 className={classes.cardTitleWhite}>Contact Us</h4>
          <p className={classes.cardCategoryWhite}>
            We will try our best to clear your Issue.
          </p>
        </CardHeader>
        <br />
        <CardBody style={{ fontSize: "50px", margin: "10px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            value={props.data.subject}
            name="subject"
            required
            fullWidth
            label="Subject"
            autoFocus
            onChange={(event) => props.handlecng(event)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            value={props.data.content}
            name="content"
            required
            fullWidth
            multiline
            rows={8}
            label="Message"
            onChange={(event) => props.handlecng(event)}
          />
        </CardBody>
        <CardFooter>
          <div className={classes.wrapper}>
            <Button
              onClick={(event) => props.handleSubmit(event)}
              style={{
                boxShadow:
                  "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
              }}
              disabled={props.data.loading}
              color="primary"
              type="submit"
            >
              submit
            </Button>
            {props.data.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

class ContactUs extends Component {
  state = {
    subject: "",
    content: "",
    loading: false,
    success: false,
  };

  handlecng = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      let form_data = new FormData();
      form_data.append("user", res.data.id);
      form_data.append("email", res.data.email);
      form_data.append("username", res.data.username);
      form_data.append("subject", this.state.subject);
      form_data.append("message", this.state.content);
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      const url_post = `https://${this.props.url}/contact_us/`;
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
        .then((res1) => {
          this.setState({
            loading: false,
            success: true,
          });
          setTimeout(() => {
            this.setState({
              success: false,
            });
          }, 3000);

          const { subject } = this.state;
          this.createData(res1.data);
        })
        .catch((err) => console.log(err));
    });
  };

  createData = (data) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    let form_data = new FormData();
    form_data.append("user", data.id);
    form_data.append("email", data.email);
    form_data.append("username", data.username);
    form_data.append("subject", data.subject);
    form_data.append("message", data.message);
    axios
      .post("https://contact-us-mail.herokuapp.com/api/form", form_data, {
        headers,
      })
      .then((res1) => {
        this.setState({
          subject: "",
          content: "",
        });
      });
  };

  render() {
    return (
      <Contactuss
        data={this.state}
        handlecng={this.handlecng}
        handleSubmit={this.handleSubmit}
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

export default connect(mapStateToProps)(ContactUs);
