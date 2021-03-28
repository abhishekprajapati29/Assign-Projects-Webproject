import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { loadCSS } from "fg-loadcss";
import { Alert, AlertTitle } from "@material-ui/lab";

import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "} */}
      {new Date().getFullYear()}
      {/* {". Built with "} */}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link> */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: "30% 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "black",
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    fontWeight: 700,
    fontStyle: "inherit",

    fontFamily: "cursive",
    fontSize: "initial",
  },
  fab: {
    margin: theme.spacing(1),
    fontFamily: "cursive",
    fontWeight: "400",
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Forgots = (props) => {
  const classes = useStyles();
  const isSubmitEnabled = () => {
    if (props.email) {
      return true;
    }
    return false;
  };
  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  return (
    <div>
      {!props.success ? (
        <>
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Fab
                  size="large"
                  variant="extended"
                  aria-label="delete"
                  className={classes.fab}
                >
                  <div className={clsx(classes.margin, "fas fa-sign-in-alt")} />
                  Forgot Password
                </Fab>

                {props.error && <p style={{ color: "red" }}>{props.error}</p>}
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={props.handleSubmit}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    defaultValue=""
                    label="Email"
                    name="email"
                    autoComplete="off"
                    autoFocus
                    onChange={props.handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    loading={props.loading}
                    className={classes.submit}
                    disabled={!isSubmitEnabled()}
                    onClick={() => props.handleLoading()}
                  >
                    {!props.loading ? (
                      <Typography>Reset Link Send</Typography>
                    ) : (
                      <CircularProgress />
                    )}
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link href="/signin" variant="body2">
                        Login In
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <div>
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Alert
                  severity="success"
                  style={{ width: "100%", height: "100px" }}
                >
                  <AlertTitle>Success</AlertTitle>
                  <strong>Password Reset Link Successfully.</strong>
                </Alert>
                <h3>
                  <a href="/forgot_password">Resend</a>
                </h3>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

class Forgot extends Component {
  state = {
    email: "",
    loading: false,
    success: false,
    error: null,
  };

  handleLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    let form_data = new FormData();
    form_data.append("email", email);
    const url_post = `https://abhishekpraja.pythonanywhere.com/reset/`;
    axios
      .post(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.handleLoading();
        this.setState({
          success: true,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.email[0],
        });
        this.handleLoading();
      });
  };

  render() {
    return (
      <div>
        <Forgots
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          email={this.state.email}
          error={this.state.error}
          success={this.state.success}
          loading={this.state.loading}
          handleLoading={this.handleLoading}
        />
      </div>
    );
  }
}
export default Forgot;
