import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileAdd from "./components/Document/fileadd.js";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "60px 20px 0 20px",
  },
  tab: {
    background: "linear-gradient(45deg, #2196F3 30%, #2196F3 90%)",
  },
  card: {
    width: "100%",
    height: "100%",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
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
}));

function FileBlocks(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FileAdd />
    </div>
  );
}

class FileBlock extends Component {
  render() {
    return <FileBlocks />;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(FileBlock);
