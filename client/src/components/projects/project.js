import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  Typography,
  Button,
  Paper,
  Tooltip,
  Toolbar,
} from "@material-ui/core";
import ProjectHelp from './components/projectsizeedit.js'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import PeopleIcon from "@material-ui/icons/People";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import Loading from "../../loading.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Menu from "@material-ui/core/Menu";
import { Redirect } from "react-router";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import formatBytes from './components/formatbytes'

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "white",
  },
}));

function Projects(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-08-18T21:11:54")
  );

  const [error, setError] = React.useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.handleEndDate(date);
  };
  const [open3, setOpen3] = React.useState(false);

  function handleClickOpen3(data) {
    setOpen3(true);
    setAnchorEl1(false);
    props.handleData(data);
  }

  function handleClose3() {
    setOpen3(false);
  }

  function handleDelete() {
    handleClose3();
    props.handleDeleteProject();
  }
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const handleClickMore = (event, data) => {
    props.handleID(data);
    setAnchorEl1(event.currentTarget);
  };

  const handleClose11 = () => {
    setAnchorEl1(null);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleMainApplicationUpdate(data) {
    handleClickOpen();
    props.handleProjectId(data);
  }

  const [open0, setOpen0] = React.useState(false);

  const handleClickOpen0 = () => {
    setOpen0(true);
  };

  const handleClose0 = () => {
    setOpen0(false);
  };

  function handleProjectTypeUpdate(data) {
    handleClickOpen0();
    setSelectedValue1(data.preferenece);
    props.handleProjectId(data);
  }

  const [open00, setOpen00] = React.useState(false);

  const handleClickOpen00 = () => {
    setOpen00(true);
  };

  const handleClose00 = () => {
    setOpen00(false);
  };

  function handleStatusUpdate(data) {
    handleClickOpen00();
    setSelectedValue(data.Status);
    props.handleProjectId(data);
  }

  const [open000, setOpen000] = React.useState(false);

  const handleClickOpen000 = () => {
    setOpen000(true);
  };

  const handleClose000 = () => {
    setOpen000(false);
  };

  function handleStorageUpdate(data) {
    handleClickOpen000();
    props.handleProjectId(data);
  }

  const [open0000, setOpen0000] = React.useState(false);

  const handleClickOpen0000 = () => {
    setOpen0000(true);
  };

  const handleClose0000 = () => {
    setOpen0000(false);
  };

  function handleDeadlineUpdate(data) {
    handleClickOpen0000();
    props.handleProjectId(data);
  }

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange4 = (event) => {
    setSelectedValue(event.target.value);
    props.handleStatusText(event.target.value);
  };

  const [selectedValue1, setSelectedValue1] = React.useState("a");

  const handleChange1 = (event) => {
    setSelectedValue1(event.target.value);
    props.handleTypeText(event.target.value);
  };

  const handleMainApplicationUpdate1 = (event) => {
    setOpen(false);
    props.handleMainApplcaitionUpdate(event);
  };

  const handleTypeUpdate1 = (event) => {
    setOpen0(false);
    props.handleTypeUpdate(event);
  };

  const handleStatusUpdate1 = (event) => {
    setOpen00(false);
    props.handleStatusUpdate(event);
  };

  const handleStorageUpdate1 = (event, id, size) => {
    setOpen000(false);
    props.handleStorageUpdate(event,id, size);
  };

  const handleEndDateUpdate1 = (event) => {
    setOpen0000(false);
    props.handleEndDateUpdate(event);
  };

  return (
    <div style={{ width: "100%" }}>
      {props.renderRedirect()}

      <div className={classes.sectionDesktop}>
        <Card
          className="back"
          style={{ boxShadow: "unset", background: "unset", width: "100%" }}
        >
          <CardContent className="card2">
            <Toolbar>
              <div>
                <Toolbar>
                  <img
                    alt="Tasks"
                    src="https://img.icons8.com/material/48/000000/tasks--v1.png"
                    className="card1"
                    style={{ fontSize: "45px" }}
                  />
                  <div className="text">Projects</div>
                </Toolbar>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Tooltip title="Team Project's Join">
                  <Fab
                    color="primary"
                    aria-label="add"
                    style={{ margin: "25px 10px" }}
                    href="/browse"
                  >
                    <img
                      alt="group"
                      src="https://img.icons8.com/material/24/000000/group-of-projects.png"
                      style={{ filter: "invert(100%)" }}
                    />
                  </Fab>
                </Tooltip>
                <Tooltip title="Create Project">
                  <Fab
                    color="primary"
                    aria-label="add"
                    style={{ margin: "25px" }}
                    href="/create-project"
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </div>
            </Toolbar>
          </CardContent>
        </Card>
      </div>

      <div className={classes.sectionMobile}>
        <Card
          className="back"
          style={{ boxShadow: "unset", background: "unset", width: "100%" }}
        >
          <CardContent className="card2">
            <Toolbar>
              <div>
                <Toolbar>
                  <img
                    alt="Tasks"
                    src="https://img.icons8.com/material/48/000000/tasks--v1.png"
                    style={{ fontSize: "45px" }}
                  />
                  <div className="text">Projects</div>
                </Toolbar>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={mobileMoreAnchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  id={mobileMenuId}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={isMobileMenuOpen}
                  onClose={handleMobileMenuClose}
                >
                  <MenuItem onClick={() => props.setRedirect("browse")}>
                    <img
                      alt="group"
                      src="https://img.icons8.com/material/24/000000/group-of-projects.png"
                    />
                    Team Member's Project
                  </MenuItem>
                  <MenuItem onClick={() => props.setRedirect("create-project")}>
                    <PersonAddIcon style={{ marginRight: "10px" }} /> Create
                    Project
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </CardContent>
        </Card>
      </div>
      <div>
        {!props.loading ? (
          <Grid container style={{ width: "100%", padding: "0 20px 50px" }}>
            {props.project_data
              ? props.project_data.map((data) => (
                  <>
                    <Grid item xs={12} sm={6} style={{ padding: "10px" }}>
                      <div className={classes.sectionDesktop}>
                        <Paper
                          key={data.id}
                          elevation={3}
                          style={{
                            flex: "auto",
                            backgroundColor: "azure",
                            borderRadius: "8px",
                          }}
                        >
                          <div style={{ display: "flex", margin: "11px" }}>
                            <img
                              alt="Tasks"
                              src="https://img.icons8.com/material/48/000000/tasks--v1.png"
                              className="card1"
                              style={{ fontSize: "45px", width: "100px" }}
                            />
                            <div style={{ margin: "11px 0" }}>
                              <Typography
                                variant="h6"
                                style={{ textTransform: "capitalize" }}
                              >
                                {data.project_name}
                              </Typography>
                              <Typography
                                style={{ textTransform: "capitalize" }}
                              >
                                Owner:- {data.username}
                              </Typography>
                              <div
                                style={{ display: "flex", marginTop: "5px" }}
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  href={`/project/${data.id}/`}
                                >
                                  View
                                </Button>
                                {data.username === props.username ? (
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => handleClickOpen3(data)}
                                  >
                                    Delete
                                  </Button>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div style={{ margin: "12px", borderRadius: "5px" }}>
                            <Table
                              aria-label="sticky table"
                              style={{
                                background: "lightgrey",
                                borderRadius: "8px",
                                overflow: "hidden",
                              }}
                            >
                              {data.username === props.username ? (
                                <TableBody>
                                  <TableRow key="1">
                                    <TableCell component="th" scope="row">
                                      Start Date
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.start_date}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="2">
                                    <TableCell component="th" scope="row">
                                      DeadLine
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {data.end_date}
                                      <IconButton
                                        onClick={() =>
                                          handleDeadlineUpdate(data)
                                        }
                                        aria-label="end_date"
                                        className={classes.margin}
                                        style={{ padding: "0 3px" }}
                                        size="small"
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="3">
                                    <TableCell component="th" scope="row">
                                      Main Application
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {data.main_application}
                                      <IconButton
                                        aria-label="appication"
                                        className={classes.margin}
                                        style={{ padding: "0 3px" }}
                                        onClick={() =>
                                          handleMainApplicationUpdate(data)
                                        }
                                        size="small"
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="4">
                                    <TableCell component="th" scope="row">
                                      Project Type
                                    </TableCell>
                                    {data.preferenece === "Team" ? (
                                      <TableCell align="right">
                                        
                                        Team
                                        <IconButton
                                          aria-label="type"
                                          style={{ padding: "0 3px" }}
                                          onClick={() =>
                                            handleProjectTypeUpdate(data)
                                          }
                                          className={classes.margin}
                                          size="small"
                                        >
                                          <EditIcon fontSize="inherit" />
                                        </IconButton>
                                      </TableCell>
                                    ) : (
                                      <TableCell align="right">
                                        
                                        Private
                                        <IconButton
                                          aria-label="type"
                                          onClick={() =>
                                            handleProjectTypeUpdate(data)
                                          }
                                          className={classes.margin}
                                          style={{ padding: "0 3px" }}
                                          size="small"
                                        >
                                          <EditIcon fontSize="inherit" />
                                        </IconButton>
                                      </TableCell>
                                    )}
                                  </TableRow>
                                  <TableRow key="5">
                                    <TableCell component="th" scope="row">
                                      Status
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {data.Status}
                                      <IconButton
                                        onClick={() => handleStatusUpdate(data)}
                                        aria-label="status"
                                        style={{ padding: "0 3px" }}
                                        className={classes.margin}
                                        size="small"
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="6">
                                    <TableCell component="th" scope="row">
                                      Allocated Storage
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {formatBytes(data.project_size)}
                                      <IconButton
                                        onClick={() =>
                                          handleStorageUpdate(data)
                                        }
                                        aria-label="space"
                                        style={{ padding: "0 3px" }}
                                        className={classes.margin}
                                        size="small"
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                      {
                                        (open000 && props.datastate.project_size!== 0)?
                                        <ProjectHelp open={open000} handleClose={handleClose000} error={error} setError={setError} handleStorageUpdate1={handleStorageUpdate1} datastate={props.datastate} data={props.datastate.project_size} />:null
                                      }
                                      
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ) : (
                                <TableBody>
                                  <TableRow key="1">
                                    <TableCell component="th" scope="row">
                                      Start Date
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.start_date}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="2">
                                    <TableCell component="th" scope="row">
                                      DeadLine
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.end_date}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="3">
                                    <TableCell component="th" scope="row">
                                      Main Application
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.main_application}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="4">
                                    <TableCell component="th" scope="row">
                                      Project Type
                                    </TableCell>
                                    {data.preferenece === "Team" ? (
                                      <TableCell align="right">Team</TableCell>
                                    ) : (
                                      <TableCell align="right">
                                        Private
                                      </TableCell>
                                    )}
                                  </TableRow>
                                  <TableRow key="5">
                                    <TableCell component="th" scope="row">
                                      Status
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.Status}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="6">
                                    <TableCell component="th" scope="row">
                                      Allocated Storage
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.project_size}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              )}
                            </Table>
                          </div>
                          <div style={{ flexGrow: "1" }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={3}
                                  style={{
                                    minHeight: "130px",
                                    margin: "5px 10px 5px 10px",
                                    background: "aqua",
                                    padding: "10px",
                                  }}
                                >
                                  {data.preferenece === "Team" ? (
                                    <div style={{ display: "flex" }}>
                                      <div style={{ flex: "auto" }}>
                                        <PeopleIcon />
                                        <Typography variant="h6">
                                          Members
                                        </Typography>
                                        <Typography
                                          style={{ fontSize: "15px" }}
                                        >
                                          Working{" "}
                                        </Typography>
                                      </div>
                                      <Typography style={{ fontSize: "70px" }}>
                                        {data.promem.length}
                                      </Typography>
                                    </div>
                                  ) : (
                                    <div>
                                      <img
                                        alt="private"
                                        src="https://img.icons8.com/material/24/000000/user-shield.png"
                                      />
                                      <Typography variant="h6">
                                        Private
                                      </Typography>
                                      <Typography style={{ fontSize: "15px" }}>
                                        Working{" "}
                                      </Typography>
                                    </div>
                                  )}
                                </Paper>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={3}
                                  style={{
                                    minHeight: "130px",
                                    margin: "5px 10px 5px 10px",
                                    padding: "20px",
                                    backgroundColor: "aquamarine",
                                  }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div style={{ flex: "auto" }}>
                                      <img
                                        alt="task"
                                        src="https://img.icons8.com/material/24/000000/task.png"
                                      />
                                      <Typography variant="h6">
                                        Tasks
                                      </Typography>
                                      <Typography style={{ fontSize: "15px" }}>
                                        Total Pending Tasks{" "}
                                      </Typography>
                                    </div>
                                    <Typography style={{ fontSize: "70px" }}>
                                      {data.pending_task_count}
                                    </Typography>
                                  </div>
                                </Paper>
                              </Grid>
                            </Grid>
                          </div>
                        </Paper>
                      </div>
                      <div className={classes.sectionMobile}>
                        <Card
                          className={classes.root}
                          style={{ width: "100%" }}
                        >
                          <CardHeader
                            style={{ backgroundColor: "aqua" }}
                            avatar={
                              <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                              >
                                <img
                                  alt="Tasks"
                                  src="https://img.icons8.com/material/24/000000/tasks--v1.png"
                                />
                              </Avatar>
                            }
                            action={
                              <>
                                <IconButton
                                  aria-label="settings"
                                  onClick={(event) =>
                                    handleClickMore(event, data)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={anchorEl1}
                                  keepMounted
                                  open={Boolean(anchorEl1)}
                                  onClose={handleClose11}
                                >
                                  <MenuItem
                                    onClick={() =>
                                      props.setRedirect(`project/${props.id}/`)
                                    }
                                  >
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleClickOpen3(props.datastate.data)
                                    }
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </>
                            }
                            title={data.project_name}
                            subheader={data.username}
                          />
                          <CardContent>
                            <Table
                              aria-label="sticky table"
                              style={{
                                background: "lightgrey",
                                borderRadius: "8px",
                              }}
                            >
                              {data.username === props.username ? (
                                <TableBody>
                                  <TableRow key="1">
                                    <TableCell component="th" scope="row">
                                      Start Date
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.start_date}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="2">
                                    <TableCell component="th" scope="row">
                                      DeadLine
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {data.end_date}
                                      <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                        onClick={() =>
                                          handleDeadlineUpdate(data)
                                        }
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="3">
                                    <TableCell component="th" scope="row">
                                      Main Application
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {data.main_application}
                                      <IconButton
                                        aria-label="application"
                                        style={{ padding: "0 3px" }}
                                        className={classes.margin}
                                        size="small"
                                        onClick={() =>
                                          handleMainApplicationUpdate(data)
                                        }
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="4">
                                    <TableCell component="th" scope="row">
                                      Project Type
                                    </TableCell>
                                    {data.preferenece === "Team" ? (
                                      <TableCell align="right">
                                        
                                        Team
                                        <IconButton
                                          style={{ padding: "0 3px" }}
                                          aria-label="type"
                                          className={classes.margin}
                                          size="small"
                                          onClick={() =>
                                            handleProjectTypeUpdate(data)
                                          }
                                        >
                                          <EditIcon fontSize="inherit" />
                                        </IconButton>{" "}
                                      </TableCell>
                                    ) : (
                                      <TableCell align="right">
                                        
                                        Private
                                        <IconButton
                                          aria-label="type"
                                          style={{ padding: "0 3px" }}
                                          className={classes.margin}
                                          size="small"
                                          onClick={() =>
                                            handleProjectTypeUpdate(data)
                                          }
                                        >
                                          <EditIcon fontSize="inherit" />
                                        </IconButton>{" "}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                  <TableRow key="5">
                                    <TableCell component="th" scope="row">
                                      Status
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {data.Status}
                                      <IconButton
                                        aria-label="status"
                                        style={{ padding: "0 3px" }}
                                        onClick={() => handleStatusUpdate(data)}
                                        className={classes.margin}
                                        size="small"
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="6">
                                    <TableCell component="th" scope="row">
                                      Allocated Storage
                                    </TableCell>
                                    <TableCell align="right">
                                      
                                      {formatBytes(data.project_size)}
                                      <IconButton
                                        aria-label="space"
                                        style={{ padding: "0 3px" }}
                                        className={classes.margin}
                                        size="small"
                                        onClick={() =>
                                          handleStorageUpdate(data)
                                        }
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ) : (
                                <TableBody>
                                  <TableRow key="1">
                                    <TableCell component="th" scope="row">
                                      Start Date
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.start_date}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="2">
                                    <TableCell component="th" scope="row">
                                      DeadLine
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.end_date}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="3">
                                    <TableCell component="th" scope="row">
                                      Main Application
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.main_application}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="4">
                                    <TableCell component="th" scope="row">
                                      Project Type
                                    </TableCell>
                                    {data.preferenece === "Team" ? (
                                      <TableCell align="right">Team</TableCell>
                                    ) : (
                                      <TableCell align="right">
                                        Private
                                      </TableCell>
                                    )}
                                  </TableRow>
                                  <TableRow key="5">
                                    <TableCell component="th" scope="row">
                                      Status
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.Status}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow key="6">
                                    <TableCell component="th" scope="row">
                                      Allocated Storage
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.project_size}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              )}
                            </Table>
                          </CardContent>
                          <CardActions disableSpacing>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={3}
                                  style={{
                                    minHeight: "130px",
                                    margin: "5px 10px 5px 10px",
                                    minWidth: "130px",
                                    background: "aqua",
                                    padding: "10px",
                                  }}
                                >
                                  {data.preferenece === "Team" ? (
                                    <div style={{ display: "flex" }}>
                                      <div style={{ flexGrow: "1" }}>
                                        <PeopleIcon />
                                        <Typography variant="h6">
                                          Members
                                        </Typography>
                                        <Typography
                                          style={{ fontSize: "15px" }}
                                        >
                                          Working{" "}
                                        </Typography>
                                      </div>
                                      <Typography style={{ fontSize: "70px" }}>
                                        {data.promem.length}
                                      </Typography>
                                    </div>
                                  ) : (
                                    <div>
                                      <img
                                        alt="private"
                                        src="https://img.icons8.com/material/24/000000/user-shield.png"
                                      />
                                      <Typography variant="h6">
                                        Private
                                      </Typography>
                                      <Typography style={{ fontSize: "15px" }}>
                                        Working{" "}
                                      </Typography>
                                    </div>
                                  )}
                                </Paper>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={3}
                                  style={{
                                    minHeight: "130px",
                                    margin: "5px 10px 5px 10px",
                                    padding: "20px",
                                    backgroundColor: "aquamarine",
                                  }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div style={{ flex: "auto" }}>
                                      <img
                                        alt="task"
                                        src="https://img.icons8.com/material/24/000000/task.png"
                                      />
                                      <Typography variant="h6">
                                        Tasks
                                      </Typography>
                                      <Typography style={{ fontSize: "15px" }}>
                                        Total Pending Tasks{" "}
                                      </Typography>
                                    </div>
                                    <Typography style={{ fontSize: "70px" }}>
                                      {data.pending_task_count}
                                    </Typography>
                                  </div>
                                </Paper>
                              </Grid>
                            </Grid>
                          </CardActions>
                        </Card>
                      </div>
                    </Grid>
                  </>
                ))
              : null}
          </Grid>
        ) : (
          <Loading />
        )}
        <Dialog
          open={open3}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose3}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to Delete Project{" "}
              <b style={{ fontSize: "18px" }}>
                {" "}
                {props.datastate.data ? (
                  <>{props.datastate.data.project_name}</>
                ) : null}{" "}
              </b>
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose3} color="primary">
              Disagree
            </Button>
            <Button onClick={() => handleDelete()} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Update Main Application"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="applicaion"
              label="Main Application"
              type="text"
              value={props.datastate.main_application}
              style={{ minWidth: "300px" }}
              onChange={(event) => props.handleMainApplcaitionText(event)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button
              onClick={(event) => handleMainApplicationUpdate1(event)}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={open0}
          onClose={handleClose0}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Update Project Type"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  value="Team"
                  control={
                    <GreenRadio
                      checked={selectedValue1 === "Team"}
                      onChange={handleChange1}
                    />
                  }
                  label="Team"
                  labelPlacement="end"
                ></FormControlLabel>
                <FormControlLabel
                  value="Private"
                  control={
                    <GreenRadio
                      checked={selectedValue1 === "Private"}
                      onChange={handleChange1}
                    />
                  }
                  label="Private"
                  labelPlacement="end"
                ></FormControlLabel>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose0} color="primary">
              Disagree
            </Button>
            <Button
              onClick={(event) => handleTypeUpdate1(event)}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={open00}
          onClose={handleClose00}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Update Project Status"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  value="Success"
                  control={
                    <GreenRadio
                      checked={selectedValue === "Success"}
                      onChange={handleChange4}
                    />
                  }
                  label="Success"
                  labelPlacement="end"
                ></FormControlLabel>
                <FormControlLabel
                  value="Pending"
                  control={
                    <GreenRadio
                      checked={selectedValue === "Pending"}
                      onChange={handleChange4}
                    />
                  }
                  label="Pending"
                  labelPlacement="end"
                ></FormControlLabel>
                <FormControlLabel
                  value="Hold"
                  control={
                    <GreenRadio
                      checked={selectedValue === "Hold"}
                      onChange={handleChange4}
                    />
                  }
                  label="Hold"
                  labelPlacement="end"
                ></FormControlLabel>
                <FormControlLabel
                  value="Error"
                  control={
                    <GreenRadio
                      checked={selectedValue === "Error"}
                      onChange={handleChange4}
                    />
                  }
                  label="Error"
                  labelPlacement="end"
                ></FormControlLabel>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose00} color="primary">
              Disagree
            </Button>
            <Button
              onClick={(event) => handleStatusUpdate1(event)}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Dialog
          fullScreen={fullScreen}
          open={open000}
          onClose={handleClose000}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Update Allocated Storage"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                error={props.datastate.project_size < 0 ? true : false}
                variant="outlined"
                autoFocus
                id="Allocate Storage"
                label="Allocate Storage"
                value={props.datastate.project_size}
                style={{ minWidth: "300px" }}
                onChange={(event) => props.handleStorageText(event)}
                fullWidth
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose000} color="primary">
              Disagree
            </Button>
            {props.datastate.project_size >= 0 ? (
              <Button
                onClick={(event) => handleStorageUpdate1(event)}
                color="primary"
                autoFocus
              >
                Agree
              </Button>
            ) : (
              <Button disabled color="primary" autoFocus>
                Agree
              </Button>
            )}
          </DialogActions>
        </Dialog> */}
        <Dialog
          fullScreen={fullScreen}
          open={open0000}
          onClose={handleClose0000}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Update Project Deadline"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  style={{ width: "100%", padding: "15px" }}
                  label="End Date"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  orientation="landscape"
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(date) => handleDateChange(date)}
                />
              </MuiPickersUtilsProvider>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose0000} color="primary">
              Disagree
            </Button>
            <Button
              onClick={(event) => handleEndDateUpdate1(event)}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

class Project extends Component {
  state = {
    project_data: [],
    loading: true,
    redirect: false,
    redirect1: false,
    data: {},
    id: 0,
    project_update_id: 0,
    main_application: "",
    end_date: 0,
    Status: "",
    project_size: 0,
    preferenece: "",
  };

  handleID = (data) => {
    this.setState({
      data: data,
      id: data.id,
    });
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/create/`).then((res) => {
        this.setState({
          project_data: res.data,
          loading: false,
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/create/`).then((res) => {
        this.setState({
          project_data: res.data,
          loading: false,
        });
      });
    }
  }

  handleDeleteProject = () => {
    this.setState({
      loading: true,
    });
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.delete(`https://${this.props.url}/create/${this.state.data.id}/`);
    this.setState({
      project_data: this.state.project_data.filter((data) => {
        return data.id !== this.state.data.id;
      }),
      loading: false,
    });
  };

  handleData = (data) => {
    this.setState({
      data: data,
    });
  };

  setRedirect = (data) => {
    this.setState({
      redirectTo: data,
      redirect1: true,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect1) {
      this.setState({
        redirect1: false,
      });
      return <Redirect to={`/${this.state.redirectTo}`} />;
    }
  };

  handleProjectId = (data) => {
    this.setState({
      project_update_id: data.id,
      main_application: data.main_application,
      end_date: data.end_date,
      Status: data.Status,
      project_size: data.project_size,
      preferenece: data.preferenece,
    });
  };

  handleMainApplcaitionText = (event) => {
    this.setState({
      main_application: event.target.value,
    });
  };

  handleStatusText = (data) => {
    this.setState({
      Status: data,
    });
  };

  handleTypeText = (data) => {
    this.setState({
      preferenece: data,
    });
  };

  handleStorageText = (event) => {
    this.setState({
      project_size: event.target.value,
    });
  };

  handleEndDate = (date) => {
    const data = moment(date).format("YYYY-MM-DD");
    this.setState({
      end_date: data,
    });
  };

  handleMainApplcaitionUpdate = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("main_application", this.state.main_application);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(
        `https://${this.props.url}/create/${this.state.project_update_id}/`,
        form_data
      )
      .then((res) => {
        this.handleDataAfterUpdate(res.data);
      });
  };

  handleStatusUpdate = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("Status", this.state.Status);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(
        `https://${this.props.url}/create/${this.state.project_update_id}/`,
        form_data
      )
      .then((res) => {
        this.handleDataAfterUpdate(res.data);
      });
  };

  handleTypeUpdate = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("preferenece", this.state.preferenece);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(
        `https://${this.props.url}/create/${this.state.project_update_id}/`,
        form_data
      )
      .then((res) => {
        this.handleDataAfterUpdate(res.data);
      });
  };

  handleStorageUpdate = (event, id, size) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("project_size", parseInt(size));
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(
        `https://${this.props.url}/create/${this.state.project_update_id}/`,
        form_data
      )
      .then((res) => {
        this.handleDataAfterUpdate(res.data);
      });
  };

  handleEndDateUpdate = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("end_date", this.state.end_date);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .patch(
        `https://${this.props.url}/create/${this.state.project_update_id}/`,
        form_data
      )
      .then((res) => {
        this.handleDataAfterUpdate(res.data);
      });
  };

  handleDataAfterUpdate = (data1) => {
    let data = this.state.project_data.filter((fil) => {
      return fil.id !== data1.id;
    });
    data = [data1, ...data];
    this.setState({
      project_data: data.sort(function (a, b) {
        return b.id - a.id;
      }),
    });
  };

  render() {
    return (
      <Projects
        loading={this.state.loading}
        redirect={this.state.redirect}
        renderRedirect={this.renderRedirect}
        setRedirect={this.setRedirect}
        handleData={this.handleData}
        datastate={this.state}
        handleID={this.handleID}
        project_data={this.state.project_data}
        username={this.props.username}
        handleDeleteProject={this.handleDeleteProject}
        id={this.state.id}
        handleProjectId={this.handleProjectId}
        handleMainApplcaitionText={this.handleMainApplcaitionText}
        handleEndDate={this.handleEndDate}
        handleStatusText={this.handleStatusText}
        handleTypeText={this.handleTypeText}
        handleStorageText={this.handleStorageText}
        handleMainApplcaitionUpdate={this.handleMainApplcaitionUpdate}
        handleEndDateUpdate={this.handleEndDateUpdate}
        handleStatusUpdate={this.handleStatusUpdate}
        handleTypeUpdate={this.handleTypeUpdate}
        handleStorageUpdate={this.handleStorageUpdate}
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

export default connect(mapStateToProps)(Project);
