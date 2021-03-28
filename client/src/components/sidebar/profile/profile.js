import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Avatar, Typography } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  root1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
    margin: "82px 0",
  },
  avatar: {
    marginTop: "20px",
    width: 130,
    height: 130,
    boxShadow: "0 4px 20px 0 #bdbdbd, 0 7px 10px -5px rgba(244, 67, 54,.4)",
  },
  avatar1: {
    marginTop: "20px",
    width: 50,
    height: 50,
    boxShadow: "0 4px 20px 0 #bdbdbd, 0 7px 10px -5px rgba(244, 67, 54,.4)",
  },
  name: {
    marginTop: theme.spacing(2),
  },
  bio: {
    marginBottom: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
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

const Profiles = (props) => {
  const { username } = props.data.user;
  const { designation } = props.data.profile;
  const { image } = props.data.image;
  const classes = useStyles();
  return (
    <div
      className={clsx({
        [classes.root]: props.handleOpen,
        [classes.root1]: !props.handleOpen,
      })}
    >
      <div className={classes.sectionDesktop}>
        <Avatar
          alt="Person"
          className={clsx({
            [classes.avatar]: props.handleOpen,
            [classes.avatar1]: !props.handleOpen,
          })}
          component={RouterLink}
          src={image}
          to="/profile"
        />
      </div>
      <div className={classes.sectionMobile}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={image}
          to="/profile"
        />
      </div>
      <Typography
        className={clsx({
          [classes.name]: props.handleOpen,
          [classes.hide]: !props.handleOpen,
        })}
        variant="h5"
      >
        <Box
          fontWeight="fontWeightBold"
          fontFamily="Snell Roundhand"
          style={{ textTransform: "uppercase", color: "white" }}
        >
          {username}
        </Box>
      </Typography>
      <Typography
        variant="body2"
        className={clsx({
          [classes.bio]: props.handleOpen,
          [classes.hide]: !props.handleOpen,
        })}
        style={{ color: "white" }}
        fontWeight="fontWeightLight"
      >
        {designation}
      </Typography>
    </div>
  );
};

class Profile extends Component {
  state = {
    user: {},
    profile: {},
    image: {},
  };

  componentDidMount() {
    const { token } = this.props;
    setTimeout(4000);

    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + token,
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      this.setState({
        user: res.data,
        profile: res.data.profile,
        image: res.data.image,
      });
    });
  }
  UNSAFE_componentWillUpdate() {
    const { token } = this.props;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + token,
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
      this.setState({
        profile: res.data.profile,
        image: res.data.image,
      });
    });
  }

  render() {
    return <Profiles data={this.state} handleOpen={this.props.open} />;
  }
}

Profile.propTypes = {
  className: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(Profile);
