import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "4px",
    alignItems: "center",
    padding: theme.spacing(1),
    display: "flex",
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
  },
}));

const SearchInputs = (props) => {
  const { className, onChange, style, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={props.handleChange}
      />
    </Paper>
  );
};

SearchInputs.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

class SearchInput extends Component {
  state = {};

  handleChange = (event) => {
    const { token } = this.props;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + token,
    };
    const searchID = event.target.value;
    axios
      .get(`https://${this.props.url}/diary/?search=${searchID}`)
      .then((res) => {
        this.props.handleDataChange(res.data);
      });
  };

  render() {
    return (
      <div>
        <SearchInputs handleChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(SearchInput);
