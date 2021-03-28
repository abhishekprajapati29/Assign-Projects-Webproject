import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { authLogin } from "../store/actions/auth";
import { loadCSS } from "fg-loadcss";
import { FormControl } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

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

const SignIn = (props) => {
  const classes = useStyles();
  const { username, password } = props;
  const isSubmitEnabled = () => {
    const Username = username;
    const Password = password;
    if (Username && Password) {
      return true;
    }
    return false;
  };

  const [values, setValues] = React.useState({
    amount: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Fab
              size="large"
              variant="extended"
              aria-label="delete"
              className={classes.fab}
            >
              <div className={clsx(classes.margin, "fas fa-sign-in-alt")} />
              LOG IN
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
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
                onChange={props.handleChange}
              />
              <FormControl
                style={{ margin: "5px 0", width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  value={props.password}
                  onChange={props.handleChange}
                  required
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
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
                  <Typography>Log In</Typography>
                ) : (
                  <CircularProgress />
                )}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/forgot_password" variant="body2">
                    Forgot password?
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
  );
};

class Signin extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
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
    const { username, password } = this.state;
    this.props.onLogin(username, password);
    if (this.props.token) {
      this.handleLoading();
    }
    if (this.props.error !== null) {
      this.handleLoading();
    }
  };

  render() {
    const { error, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/dashboard" />;
    }
    if (error && this.state.loading) {
      this.handleLoading();
    }
    return (
      <div>
        <SignIn
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={error}
          username={username}
          password={password}
          loading={this.state.loading}
          handleLoading={this.handleLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => dispatch(authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
