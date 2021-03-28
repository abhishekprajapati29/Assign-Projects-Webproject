import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import VideoAdd from "./components/videoadd.js";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "60px 20px 0 20px",
  },
}));

function VideoBlocks(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VideoAdd />
    </div>
  );
}

class VideoBlock extends Component {
  render() {
    return <VideoBlocks />;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(VideoBlock);
