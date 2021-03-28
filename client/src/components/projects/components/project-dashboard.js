import React, { Component } from "react";
import "./project.css";
import {
  Typography,
  Button,
  Paper,
  TextField,
  Toolbar,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import LoadSuccess from "../../../success.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function getSteps() {
  return ["Task Name", "Status", "Task Detail"];
}

function GetStepContent(props) {
  switch (props.index) {
    case 0:
      return (
        <div style={{ width: "100%", height: "auto", borderRadius: "11px" }}>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              props.handleText(data);
            }}
            data={props.value1}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "insertTable",
                "undo",
                "|",
                "redo",
                "Outdent",
                "Indent",
                "|",
                "FontSize",
              ],
            }}
          />
        </div>
      );
    case 1:
      return (
        <>
          <FormControl component="fieldset" style={{ marginRight: "30%" }}>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={props.status}
              onClick={props.handleChange}
              style={{ display: "unset" }}
            >
              <FormControlLabel
                value="Success"
                control={<Radio />}
                label="Success"
              />
              <FormControlLabel
                style={{ textAlign: "right" }}
                value="Pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel value="Hold" control={<Radio />} label="Hold" />
              <FormControlLabel
                value="Closed"
                control={<Radio />}
                label="Closed"
              />
              <FormControlLabel
                value="Error"
                control={<Radio />}
                label="Error"
              />
              <FormControlLabel
                value="Unknown"
                control={<Radio />}
                label="Unknown"
              />
            </RadioGroup>
          </FormControl>
        </>
      );

    case 2:
      return (
        <TextField
          id="outlined-number"
          type="text"
          style={{ width: "100%" }}
          multiline
          name="value2"
          value={props.value2}
          onChange={props.handleValue}
          rows="4"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      );
    default:
      return "Unknown step";
  }
}

function ProDash(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const taskPer = (
    (props.task.filter((data) => {
      return data.status !== "Success";
    }).length *
      100) /
    props.task.length
  ).toFixed(2);
  const bugsPer = (
    (props.bugs.filter((data) => {
      return data.status !== "Success";
    }).length *
      100) /
    props.bugs.length
  ).toFixed(2);
  const reportPer = (
    (props.reportList.filter((data) => {
      return data.status !== "Success";
    }).length *
      100) /
    props.reportList.length
  ).toFixed(2);
  return (
    <>
      <div className={classes.sectionDesktop}>
        <div style={{ display: "flex", margin: "0px 60px" }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper
                className={classes.paper}
                elevation={3}
                style={{ background: "cadetblue" }}
              >
                <div style={{ float: "left" }}>
                  <Typography variant="h6">Pending Tasks</Typography>
                  <Typography variant="h2">
                    {props.task.length > 0
                      ? props.task.filter((data) => {
                          return data.status !== "Success";
                        }).length
                      : 0}
                  </Typography>
                </div>
                <div style={{ textAlign: "right" }}>
                  <img
                    alt="Tasks"
                    src="https://img.icons8.com/material/48/000000/tasks--v1.png"
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                className={classes.paper}
                elevation={3}
                style={{ background: "burlywood" }}
              >
                <div style={{ float: "left" }}>
                  <Typography variant="h6">Pending Bugs</Typography>
                  <Typography variant="h2">
                    {props.bugs.length > 0
                      ? props.bugs.filter((data) => {
                          return data.status !== "Success";
                        }).length
                      : 0}
                  </Typography>
                </div>
                <div style={{ textAlign: "right" }}>
                  <img
                    alt="bugs"
                    src="https://img.icons8.com/material/48/000000/bug.png"
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                className={classes.paper}
                elevation={3}
                style={{ background: "cornflowerblue" }}
              >
                <div style={{ float: "left" }}>
                  <Typography variant="h6">Total Report</Typography>
                  <Typography variant="h2">
                    {props.reportList.length > 0
                      ? props.reportList.filter((data) => {
                          return data.status !== "Success";
                        }).length
                      : 0}
                  </Typography>
                </div>
                <div style={{ textAlign: "right" }}>
                  <img
                    alt="Report"
                    src="https://img.icons8.com/material/48/000000/business-report.png"
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div style={{ display: "flex", margin: "20px 60px" }}>
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
                    value={taskPer === "NaN" ? 0 : taskPer}
                    text={`${taskPer === "NaN" ? 0 : taskPer}%`}
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
                    onClick={(event) => props.handleChange1(event, 2)}
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
                    value={bugsPer}
                    text={`${bugsPer}%`}
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
                    onClick={(event) => props.handleChange1(event, 3)}
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
                    Reported Status
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
                    value={reportPer}
                    text={`${reportPer}%`}
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
                    onClick={(event) => props.handleChange1(event, 4)}
                  >
                    View Report
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        {/* Porject Member list take it from Dashboard */}
        <div></div>

        <div style={{ display: "flex", margin: "60px 60px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                elevation={3}
                style={{ background: "aliceblue", height: "100%" }}
              >
                <div>
                  <img
                    alt="activity"
                    style={{ float: "left", marginRight: "10px" }}
                    src="https://img.icons8.com/material/48/000000/business-report.png"
                  />
                  <div>
                    <Typography variant="h3">Today's Report</Typography>
                  </div>
                  <br />
                  <hr />
                  {props.loadSuccess ? <LoadSuccess /> : null}
                  <br />
                </div>
                <div className={classes.root}>
                  {props.reportExists.length === 0 ? (
                    <Stepper
                      activeStep={activeStep}
                      orientation="vertical"
                      style={{ height: "auto" }}
                    >
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                          <StepContent>
                            <GetStepContent
                              index={index}
                              status={props.status}
                              value1={props.value1}
                              value2={props.value2}
                              handleText={props.handleText}
                              handleValue={props.handleValue}
                              handleChange={props.handleChange}
                            />
                            <div className={classes.actionsContainer}>
                              <div>
                                <Button
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                  className={classes.button}
                                >
                                  Back
                                </Button>
                                {activeStep !== steps.length - 1 ? (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                  >
                                    Next
                                  </Button>
                                ) : (
                                  <div className={classes.wrapper}>
                                    {props.reportExistsUpdate.length === 0 ? (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(event) =>
                                          props.handleSubmitReport(event)
                                        }
                                        className={classes.button}
                                        disabled={props.loadCreate}
                                      >
                                        Finish
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(event) =>
                                          props.handleTodayUpdateReport(event)
                                        }
                                        className={classes.button}
                                        disabled={props.loadCreate}
                                      >
                                        Finish
                                      </Button>
                                    )}
                                    {props.loadCreate && (
                                      <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  ) : (
                    <Paper style={{ padding: "10px" }} elevation={3}>
                      <Typography>
                        {ReactHtmlParser(props.report.report)}
                      </Typography>
                      <hr />
                      <div style={{ display: "flex", marginTop: "15px" }}>
                        <Typography style={{ fontSize: "x-large" }}>
                          Status:-
                        </Typography>
                        <Typography
                          style={{ fontSize: "x-large", marginLeft: "10px" }}
                        >
                          {props.report.status}
                        </Typography>
                      </div>
                      <hr />
                      <div style={{ marginTop: "15px" }}>
                        <Typography
                          style={{ marginTop: "10px", fontSize: "x-large" }}
                        >
                          Comment:-
                        </Typography>
                        <Typography style={{ fontSize: "large" }}>
                          {props.report.comment}
                        </Typography>
                      </div>
                    </Paper>
                  )}
                </div>
                <hr style={{ margin: "20px 0" }} />
                {props.reportExists.length !== 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      style={{ background: "cornflowerblue" }}
                      onClick={() => props.handleUpdateReport()}
                    >
                      Update Today Report
                    </Button>
                  </div>
                ) : null}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.sectionMobile}>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%" }}>
                <Card style={{ width: "100%" }}>
                  <CardContent style={{ background: "cadetblue" }}>
                    <Toolbar>
                      <div style={{ flexGrow: "1" }}>
                        <Typography variant="h6">Pending Tasks</Typography>
                        <Typography variant="h2">
                          {props.task.length > 0
                            ? props.task.filter((data) => {
                                return data.status !== "Success";
                              }).length
                            : 0}
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
                    margin: "20px 0",
                    height: "100%",
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
                      value={taskPer === "NaN" ? 0 : taskPer}
                      text={`${taskPer === "NaN" ? 0 : taskPer}%`}
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
                      onClick={(event) => props.handleChange1(event, 2)}
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
                          {props.bugs.length > 0
                            ? props.bugs.filter((data) => {
                                return data.status !== "Success";
                              }).length
                            : 0}
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
                      value={bugsPer}
                      text={`${bugsPer}%`}
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
                      onClick={(event) => props.handleChange1(event, 3)}
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
                      <Typography variant="h6">Total Report</Typography>
                      <Typography variant="h2">
                        {props.reportList.length > 0
                          ? props.reportList.filter((data) => {
                              return data.status !== "Success";
                            }).length
                          : 0}
                      </Typography>
                    </div>
                    <Toolbar>
                      <img
                        alt="Report"
                        src="https://img.icons8.com/material/48/000000/business-report.png"
                      />
                    </Toolbar>
                  </Toolbar>
                </CardContent>
              </Card>
              <Paper
                className={classes.paper}
                elevation={3}
                style={{
                  margin: "10px 0",
                  background: "aliceblue",
                  height: "100%",
                }}
              >
                <div>
                  <Typography variant="h6" style={{ float: "left" }}>
                    Reported Status
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
                    value={reportPer}
                    text={`${reportPer}%`}
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
                    onClick={(event) => props.handleChange1(event, 4)}
                  >
                    View Report
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
          {/* Porject Member list take it from Dashboard */}
          <div></div>

          <div style={{ display: "flex", margin: "20px 0" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  className={classes.paper}
                  elevation={3}
                  style={{ background: "aliceblue", height: "100%" }}
                >
                  <div>
                    <img
                      alt="activity"
                      style={{ float: "left", marginRight: "10px" }}
                      src="https://img.icons8.com/material/48/000000/business-report.png"
                    />
                    <div>
                      <Typography variant="h3">Today's Report</Typography>
                    </div>
                    <br />
                    <hr />
                    {props.loadSuccess ? <LoadSuccess /> : null}
                    <br />
                  </div>
                  <div className={classes.root}>
                    {props.reportExists.length === 0 ? (
                      <Stepper
                        activeStep={activeStep}
                        orientation="vertical"
                        style={{ height: "auto" }}
                      >
                        {steps.map((label, index) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                              <GetStepContent
                                index={index}
                                status={props.status}
                                value1={props.value1}
                                value2={props.value2}
                                handleText={props.handleText}
                                handleValue={props.handleValue}
                                handleChange={props.handleChange}
                              />
                              <div className={classes.actionsContainer}>
                                <div>
                                  <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                  >
                                    Back
                                  </Button>
                                  {activeStep !== steps.length - 1 ? (
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={handleNext}
                                      className={classes.button}
                                    >
                                      Next
                                    </Button>
                                  ) : (
                                    <div className={classes.wrapper}>
                                      {props.reportExistsUpdate.length === 0 ? (
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={(event) =>
                                            props.handleSubmitReport(event)
                                          }
                                          className={classes.button}
                                          disabled={props.loadCreate}
                                        >
                                          Finish
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={(event) =>
                                            props.handleTodayUpdateReport(event)
                                          }
                                          className={classes.button}
                                          disabled={props.loadCreate}
                                        >
                                          Finish
                                        </Button>
                                      )}
                                      {props.loadCreate && (
                                        <CircularProgress
                                          size={24}
                                          className={classes.buttonProgress}
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                    ) : (
                      <Paper style={{ padding: "10px" }} elevation={3}>
                        <Typography>
                          {ReactHtmlParser(props.report.report)}
                        </Typography>
                        <hr />
                        <div style={{ display: "flex", marginTop: "15px" }}>
                          <Typography style={{ fontSize: "x-large" }}>
                            Status:-
                          </Typography>
                          <Typography
                            style={{ fontSize: "x-large", marginLeft: "10px" }}
                          >
                            {props.report.status}
                          </Typography>
                        </div>
                        <hr />
                        <div style={{ marginTop: "15px" }}>
                          <Typography
                            style={{ marginTop: "10px", fontSize: "x-large" }}
                          >
                            Comment:-
                          </Typography>
                          <Typography style={{ fontSize: "large" }}>
                            {props.report.comment}
                          </Typography>
                        </div>
                      </Paper>
                    )}
                  </div>
                  <hr style={{ margin: "20px 0" }} />
                  {props.reportExists.length !== 0 ? (
                    <div style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        style={{ background: "cornflowerblue" }}
                        onClick={() => props.handleUpdateReport()}
                      >
                        Update Today Report
                      </Button>
                    </div>
                  ) : null}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

class PorjectDash extends Component {
  state = {
    id: -1,
    value1: "",
    value2: "",
    status: "none",
    loadCreate: false,
    loadSuccess: false,
  };

  handleValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleText = (data) => {
    this.setState({
      value1: data,
    });
  };

  handleChange = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  handleTodayUpdateReport = (event) => {
    this.setState({
      loadCreate: true,
    });
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("report", this.state.value1);
    form_data.append("comment", this.state.value2);
    form_data.append("status", this.state.status);
    const url_post = `https://${this.props.url}/project-report/${this.state.id}`;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.props.handleReportExists();
        this.setState({
          loadCreate: false,
        });
        this.handleSuccess();
      })
      .catch((err) => console.log(err));
  };

  handleSubmitReport = (event) => {
    this.setState({
      loadCreate: true,
    });
    const { data } = this.props;
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("report", this.state.value1);
    form_data.append("posted_by", this.props.username);
    form_data.append("project_id", data.id);
    form_data.append("comment", this.state.value2);
    form_data.append("status", this.state.status);
    const url_post = `https://${this.props.url}/project-report/`;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .post(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.props.handleReportExists();
        this.setState({
          loadCreate: false,
        });
        this.handleSuccess();
      })
      .catch((err) => console.log(err));
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

  handleChange1 = (event, data) => {
    this.props.handleChange(event, Number(data));
  };

  handleUpdateReport = () => {
    this.setState({
      id: this.props.reportExists[0].id,
      value1: this.props.reportExists[0].report,
      value2: this.props.reportExists[0].comment,
      status: this.props.reportExists[0].status,
    });
    this.props.handleUpdateReport();
  };

  render() {
    return (
      <ProDash
        data={this.props.data}
        id={this.state.id}
        handleTodayUpdateReport={this.handleTodayUpdateReport}
        reportExistsUpdate={this.props.reportExistsUpdate}
        status={this.state.status}
        handleUpdateReport={this.handleUpdateReport}
        handleChange1={this.handleChange1}
        loadCreate={this.state.loadCreate}
        loadSuccess={this.state.loadSuccess}
        reportList={this.props.report}
        reportExists={this.props.reportExists}
        report={this.props.reportExists[0]}
        task={this.props.task}
        bugs={this.props.bugs}
        value1={this.state.value1}
        value2={this.state.value2}
        handleText={this.handleText}
        handleValue={this.handleValue}
        handleChange={this.handleChange}
        handleSubmitReport={this.handleSubmitReport}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(PorjectDash);
