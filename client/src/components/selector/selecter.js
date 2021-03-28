import React, { Component } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Paper, Toolbar } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Typography from "@material-ui/core/Typography";
import File from "./components/file";
import FileMobile from "./components/mobilefile";
import Album from "./components/album";
import AlbumMobile from "./components/mobilealbum";
import Video from "./components/video";
import VideoMobile from "./components/mobilevideo";
import Project from "./components/project";
import ProjectMobile from "./components/mobileproject";
import { connect } from "react-redux";
import Plan_detail from "../../plan-detail";
import axios from "axios";
import formatBytes from "../../formatbytes";
import HelpIcon from "@material-ui/icons/Help";
import SubDetail from "./components/sub_detail";
import IconButton from "@material-ui/core/IconButton";
import Loading from '../../loading.js'

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  root1: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    // backgroundImage:
    //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    backgroundColor: "aquamarine",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: "aquamarine",
    // backgroundImage:
    //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: (
      <img
        alt="images"
        src="https://img.icons8.com/color/24/000000/image.png"
      />
    ),
    2: (
      <img
        alt="doc"
        src="https://img.icons8.com/color/24/000000/documents.png"
      />
    ),
    3: (
      <img alt="video" src="https://img.icons8.com/color/24/000000/video.png" />
    ),
    4: (
      <img
        alt="project"
        src="https://img.icons8.com/fluent/24/000000/project.png"
      />
    ),
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function ColorlibStepIcon1(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: (
      <img
        alt="images"
        src="https://img.icons8.com/color/24/000000/image.png"
        style={{ width: "1em", height: "auto" }}
      />
    ),
    2: (
      <img
        alt="doc"
        src="https://img.icons8.com/color/24/000000/documents.png"
        style={{ width: "1em", height: "auto" }}
      />
    ),
    3: (
      <img
        alt="video"
        src="https://img.icons8.com/color/24/000000/video.png"
        style={{ width: "1em", height: "auto" }}
      />
    ),
    4: (
      <img
        alt="project"
        src="https://img.icons8.com/fluent/24/000000/project.png"
        style={{ width: "1em", height: "auto" }}
      />
    ),
  };

  return (
    <div
      className={clsx(classes.root1, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
    "Select campaign settings",
  ];
}

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%" }}>Select Album's</Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            {props.datastate.album_data ? (
              <Album
                data={props.datastate.album_data}
                handleCheckedLeftAlbum={props.handleCheckedLeftAlbum}
                handleCheckedRightAlbum={props.handleCheckedRightAlbum}
              />
            ) : null}
          </Paper>
        </div>
      );
    case 1:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%" }}>Select File's</Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            <File
              data={props.datastate.file_data}
              handleCheckedLeftFile={props.handleCheckedLeftFile}
              handleCheckedRightFile={props.handleCheckedRightFile}
            />
          </Paper>
        </div>
      );
    case 2:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%" }}>Select Video's</Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            <Video
              data={props.datastate.video_data}
              handleCheckedLeftVideo={props.handleCheckedLeftVideo}
              handleCheckedRightVideo={props.handleCheckedRightVideo}
            />
          </Paper>
        </div>
      );
    case 3:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%" }}>Select Project</Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            <Project
              data={props.datastate.project_data}
              loader={props.loader}
              fileloader={props.fileloader}
              memberloader={props.memberloader}
              datastate={props.datastate}
              project_size_edit={props.datastate.project_size_edit}
              handleToggleMember={props.handleToggleMember}
              username={props.username}
              url={props.url}
              token={props.token}
              loading={props.datastate.loading_project}
              handleToggleFile={props.handleToggleProjectFile}
              handleProjectSelect={props.handleProjectSelect}
              handleStorageText={props.handleStorageText}
              subs_detail={props.datastate.subs_detail}
              
            />
          </Paper>
        </div>
      );
    default:
      return "Unknown step";
  }
}

function getStepContent1(step, props) {
  switch (step) {
    case 0:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%", textAlign: "center" }}>
            Select Album's
          </Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            <AlbumMobile
              data={props.datastate.album_data}
              handleToggleAlbum={props.handleToggleAlbum}
              mobileAlbumLoader={props.mobileAlbumLoader}
              
            />
          </Paper>
        </div>
      );
    case 1:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%", textAlign: "center" }}>
            Select File's
          </Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            <FileMobile
              data={props.datastate.file_data}
              handleToggleFile={props.handleToggleFile}
              mobileFileLoader={props.mobileFileLoader}
             
            />
          </Paper>
        </div>
      );
    case 2:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%", textAlign: "center" }}>
            Select Video's
          </Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            <VideoMobile
              data={props.datastate.video_data}
              handleToggleVideo={props.handleToggleVideo}
              mobileVideoLoader={props.mobileVideoLoader}
              
            />
          </Paper>
        </div>
      );
    case 3:
      return (
        <div style={{ height: "100%" }}>
          <Typography style={{ height: "5%", textAlign: "center" }}>
            Select Project
          </Typography>
          <hr />
          <Paper
            style={{
              backgroundColor: "aliceblue",
              width: "100%",
              height: "90%",
              boxShadow: "none",
            }}
          >
            <ProjectMobile
              data={props.datastate.project_data}
              project_size={props.datastate.project_size}
              handleToggleMember={props.handleToggleMember}
              username={props.username}
              url={props.url}
              token={props.token}
              loading={props.datastate.loading_project}
              handleToggleFile={props.handleToggleProjectFile}
              handleProjectSelect={props.handleProjectSelect}
              handleStorageText={props.handleStorageText}
              subs_detail={props.datastate.subs_detail}
              mobileProjectLoader={props.mobileProjectLoader}
              mobileProjectFileLoader={props.mobileProjectFileLoader}
    mobileProjectMemberLoader={props.mobileProjectMemberLoader}
            />
          </Paper>
        </div>
      );
    default:
      return "Unknown step";
  }
}

function Selecters(props) {
  const classes = useStyles();
  const [open] = React.useState(true);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    props.handleReset();
  };

  const [open12, setOpen12] = React.useState(false);

  const handleClickOpen12 = () => {
    setOpen12(true);
  };

  const handleClose12 = () => {
    setOpen12(false);
  };

  const handleFinalSubmit = () => {
    props.handleFinalSubmit();
  };

  return (
    <div>
      <div className={classes.sectionDesktop}>
        <Backdrop className={classes.backdrop} open={open}>
          {props.datastate.reset_loading ? (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : null}
          <Paper
            style={{
              width: "80%",
              height: "81%",
              padding: "1%",
              backgroundColor: "aliceblue",
              overflow: "auto",
            }}
          >
            <div style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <Typography style={{ fontWeight: 800 }}>
                  Select the Content Under Your Subs Limit.
                </Typography>
              </div>
              <hr />
              <div>
                <Toolbar>
                  <Typography>Avaliable Space:- </Typography>
                  <Typography>
                    {formatBytes(props.datastate.subs_storage)}{" "}
                  </Typography>
                  <Toolbar style={{ minHeight: "0", flexGrow: "1" }}>
                    <Typography style={{ marginLeft: "auto" }}>
                      Subscription Type:-{" "}
                    </Typography>
                    <Typography>
                      {" "}
                      {props.datastate.subs_detail.type}{" "}
                    </Typography>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      style={{ marginRight: "auto" }}
                      onClick={handleClickOpen12}
                    >
                      <HelpIcon style={{ color: "blue" }} />
                    </IconButton>
                    <SubDetail
                      open={open12}
                      data={props.datastate.subs_detail}
                      handleClose={handleClose12}
                    />
                  </Toolbar>
                  <Toolbar style={{ marginLeft: "auto" }}>
                    <Typography>Selected Space:- </Typography>
                    <Typography>
                      {formatBytes(
                        props.datastate.video_size +
                          props.datastate.file_size +
                          props.datastate.album_size +
                          props.datastate.project_size
                      )}{" "}
                    </Typography>
                  </Toolbar>
                </Toolbar>
              </div>
              <hr />
            </div>
            <div style={{ width: "100%", backgroundColor: "aliceblue" }}>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                style={{ backgroundColor: "aliceblue" }}
              >
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div style={{ height: "inherit" }}>
                {activeStep === steps.length ? (
                  <div style={{ height: "100%" }}>
                    <Typography className={classes.instructions}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      Reset
                    </Button>
                    <Button
                      onClick={handleFinalSubmit}
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div style={{ height: "100%", overflow: "auto" }}>
                    <Typography
                      component={"div"}
                      className={classes.instructions}
                      style={{ height: "88%" }}
                    >
                      {getStepContent(activeStep, props)}
                    </Typography>
                    <div style={{ textAlignLast: "end", overflow: "auto" }}>
                      {props.datastate.video_size +
                        props.datastate.file_size +
                        props.datastate.album_size +
                        props.datastate.project_size >
                        props.datastate.subs_storage &&
                      activeStep === steps.length - 1 ? (
                        <div key="1" style={{ textAlignLast: "end" }}>
                          <Button
                            disabled={
                              activeStep === 0 ||
                              props.datastate.video_size +
                                props.datastate.file_size +
                                props.datastate.album_size +
                                props.datastate.project_size >
                                props.datastate.subs_storage
                            }
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            disabled
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                      ) : (
                        <div style={{ textAlignLast: "end" }}>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Backdrop>
      </div>
      <div className={classes.sectionMobile}>
        <Backdrop className={classes.backdrop} open={open}>
          {props.datastate.reset_loading ? (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : null}
          <Paper
            style={{
              width: "90%",
              height: "90%",
              padding: "2%",
              backgroundColor: "aliceblue",
              overflow: "auto",
            }}
          >
            <div style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <Typography style={{ fontWeight: 500 }}>
                  Select the Content Under Your Subs Limit.
                </Typography>
              </div>
              <hr />
              <div>
                <Toolbar style={{ minHeight: "0" }}>
                  <Typography>Avaliable Space:- </Typography>
                  <Typography style={{ marginLeft: "auto" }}>
                    {formatBytes(props.datastate.subs_storage)}{" "}
                  </Typography>
                </Toolbar>
                <Toolbar style={{ minHeight: "0" }}>
                  <Typography>Subscription Type:- </Typography>
                  <Typography style={{ marginLeft: "auto" }}>
                    {props.datastate.subs_detail.type}{" "}
                  </Typography>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={handleClickOpen12}
                  >
                    <HelpIcon style={{ color: "blue" }} />
                  </IconButton>
                  <SubDetail
                    open={open12}
                    data={props.datastate.subs_detail}
                    handleClose={handleClose12}
                  />
                </Toolbar>
                <Toolbar style={{ minHeight: "0" }}>
                  <Typography>Selected Space:- </Typography>
                  <Typography style={{ marginLeft: "auto" }}>
                    {formatBytes(
                      props.datastate.video_size +
                        props.datastate.file_size +
                        props.datastate.album_size +
                        props.datastate.project_size
                    )}{" "}
                  </Typography>
                </Toolbar>
              </div>
              <hr />
            </div>
            <div style={{ width: "100%" }}>
              <Stepper
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                style={{ backgroundColor: "aliceblue", top: 0 }}
              >
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel
                      StepIconComponent={ColorlibStepIcon1}
                    ></StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div style={{ height: "inherit" }}>
                {activeStep === steps.length ? (
                  <div style={{ height: "100%" }}>
                    <Typography
                      component={"div"}
                      className={classes.instructions}
                    >
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      Reset
                    </Button>
                    <Button
                      onClick={handleFinalSubmit}
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div style={{ height: "100%" }}>
                    <Typography
                      component={"div"}
                      className={classes.instructions}
                      style={{ height: "91%" }}
                    >
                      {getStepContent1(activeStep, props)}
                    </Typography>
                    <>
                      {props.datastate.video_size +
                        props.datastate.file_size +
                        props.datastate.album_size +
                        props.datastate.project_size >
                        props.datastate.subs_storage &&
                      activeStep === steps.length - 1 ? (
                        <div key="2" style={{ textAlignLast: "end" }}>
                          <Button
                            disabled={
                              activeStep === 0 ||
                              props.datastate.video_size +
                                props.datastate.file_size +
                                props.datastate.album_size +
                                props.datastate.project_size >
                                props.datastate.subs_storage
                            }
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            disabled
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                      ) : (
                        <div style={{ textAlignLast: "end" }}>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                      )}
                    </>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Backdrop>
      </div>
    </div>
  );
}

class Selecter extends Component {
  state = {
    main_loader: false,
    subs_storage: 0,
    subs_detail: {},
    album_data: [],
    album_size: 0,
    file_data: [],
    file_size: 0,
    video_data: [],
    video_size: 0,
    project_data: [],
    project_size: 0,
    loading_project: false,
    project_size_edit: 0,
    reset_loading: false,
    loader: [0],
    fileloader: [0],
    memberloader: [0],
    mobileAlbumLoader: [0],
    mobileFileLoader: [0],
    mobileVideoLoader: [0],
    mobileProjectLoader: [0],
    mobileProjectFileLoader: [0],
    mobileProjectMemberLoader: [0],
  };

  componentDidMount = async () => {
    this.setState({
      main_loader: true
    })
    if (this.props.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      await axios
        .get(`https://${this.props.url}/Subs/?username=${this.props.username}`)
        .then((res) => {
          const sub = res.data[0];
          const final_sub = Plan_detail.filter((fil) => {
            return fil.price === Number(sub.amount);
          })[0];
          this.setState({
            subs_storage: final_sub.cloud_storage_value,
            subs_detail: final_sub,
          });
        });
      await axios.get(`https://${this.props.url}/imagesall/`).then((album) => {
        const selected = album.data.filter((fil) => {
          return fil.selected === true;
        });
        let sum = 0;
        selected.forEach((data) => {
          if (data.imagelistsize) {
            sum = sum + data.imagelistsize;
          }
        });
        this.setState({
          album_data: album.data,
          album_size: sum,
        });
      });
      await axios.get(`https://${this.props.url}/fileall/`).then((file) => {
        const selected = file.data.filter((fil) => {
          return fil.selected === true;
        });
        let sum = 0;
        selected.forEach((data) => {
          if (data.size) {
            sum = sum + data.size;
          }
        });
        this.setState({
          file_data: file.data,
          file_size: sum,
        });
      });
      await axios.get(`https://${this.props.url}/videoall/`).then((video) => {
        const selected = video.data.filter((fil) => {
          return fil.selected === true;
        });
        let sum = 0;
        selected.forEach((data) => {
          if (data.size) {
            sum = sum + data.size;
          }
        });
        this.setState({
          video_data: video.data,
          video_size: sum,
        });
      });
      await axios
        .get(`https://${this.props.url}/create-all/`)
        .then(async (project) => {
          const selected = project.data.filter((fil) => {
            return fil.selected === true;
          });
          let sum = 0;
          await selected.forEach((data) => {
            if (data.project_size) {
              sum = sum + data.project_size;
            }
          });
          this.setState({
            project_data: project.data,
            project_size: sum,
            main_loader: false
          });
        });
    }
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      main_loader: true
    })
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios
        .get(`https://${this.props.url}/Subs/?username=${this.props.username}`)
        .then((res) => {
          const sub = res.data[0];
          const final_sub = Plan_detail.filter((fil) => {
            return fil.price === Number(sub.amount);
          })[0];
          this.setState({
            subs_storage: final_sub.cloud_storage_value,
            subs_detail: final_sub,
          });
        });
      axios.get(`https://${this.props.url}/imagesall/`).then((album) => {
        const selected = album.data.filter((fil) => {
          return fil.selected === true;
        });
        let sum = 0;
        selected.forEach((data) => {
          if (data.imagelistsize) {
            sum = sum + data.imagelistsize;
          }
        });
        this.setState({
          album_data: album.data,
          album_size: sum,
        });
      });
      axios.get(`https://${this.props.url}/fileall/`).then((file) => {
        const selected = file.data.filter((fil) => {
          return fil.selected === true;
        });
        let sum = 0;
        selected.forEach((data) => {
          if (data.size) {
            sum = sum + data.size;
          }
        });
        this.setState({
          file_data: file.data,
          file_size: sum,
        });
      });
      axios.get(`https://${this.props.url}/videoall/`).then((video) => {
        const selected = video.data.filter((fil) => {
          return fil.selected === true;
        });
        let sum = 0;
        selected.forEach((data) => {
          if (data.size) {
            sum = sum + data.size;
          }
        });
        this.setState({
          video_data: video.data,
          video_size: sum,
        });
      });
      axios.get(`https://${this.props.url}/create-all/`).then((project) => {
        const selected = project.data.filter((fil) => {
          return fil.selected === true;
        });
        let sum = 0;
        selected.forEach((data) => {
          if (data.project_size) {
            sum = sum + data.project_size;
          }
        });
        this.setState({
          project_data: project.data,
          project_size: sum,
          main_loader: false
        });
      });
    }
  }

  handleCheckedLeftAlbum = (data) => {
    let form_data = new FormData();
    form_data.append("selected", false);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    data.forEach((a) => {
      axios
        .patch(`https://${this.props.url}/imagesall/${a.id}/`, form_data)
        .then((res) => {
          let data1 = this.state.album_data.filter((fil) => {
            return fil.id !== a.id;
          });
          data1 = [...data1, res.data];
          this.setState({
            album_data: data1.sort(function (a, b) {
              return a.id - b.id;
            }),
            album_size: this.state.album_size - res.data.imagelistsize,
          });
        });
    });
  };

  handleCheckedRightAlbum = (data) => {
    let form_data = new FormData();
    form_data.append("selected", true);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    data.forEach((a) => {
      axios
        .patch(`https://${this.props.url}/imagesall/${a.id}/`, form_data)
        .then((res) => {
          let data1 = this.state.album_data.filter((fil) => {
            return fil.id !== a.id;
          });
          data1 = [...data1, res.data];
          this.setState({
            album_data: data1.sort(function (a, b) {
              return a.id - b.id;
            }),
            album_size: this.state.album_size + res.data.imagelistsize,
          });
        });
    });
  };

  handleCheckedLeftFile = async (data) => {
    let form_data = new FormData();
    form_data.append("selected", false);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    await data.forEach((a) => {
      axios
        .patch(`https://${this.props.url}/fileall/${a.id}/`, form_data)
        .then((res) => {
          let data = this.state.file_data.filter((fil) => {
            return fil.id !== a.id;
          });
          data = [...data, res.data];
          let sum = 0;
          data.forEach((file) => {
            if (file.selected) {
              sum = sum + file.size;
            }
          });
          this.setState({
            file_data: data.sort(function (a, b) {
              return a.id - b.id;
            }),
            file_size: sum,
          });
        });
    });
  };

  handleCheckedRightFile = async (data) => {
    let form_data = new FormData();
    form_data.append("selected", true);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    await data.forEach((a) => {
      axios
        .patch(`https://${this.props.url}/fileall/${a.id}/`, form_data)
        .then((res) => {
          let data = this.state.file_data.filter((fil) => {
            return fil.id !== a.id;
          });
          data = [...data, res.data];
          let sum = 0;
          data.forEach((file) => {
            if (file.selected) {
              sum = sum + file.size;
            }
          });
          this.setState({
            file_data: data.sort(function (a, b) {
              return a.id - b.id;
            }),
            file_size: sum,
          });
        });
    });
  };

  handleCheckedLeftVideo = async (data) => {
    let form_data = new FormData();
    form_data.append("selected", false);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    await data.forEach((a) => {
      axios
        .patch(`https://${this.props.url}/videoall/${a.id}/`, form_data)
        .then((res) => {
          let data = this.state.video_data.filter((fil) => {
            return fil.id !== a.id;
          });
          data = [...data, res.data];
          let sum = 0;
          data.forEach((video) => {
            if (video.selected) {
              sum = sum + video.size;
            }
          });
          this.setState({
            video_data: data.sort(function (a, b) {
              return a.id - b.id;
            }),
            video_size: sum,
          });
        });
    });
  };

  handleCheckedRightVideo = async (data) => {
    let form_data = new FormData();
    form_data.append("selected", true);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    await data.forEach((a) => {
      axios
        .patch(`https://${this.props.url}/videoall/${a.id}/`, form_data)
        .then((res) => {
          let data = this.state.video_data.filter((fil) => {
            return fil.id !== a.id;
          });
          data = [...data, res.data];
          let sum = 0;
          data.forEach((video) => {
            if (video.selected) {
              sum = sum + video.size;
            }
          });
          this.setState({
            video_data: data.sort(function (a, b) {
              return a.id - b.id;
            }),
            video_size: sum,
          });
        });
    });
  };

  handleProjectSelect = (id, selected) => {
    this.setState({
      loader: [...this.state.loader, id],
      mobileProjectLoader: [...this.state.mobileProjectLoader, id]
    });

    let form_data = new FormData();
    form_data.append("selected", !selected);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(`https://${this.props.url}/create-all/${id}/`, form_data)
      .then((res) => {
        let data = this.state.project_data.filter((fil) => {
          return fil.id !== res.data.id;
        });
        data = [...data, res.data];
        let sum = 0;
        data.forEach((project) => {
          if (project.selected) {
            sum = sum + project.project_size;
          }
        });
        this.setState({
          project_data: data.sort(function (a, b) {
            return b.id - a.id;
          }),
          project_size: sum,
          loader: this.state.loader.filter(item => item !== id),
          mobileProjectLoader: this.state.mobileProjectLoader.filter(item => item !== id)
        });
      });
  };

  handleToggleProjectFile = (id, selected) => {
    this.setState({
      fileloader: [...this.state.fileloader, id],
      mobileProjectFileLoader: [...this.state.mobileProjectFileLoader, id]
    })
    let form_data = new FormData();
    form_data.append("selected", !selected);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(`https://${this.props.url}/project-file-all/${id}/`, form_data)
      .then((res) => {
        axios.get(`https://${this.props.url}/create-all/`).then((res1) => {
          this.setState({
            project_data: res1.data,
            fileloader: this.state.fileloader.filter(item => item !== id),
            mobileProjectFileLoader: this.state.mobileProjectFileLoader.filter(item => item !== id),
          });
        });
      });
  };

  handleToggleMember = (id, selected) => {
    this.setState({
      memberloader: [...this.state.memberloader, id],
      mobileProjectMemberLoader: [...this.state.mobileProjectMemberLoader, id]
    })
    let form_data = new FormData();
    form_data.append("selected", !selected);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(`https://${this.props.url}/project-member-all/${id}/`, form_data)
      .then((res) => {
        axios.get(`https://${this.props.url}/create-all/`).then((res1) => {
          this.setState({
            project_data: res1.data,
            memberloader: this.state.memberloader.filter(item => item !== id),
            mobileProjectMemberLoader: this.state.mobileProjectMemberLoader.filter(item => item !== id),
          });
        });
      });
  };

  handleToggleAlbum = (id, selected) => {
    this.setState({
      mobileAlbumLoader: [...this.state.mobileAlbumLoader, id]
    })
    let form_data = new FormData();
    form_data.append("selected", !selected);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(`https://${this.props.url}/imagesall/${id}/`, form_data)
      .then((res) => {
        let data = this.state.album_data.filter((fil) => {
          return fil.id !== id;
        });
        data = [...data, res.data];
        let sum = 0;
        data.forEach((album) => {
          if (album.selected) {
            sum = sum + album.imagelistsize;
          }
        });
        this.setState({
          album_data: data.sort(function (a, b) {
            return a.id - b.id;
          }),
          album_size: sum,
          mobileAlbumLoader: this.state.mobileAlbumLoader.filter(item => item !== id),
          
        });
      });
  };

  handleToggleFile = (id, selected) => {
    this.setState({
      mobileFileLoader: [...this.state.mobileFileLoader, id]
    })
    let form_data = new FormData();
    form_data.append("selected", !selected);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(`https://${this.props.url}/fileall/${id}/`, form_data)
      .then((res) => {
        let data = this.state.file_data.filter((fil) => {
          return fil.id !== id;
        });
        data = [...data, res.data];
        let sum = 0;
        data.forEach((file) => {
          if (file.selected) {
            sum = sum + file.size;
          }
        });
        this.setState({
          file_data: data.sort(function (a, b) {
            return a.id - b.id;
          }),
          file_size: sum,
          mobileFileLoader: this.state.mobileFileLoader.filter(item=> item !== id)
        });
      });
  };

  handleToggleVideo = (id, selected) => {
    this.setState({
      mobileVideoLoader: [...this.state.mobileVideoLoader, id]
    })
    let form_data = new FormData();
    form_data.append("selected", !selected);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(`https://${this.props.url}/videoall/${id}/`, form_data)
      .then((res) => {
        let data = this.state.video_data.filter((fil) => {
          return fil.id !== id;
        });
        data = [...data, res.data];
        let sum = 0;
        data.forEach((video) => {
          if (video.selected) {
            sum = sum + video.size;
          }
        });
        this.setState({
          video_data: data.sort(function (a, b) {
            return a.id - b.id;
          }),
          video_size: sum,
          mobileVideoLoader: this.state.mobileVideoLoader.filter(item=> item !== id)
        });
      });
  };

  handleStorageText = (event, id, size) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("project_size", size);
    let form_data1 = new FormData();
    form_data1.append("selected", false);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(`https://${this.props.url}/create-all/${id}/`, form_data)
      .then(async (res) => {
        await res.data.file.forEach((file) => {
          if (file.selected) {
            axios.patch(
              `https://${this.props.url}/project-file/${file.id}/`,
              form_data1
            );
          }
        });
        await res.data.promem.forEach((mem) => {
          if (mem.selected && mem.member !== this.props.username) {
            axios.patch(
              `https://${this.props.url}/project-member/${mem.id}/`,
              form_data1
            );
          }
        });
        await axios
          .get(`https://${this.props.url}/create-all/${id}/`)
          .then((aa) => {
            this.handleDataAfterUpdate1(aa.data);
          });
      });
  };

  handleDataAfterUpdate1 = (data1) => {
    let data = this.state.project_data.filter((fil) => {
      return fil.id !== data1.id;
    });
    data = [data1, ...data];
    let sum = 0;
    data.forEach((d) => {
      if (d.selected && d.project_size) {
        sum = sum + d.project_size;
      }
    });
    this.setState({
      project_data: data.sort(function (a, b) {
        return b.id - a.id;
      }),
      project_size: sum,
    });
  };

  handleDataAfterUpdate = (data1) => {
    let data = this.state.project_data.filter((fil) => {
      return fil.id !== data1.id;
    });
    data = [data1, ...data];
    let sum = 0;
    data.forEach((d) => {
      if (d.selected && d.project_size) {
        sum = sum + d.project_size;
      }
    });
    this.setState({
      project_data: data.sort(function (a, b) {
        return b.id - a.id;
      }),
      project_size: sum,
    });
  };

  handleFinalSubmit = () => {
    let form_data = new FormData();
    form_data.append("selected", false);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/api/auth/user`).then((re) => {
      axios
        .get(`https://${this.props.url}/userprofile/?user=${re.data.id}`)
        .then((re1) => {
          const data = re1.data[0];
          const id = data.id;
          axios
            .patch(`https://${this.props.url}/userprofile/${id}/`, form_data)
            .then((res) => {
              window.location.assign("/");
            });
        });
    });
  };

  handleReset = async () => {
    this.setState({
      reset_loading: true,
    });
    let form_data = new FormData();
    form_data.append("selected", false);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    await axios.get(`https://${this.props.url}/images/`).then((res) => {
      res.data.forEach((data) => {
        if (data.selected) {
          axios
            .patch(`https://${this.props.url}/images/${data.id}/`, form_data)
            .then((res1) => {
              let data = this.state.album_data.filter((fil) => {
                return fil.id !== res1.data.id;
              });
              data = [res1.data, ...data];
              this.setState({
                album_data: data.sort(function (a, b) {
                  return a.id - b.id;
                }),
                album_size: 0,
              });
            });
        }
      });
    });
    await axios.get(`https://${this.props.url}/file/`).then((res) => {
      res.data.forEach((data) => {
        if (data.selected) {
          axios
            .patch(`https://${this.props.url}/file/${data.id}/`, form_data)
            .then((res1) => {
              let data = this.state.file_data.filter((fil) => {
                return fil.id !== res1.data.id;
              });
              data = [res1.data, ...data];
              this.setState({
                file_data: data.sort(function (a, b) {
                  return a.id - b.id;
                }),
                file_size: 0,
              });
            });
        }
      });
    });
    await axios.get(`https://${this.props.url}/video/`).then((res) => {
      res.data.forEach((data) => {
        if (data.selected) {
          axios
            .patch(`https://${this.props.url}/video/${data.id}/`, form_data)
            .then((res1) => {
              let data = this.state.video_data.filter((fil) => {
                return fil.id !== res1.data.id;
              });
              data = [res1.data, ...data];
              this.setState({
                video_data: data.sort(function (a, b) {
                  return a.id - b.id;
                }),
                video_size: 0,
              });
            });
        }
      });
    });
    await axios.get(`https://${this.props.url}/create-all/`).then((res) => {
      res.data.forEach((data) => {
        if (data.selected) {
          axios
            .patch(
              `https://${this.props.url}/create-all/${data.id}/`,
              form_data
            )
            .then((res1) => {
              let data = this.state.project_data.filter((fil) => {
                return fil.id !== res1.data.id;
              });
              data = [res1.data, ...data];
              this.setState({
                project_data: data.sort(function (a, b) {
                  return b.id - a.id;
                }),
                project_size: 0,
              });
            });
        }
      });
    });
    this.setState({
      reset_loading: false,
    });
  };

  render() {
    return (
      <>
        {
          (this.state.main_loader)?
          <Loading />
          :
          <Selecters
        datastate={this.state}
        username={this.props.username}
        handleToggleMember={this.handleToggleMember}
        token={this.props.token}
        url={this.props.url}
        handleToggleProjectFile={this.handleToggleProjectFile}
        handleProjectSelect={this.handleProjectSelect}
        handleCheckedLeftFile={this.handleCheckedLeftFile}
        handleCheckedRightFile={this.handleCheckedRightFile}
        handleCheckedLeftAlbum={this.handleCheckedLeftAlbum}
        handleCheckedRightAlbum={this.handleCheckedRightAlbum}
        handleCheckedLeftVideo={this.handleCheckedLeftVideo}
        handleCheckedRightVideo={this.handleCheckedRightVideo}
        handleToggleAlbum={this.handleToggleAlbum}
        handleToggleFile={this.handleToggleFile}
        handleToggleVideo={this.handleToggleVideo}
        handleStorageText={this.handleStorageText}
        handleFinalSubmit={this.handleFinalSubmit}
        handleReset={this.handleReset}
        loader={this.state.loader}
        fileloader={this.state.fileloader}
        memberloader={this.state.memberloader}
        mobileAlbumLoader={this.state.mobileAlbumLoader}
        mobileFileLoader={this.state.mobileFileLoader}
        mobileVideoLoader={this.state.mobileVideoLoader}
        mobileProjectLoader={this.state.mobileProjectLoader}
        mobileProjectFileLoader={this.state.mobileProjectFileLoader}
    mobileProjectMemberLoader={this.state.mobileProjectMemberLoader}
      />
        }
      </>
      
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

export default connect(mapStateToProps)(Selecter);
