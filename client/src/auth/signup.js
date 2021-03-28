import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { FormControl } from "@material-ui/core";
import axios from "axios";

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
  fab: {
    margin: theme.spacing(1),
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    fontWeight: 700,
    fontFamily: "cursive",
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
}));

function SignUp(props) {
  const classes = useStyles();
  const {
    username,
    password,
    email,
    password1,
    checkerror,
    checkerroremail,
  } = props;
  const isSubmitEnabled = () => {
    const Username = username;
    const Email = email;
    const Password = password;
    const Password1 = password1;
    if (
      Username &&
      Email &&
      Password &&
      Password1 &&
      !checkerror &&
      !checkerroremail &&
      props.password.length >= 7 &&
      props.password.length <= 9 &&
      props.password === props.password1
    ) {
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

  const [values1, setValues1] = React.useState({
    showPassword1: false,
  });

  const handleClickShowPassword1 = () => {
    setValues1({ ...values1, showPassword1: !values1.showPassword1 });
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  return (
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
            <PersonAddIcon className={classes.margin} />
            Register
          </Fab>
          {props.error && <p style={{ color: "red" }}>{props.error}</p>}
          <form
            className={classes.form}
            noValidate
            onSubmit={props.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="username"
                  variant="outlined"
                  error={props.checkerror ? true : false}
                  required
                  fullWidth
                  defaultValue=""
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={props.handleChange}
                />
                {props.checkerror && (
                  <p style={{ color: "red" }}>Username Already Exists.</p>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={props.checkerroremail ? true : false}
                  id="email"
                  label="Email Address"
                  name="email"
                  defaultValue=""
                  autoComplete="off"
                  onChange={props.handleChange}
                />
                {props.checkerroremail && (
                  <p style={{ color: "red" }}>Email Already Exists.</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  style={{ margin: "5px 0 0 0", width: "100%" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="off"
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
                {props.password.length > 0 && props.password.length <= 3 ? (
                  <p style={{ color: "red" }}>Weak</p>
                ) : props.password.length >= 4 && props.password.length <= 6 ? (
                  <p style={{ color: "orange" }}>Good</p>
                ) : props.password.length >= 7 && props.password.length <= 9 ? (
                  <p style={{ color: "green" }}>Strong</p>
                ) : props.password.length >= 10 ? (
                  <p style={{ color: "red" }}>Only 9 character Allow.</p>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  style={{ margin: "5px 0 0 0", width: "100%" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    autoComplete="off"
                    id="outlined-adornment-password"
                    type={values1.showPassword1 ? "text" : "password"}
                    name="password1"
                    value={props.password1}
                    onChange={props.handleChange}
                    required
                    error={
                      props.password1.length > 0 && props.data.errormatch
                        ? true
                        : false
                    }
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                          edge="end"
                        >
                          {values1.showPassword1 ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={135}
                  />
                </FormControl>
                {props.data.password1.length > 0 && props.data.errormatch ? (
                  <p style={{ color: "red" }}>Password Not Match.</p>
                ) : props.data.password1.length > 0 &&
                  !props.data.errormatch ? (
                  <p style={{ color: "green" }}>Password Matched.</p>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="extended"
              color="primary"
              loading={props.loading}
              disabled={!isSubmitEnabled()}
              onClick={() => props.handleLoading()}
              className={classes.submit}
            >
              {props.loading === false ? (
                <Typography>Register</Typography>
              ) : (
                <CircularProgress />
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password1: "",
    redirect: false,
    loading: false,
    user: [],
    erroremail: false,
    error: false,
    errormatch: false,
  };

  componentDidMount() {
    axios.get(`http://${this.props.url}/api/unauth`).then((res) => {
      this.setState({
        user: res.data,
      });
    });
  }

  handleLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "username") {
      const data =
        this.state.user.filter((check) => {
          return check.username === event.target.value;
        }).length > 0
          ? true
          : false;
      this.setState({
        error: data,
      });
    }
    if (event.target.name === "email") {
      const data =
        this.state.user.filter((check) => {
          return check.email === event.target.value;
        }).length > 0
          ? true
          : false;
      this.setState({
        erroremail: data,
      });
    }
    if (event.target.name === "password") {
      if (this.state.password1 !== event.target.value)
        this.setState({
          errormatch: true,
        });
      else {
        this.setState({
          errormatch: false,
        });
      }
    }

    if (event.target.name === "password1") {
      if (this.state.password !== event.target.value)
        this.setState({
          errormatch: true,
        });
      else {
        this.setState({
          errormatch: false,
        });
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password1 } = this.state;
    this.props.onSignup(username, email, password, password1);

    if (this.props.token && !this.props.error) {
      this.handleLoading();
    }
  };

  handlelocation() {
    return <Redirect to="/dashboard" />;
  }
  render() {
    const { error } = this.props;
    const { username, email, password, password1 } = this.state;
    if (this.state.redirect === true) {
      this.setState({
        redirect: false,
      });
      return <Redirect to="/dashboard" />;
    }

    if (error && this.state.loading) {
      this.handleLoading();
    }

    if (this.props.token !== null) {
      this.setState({
        redirect: true,
      });
    }
    return (
      <div>
        <SignUp
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          loading={this.state.loading}
          handleLoading={this.handleLoading}
          error={error}
          username={username}
          email={email}
          checkerror={this.state.error}
          checkerroremail={this.state.erroremail}
          data={this.state}
          password={password}
          password1={password1}
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
    url: state.baseurl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (username, email, password, password1) =>
      dispatch(authSignup(username, email, password, password1)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
