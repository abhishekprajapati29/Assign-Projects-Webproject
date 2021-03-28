import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import axios from "axios";
import Loading from "../loading.js";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Alert, AlertTitle } from "@material-ui/lab";

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
    margin: "30% 16px",
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
    if (
      props.data.password === props.data.confirm_password &&
      props.data.password.length >= Number(6) &&
      props.data.confirm_password.length >= Number(6)
    ) {
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
    <>
      {!props.data.confirm ? (
        <>
          {props.loading ? (
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
                  <Loading />
                </Grid>
              </Grid>
            </div>
          ) : (
            <>
              {props.validated ? (
                <>
                  <div>
                    <Grid container component="main" className={classes.root}>
                      <CssBaseline />
                      <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        className={classes.image}
                      />
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
                            <div
                              className={clsx(
                                classes.margin,
                                "fas fa-sign-in-alt"
                              )}
                            />
                            Reset Password
                          </Fab>

                          {props.data.error && (
                            <p style={{ color: "red" }}>{props.data.error}</p>
                          )}
                          <form
                            className={classes.form}
                            noValidate
                            onSubmit={props.handleSubmit}
                          >
                            <FormControl
                              className={clsx(
                                classes.margin,
                                classes.textField
                              )}
                              style={{ width: "96%" }}
                              variant="outlined"
                            >
                              <InputLabel htmlFor="outlined-adornment-password">
                                Password
                              </InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-password"
                                type={
                                  props.data.showPassword ? "text" : "password"
                                }
                                value={props.data.password}
                                placeholder="At Least 6 Character"
                                onChange={(event) => props.handleChange(event)}
                                autoFocus
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        props.handleClickShowPassword()
                                      }
                                      edge="end"
                                    >
                                      {props.data.showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                labelWidth={70}
                              />
                            </FormControl>
                            <FormControl
                              className={clsx(
                                classes.margin,
                                classes.textField
                              )}
                              style={{ width: "96%" }}
                              variant="outlined"
                            >
                              <InputLabel htmlFor="outlined-adornment-password">
                                Confirm Password
                              </InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-password"
                                type={
                                  props.data.confirm_showPassword
                                    ? "text"
                                    : "password"
                                }
                                value={props.data.confirm_password}
                                onChange={(event) =>
                                  props.handleChangeConfirm(event)
                                }
                                placeholder="At Least 6 Character"
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        props.handleClickShowPasswordConfirm()
                                      }
                                      edge="end"
                                    >
                                      {props.data.confirm_showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                labelWidth={130}
                              />
                            </FormControl>
                            <Button
                              type="submit"
                              fullWidth
                              variant="outlined"
                              color="primary"
                              loading={props.data.loading_submit}
                              className={classes.submit}
                              disabled={!isSubmitEnabled()}
                              onClick={() => props.handleLoading()}
                            >
                              {!props.data.loading_submit ? (
                                <Typography>Submit</Typography>
                              ) : (
                                <CircularProgress />
                              )}
                            </Button>

                            <Grid container>
                              <Grid item xs>
                                <Link href="/signin" variant="body2">
                                  Log In
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
                  </div>
                </>
              ) : (
                <div>
                  <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid
                      item
                      xs={false}
                      sm={4}
                      md={7}
                      className={classes.image}
                    />
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
                        <h2>Re-Send The Link</h2>
                        <Button href="/forgot_password" color="blue">
                          GO
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              )}
            </>
          )}
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
                  <strong>Password Reset Successfully.</strong>
                </Alert>
                <h3>
                  <a href="/signin">Sign In</a>
                </h3>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

class ForgotValidateConfirm extends Component {
  state = {
    validated: false,
    password: "",
    error: null,
    loading: false,
    confirm: false,
    showPassword: false,
    confirm_showPassword: false,
    confirm_password: "",
    loading_submit: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const token = this.props.match.params.validateID;
    console.log(token);
    let form_data = new FormData();
    form_data.append("token", token);
    const url_post = `https://abhishekpraja.pythonanywhere.com/reset/validate_token/`;
    axios
      .post(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          validated: true,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const token = this.props.match.params.validateID;
    console.log(token);
    let form_data = new FormData();
    form_data.append("password", this.state.password);
    form_data.append("token", token);
    const url_post = `https://abhishekpraja.pythonanywhere.com/reset/confirm/`;
    axios
      .post(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          confirm: true,
          loading_submit: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.password[0],
          loading_submit: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleClickShowPasswordConfirm = () => {
    this.setState({
      confirm_showPassword: !this.state.confirm_showPassword,
    });
  };

  handleChangeConfirm = (event) => {
    this.setState({
      confirm_password: event.target.value,
    });
  };

  handleLoading = () => {
    this.setState({
      loading_submit: !this.state.loading_submit,
    });
  };

  render() {
    console.log(this.state.showPassword, this.state.password);
    return (
      <div>
        <Forgots
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          Status={this.state.Status}
          handleClickShowPassword={this.handleClickShowPassword}
          handleChangeConfirm={this.handleChangeConfirm}
          data={this.state}
          validated={this.state.validated}
          loading={this.state.loading}
          handleClickShowPasswordConfirm={this.handleClickShowPasswordConfirm}
          handleLoading={this.handleLoading}
        />
      </div>
    );
  }
}

export default ForgotValidateConfirm;
