import React, { Component } from "react";
import "./project.css";
import { Typography, Button, Paper, Toolbar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { connect } from "react-redux";
import Loading from "../../../loading.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: "120px",
  },
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
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

function ProDashOwner(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sectionDesktop}>
        <div style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent style={{ background: "cadetblue" }}>
                  <Toolbar>
                    <div style={{ flexGrow: "1" }}>
                      <Typography variant="h6">Pending Tasks</Typography>
                      <Typography variant="h2">
                        {props.data.total_task_count -
                          props.data.success_task_count}
                      </Typography>
                    </div>
                    <Toolbar>
                      <img
                        alt="Tasks"
                        src="https://img.icons8.com/material/48/000000/tasks--v1.png"
                      />
                    </Toolbar>
                  </Toolbar>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent style={{ background: "burlywood" }}>
                  <Toolbar>
                    <div style={{ flexGrow: "1" }}>
                      <Typography variant="h6">Pending Bugs</Typography>
                      <Typography variant="h2">
                        {props.data ? (
                          props.data.total_bugs_count -
                          props.data.success_bugs_count
                        ) : (
                          <Loading />
                        )}
                      </Typography>
                    </div>
                    <Toolbar>
                      <img
                        alt="bugs"
                        src="https://img.icons8.com/material/48/000000/bug.png"
                      />
                    </Toolbar>
                  </Toolbar>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent style={{ background: "cornflowerblue" }}>
                  <Toolbar>
                    <div style={{ flexGrow: "1" }}>
                      <Typography variant="h6">Uploaded File's</Typography>
                      <Typography variant="h2">
                        {props.data.selected_file_count}
                      </Typography>
                    </div>
                    <Toolbar>
                      <img
                        alt="files"
                        src="https://img.icons8.com/material/48/000000/upload-to-cloud.png"
                      />
                    </Toolbar>
                  </Toolbar>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div>
            <div style={{ display: "flex", margin: "20px 0" }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    elevation={3}
                    style={{ background: "aliceblue", height: "100%" }}
                  >
                    <div>
                      <Typography variant="h6" style={{ float: "left" }}>
                        Tasks Status
                      </Typography>
                      <div style={{ textAlign: "right" }}>
                        <img
                          alt="more"
                          src="https://img.icons8.com/material/24/000000/more--v2.png"
                        />
                      </div>
                      <Typography
                        style={{ margin: "25px", textAlign: "center" }}
                      >
                        Not Success{" "}
                        <FiberManualRecordIcon
                          style={{
                            verticalAlign: "bottom",
                            marginRight: "10px",
                            color: "cadetblue",
                          }}
                        />{" "}
                        <FiberManualRecordIcon
                          style={{
                            verticalAlign: "bottom",
                            marginLeft: "10px",
                            color: "grey",
                          }}
                        />{" "}
                        Total
                      </Typography>
                    </div>
                    <div style={{ width: "65%", margin: "auto" }}>
                      <CircularProgressbar
                        value={(
                          ((props.data.total_task_count -
                            props.data.success_task_count) *
                            100) /
                          props.data.total_task_count
                        ).toFixed(2)}
                        text={`${(
                          ((props.data.total_task_count -
                            props.data.success_task_count) *
                            100) /
                          props.data.total_task_count
                        ).toFixed(2)}%`}
                        styles={buildStyles({
                          // This is in units relative to the 100x100px
                          // SVG viewbox.
                          pathColor: "cadetblue",
                          trailColor: "lightgrey",
                          textColor: "green",
                          textSize: "14px",
                        })}
                      />
                    </div>
                    <hr style={{ margin: "20px 0" }} />
                    <div style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        style={{ background: "cadetblue" }}
                        onClick={(event) => props.handleChange(event, 2)}
                      >
                        View Tasks
                      </Button>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    elevation={3}
                    style={{ background: "aliceblue", height: "100%" }}
                  >
                    <div>
                      <Typography variant="h6" style={{ float: "left" }}>
                        BugsFixed Status
                      </Typography>
                      <div style={{ textAlign: "right" }}>
                        <img
                          alt="more"
                          src="https://img.icons8.com/material/24/000000/more--v2.png"
                        />
                      </div>
                      <Typography
                        style={{ margin: "25px", textAlign: "center" }}
                      >
                        Not Success{" "}
                        <FiberManualRecordIcon
                          style={{
                            verticalAlign: "bottom",
                            marginRight: "10px",
                            color: "burlywood",
                          }}
                        />{" "}
                        <FiberManualRecordIcon
                          style={{
                            verticalAlign: "bottom",
                            marginLeft: "10px",
                            color: "grey",
                          }}
                        />{" "}
                        Total
                      </Typography>
                    </div>
                    <div style={{ width: "65%", margin: "auto" }}>
                      <CircularProgressbar
                        value={(
                          ((props.data.total_bugs_count -
                            props.data.success_bugs_count) *
                            100) /
                          props.data.total_bugs_count
                        ).toFixed(2)}
                        text={`${(
                          ((props.data.total_bugs_count -
                            props.data.success_bugs_count) *
                            100) /
                          props.data.total_bugs_count
                        ).toFixed(2)}%`}
                        styles={buildStyles({
                          // This is in units relative to the 100x100px
                          // SVG viewbox.
                          pathColor: "burlywood",
                          trailColor: "lightgrey",
                          textColor: "green",
                          textSize: "14px",
                        })}
                      />
                    </div>
                    <hr style={{ margin: "20px 0" }} />
                    <div style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        style={{ background: "burlywood" }}
                        onClick={(event) => props.handleChange(event, 3)}
                      >
                        View Bugs
                      </Button>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    elevation={3}
                    style={{ background: "aliceblue", height: "100%" }}
                  >
                    <div>
                      <Typography variant="h6" style={{ float: "left" }}>
                        Uploaded File's
                      </Typography>
                      <div style={{ textAlign: "right" }}>
                        <img
                          alt="more"
                          src="https://img.icons8.com/material/24/000000/more--v2.png"
                        />
                      </div>
                      <Typography
                        style={{ margin: "25px", textAlign: "center" }}
                      >
                        Uploaded{" "}
                        <FiberManualRecordIcon
                          style={{
                            verticalAlign: "bottom",
                            marginRight: "10px",
                            color: "cornflowerblue",
                          }}
                        />{" "}
                        <FiberManualRecordIcon
                          style={{
                            verticalAlign: "bottom",
                            marginLeft: "10px",
                            color: "grey",
                          }}
                        />{" "}
                        Total
                      </Typography>
                    </div>
                    <div style={{ width: "65%", margin: "auto" }}>
                      {
                        (props.data.selected_file_size !== null && props.data.project_size !== null)?
                        (
                        <CircularProgressbar
                        value={((props.data.selected_file_size *100) /props.data.project_size).toFixed(2)}
                        text={`${((props.data.selected_file_size *100) /props.data.project_size).toFixed(2)}%`}
                        styles={buildStyles({
                          // This is in units relative to the 100x100px
                          // SVG viewbox.
                          pathColor: "cornflowerblue",
                          trailColor: "lightgrey",
                          textColor: "green",
                          textSize: "14px",
                        })}
                      />
                        ):
                        (
                          <CircularProgressbar
                        value={0}
                        text={'0%'}
                        styles={buildStyles({
                          // This is in units relative to the 100x100px
                          // SVG viewbox.
                          pathColor: "cornflowerblue",
                          trailColor: "lightgrey",
                          textColor: "green",
                          textSize: "14px",
                        })}
                      />
                        )
                      }
                      
                    </div>
                    <hr style={{ margin: "20px 0" }} />
                    <div style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        style={{ background: "cornflowerblue" }}
                        onClick={(event) => props.handleChange(event, 5)}
                      >
                        View File
                      </Button>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sectionMobile}>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
              <Card style={{ width: "100%" }}>
                <CardContent style={{ background: "cadetblue" }}>
                  <Toolbar>
                    <div style={{ flexGrow: "1" }}>
                      <Typography variant="h6">Pending Tasks</Typography>
                      <Typography variant="h2">
                        {props.data.total_task_count -
                          props.data.success_task_count}
                      </Typography>
                    </div>
                    <Toolbar>
                      <img
                        alt="Tasks"
                        src="https://img.icons8.com/material/48/000000/tasks--v1.png"
                      />
                    </Toolbar>
                  </Toolbar>
                </CardContent>
              </Card>
              <Paper
                className={classes.paper}
                elevation={3}
                style={{
                  background: "aliceblue",
                  height: "auto",
                  margin: "20px 0",
                }}
              >
                <div>
                  <Typography variant="h6" style={{ float: "left" }}>
                    Tasks Status
                  </Typography>
                  <div style={{ textAlign: "right" }}>
                    <img
                      alt="more"
                      src="https://img.icons8.com/material/24/000000/more--v2.png"
                    />
                  </div>
                  <Typography style={{ margin: "25px", textAlign: "center" }}>
                    Not Success{" "}
                    <FiberManualRecordIcon
                      style={{
                        verticalAlign: "bottom",
                        marginRight: "10px",
                        color: "cadetblue",
                      }}
                    />{" "}
                    <FiberManualRecordIcon
                      style={{
                        verticalAlign: "bottom",
                        marginLeft: "10px",
                        color: "grey",
                      }}
                    />{" "}
                    Total
                  </Typography>
                </div>
                <div style={{ width: "65%", margin: "auto" }}>
                  <CircularProgressbar
                    value={(
                      ((props.data.total_task_count -
                        props.data.success_task_count) *
                        100) /
                      props.data.total_task_count
                    ).toFixed(2)}
                    text={`${(
                      ((props.data.total_task_count -
                        props.data.success_task_count) *
                        100) /
                      props.data.total_task_count
                    ).toFixed(2)}%`}
                    styles={buildStyles({
                      // This is in units relative to the 100x100px
                      // SVG viewbox.
                      pathColor: "cadetblue",
                      trailColor: "lightgrey",
                      textColor: "green",
                      textSize: "14px",
                    })}
                  />
                </div>
                <hr style={{ margin: "20px 0" }} />
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    style={{ background: "cadetblue" }}
                    onClick={(event) => props.handleChange(event, 2)}
                  >
                    View Tasks
                  </Button>
                </div>
              </Paper>
            </div>
            <div style={{ width: "100%" }}>
              <Card>
                <CardContent style={{ background: "burlywood" }}>
                  <Toolbar>
                    <div style={{ flexGrow: "1" }}>
                      <Typography variant="h6">Pending Bugs</Typography>
                      <Typography variant="h2">
                        {props.data ? (
                          props.data.total_bugs_count -
                          props.data.success_bugs_count
                        ) : (
                          <Loading />
                        )}
                      </Typography>
                    </div>
                    <Toolbar>
                      <img
                        alt="bugs"
                        src="https://img.icons8.com/material/48/000000/bug.png"
                      />
                    </Toolbar>
                  </Toolbar>
                </CardContent>
              </Card>
              <Paper
                className={classes.paper}
                elevation={3}
                style={{
                  background: "aliceblue",
                  height: "100%",
                  margin: "10px 0",
                }}
              >
                <div>
                  <Typography variant="h6" style={{ float: "left" }}>
                    BugsFixed Status
                  </Typography>
                  <div style={{ textAlign: "right" }}>
                    <img
                      alt="more"
                      src="https://img.icons8.com/material/24/000000/more--v2.png"
                    />
                  </div>
                  <Typography style={{ margin: "25px", textAlign: "center" }}>
                    Not Success{" "}
                    <FiberManualRecordIcon
                      style={{
                        verticalAlign: "bottom",
                        marginRight: "10px",
                        color: "burlywood",
                      }}
                    />{" "}
                    <FiberManualRecordIcon
                      style={{
                        verticalAlign: "bottom",
                        marginLeft: "10px",
                        color: "grey",
                      }}
                    />{" "}
                    Total
                  </Typography>
                </div>
                <div style={{ width: "65%", margin: "auto" }}>
                  <CircularProgressbar
                    value={(
                      ((props.data.total_bugs_count -
                        props.data.success_bugs_count) *
                        100) /
                      props.data.total_bugs_count
                    ).toFixed(2)}
                    text={`${(
                      ((props.data.total_bugs_count -
                        props.data.success_bugs_count) *
                        100) /
                      props.data.total_bugs_count
                    ).toFixed(2)}%`}
                    styles={buildStyles({
                      // This is in units relative to the 100x100px
                      // SVG viewbox.
                      pathColor: "burlywood",
                      trailColor: "lightgrey",
                      textColor: "green",
                      textSize: "14px",
                    })}
                  />
                </div>
                <hr style={{ margin: "20px 0" }} />
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    style={{ background: "burlywood" }}
                    onClick={(event) => props.handleChange(event, 3)}
                  >
                    View Bugs
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Card>
              <CardContent style={{ background: "cornflowerblue" }}>
                <Toolbar>
                  <div style={{ flexGrow: "1" }}>
                    <Typography variant="h6">Uploaded File's</Typography>
                    <Typography variant="h2">
                      {props.data.selected_file_count}
                    </Typography>
                  </div>
                  <Toolbar>
                    <img
                      alt="files"
                      src="https://img.icons8.com/material/48/000000/upload-to-cloud.png"
                    />
                  </Toolbar>
                </Toolbar>
              </CardContent>
            </Card>
            <Paper
              className={classes.paper}
              elevation={3}
              style={{
                background: "aliceblue",
                height: "100%",
                margin: "10px 0",
              }}
            >
              <div>
                <Typography variant="h6" style={{ float: "left" }}>
                  Upload File
                </Typography>
                <div style={{ textAlign: "right" }}>
                  <img
                    alt="more"
                    src="https://img.icons8.com/material/24/000000/more--v2.png"
                  />
                </div>
                <Typography style={{ margin: "25px", textAlign: "center" }}>
                  Uploaded{" "}
                  <FiberManualRecordIcon
                    style={{
                      verticalAlign: "bottom",
                      marginRight: "10px",
                      color: "cornflowerblue",
                    }}
                  />{" "}
                  <FiberManualRecordIcon
                    style={{
                      verticalAlign: "bottom",
                      marginLeft: "10px",
                      color: "grey",
                    }}
                  />{" "}
                  Total
                </Typography>
              </div>
              <div style={{ width: "65%", margin: "auto" }}>
                <CircularProgressbar
                  value={(
                    ((props.data.selected_file_size) *
                      100) /
                    props.data.project_size
                  ).toFixed(2)}
                  text={`${(
                    ((props.data.selected_file_size) *
                      100) /
                    props.data.project_size
                  ).toFixed(2)}%`}
                  styles={buildStyles({
                    // This is in units relative to the 100x100px
                    // SVG viewbox.
                    pathColor: "cornflowerblue",
                    trailColor: "lightgrey",
                    textColor: "green",
                    textSize: "14px",
                  })}
                />
              </div>
              <hr style={{ margin: "20px 0" }} />
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  style={{ background: "cornflowerblue" }}
                  onClick={(event) => props.handleChange(event, 5)}
                >
                  View File
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}

class PorjectDashOwner extends Component {
  state = {};

  handleChange = (event, data) => {
    this.props.handleChange(event, Number(data));
  };

  render() {
    return (
      <ProDashOwner data={this.props.data} handleChange={this.handleChange} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
  };
};

export default connect(mapStateToProps)(PorjectDashOwner);
