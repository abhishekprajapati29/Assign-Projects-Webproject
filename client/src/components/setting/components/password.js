import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import CardHeader from "../../css/Card/CardHeader";
import Card from "../../css/Card/Card";
import Button from "../../css/CustomButtons/Button";
import { connect } from "react-redux";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  CardContent,
  CardActions,
  Divider,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
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

const Passwords = (props) => {
  const { className } = props;
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      style={{
        boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
      }}
    >
      <form>
        <CardHeader
          color="danger"
          style={{
            boxShadow:
              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
          }}
        >
          <h4 className={classes.cardTitleWhite}>Password</h4>
          <p className={classes.cardCategoryWhite}>Update password</p>
        </CardHeader>
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={props.handleChange}
            type="password"
            value={props.data.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={props.handleChange}
            style={{ marginTop: "1rem" }}
            type="password"
            value={props.data.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <div className={classes.wrapper}>
            <Button
              color="danger"
              variant="outlined"
              onClick={(event) => props.handleData()}
              disabled={props.data.loading}
              style={{
                boxShadow:
                  "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
              }}
            >
              Update
            </Button>
            {props.data.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardActions>
      </form>
    </Card>
  );
};

class Password extends React.Component {
  state = {
    password: "",
    confirm: null,
    loading: false,
    loadSuccess: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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

  handleData = (event) => {
    if (this.state.password === this.state.confirm) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        const id = res.data.id;
        let form_data = new FormData();
        form_data.append("password", this.state.password);
        const url_patch = `https://${this.props.url}/userprofileUpdate/${id}/`;
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios
          .patch(url_patch, form_data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.openNotification();
            this.setState({
              password: "",
              confirm: "",
            });
          })
          .catch((err) => console.log(err));
      });
      this.openNotification();
    } else {
      console.log("not");
    }
  };

  openNotification = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      this.handleSuccess();
    }, 5000);
  };

  render() {
    return (
      <>
        {this.state.loadSuccess ? (
          <Alert severity="success" style={{ width: "100%" }}>
            <AlertTitle>Success</AlertTitle>
            Password Reset successfully.
          </Alert>
        ) : (
          <></>
        )}
        <Passwords
          data={this.state}
          handleData={this.handleData}
          handleChange={this.handleChange}
        />
      </>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(Password);
