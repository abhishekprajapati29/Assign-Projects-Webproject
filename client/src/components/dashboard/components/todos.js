import React, { Component } from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import CardHeader from "../../css/Card/CardHeader";
import Card from "../../css/Card/Card";
import CardFooter from "../../css/Card/CardFooter";
import CardIcon from "../../css/Card/CardIcon";
import GridItem from "../../css/Grid/GridItem";
import GridContainer from "../../css/Grid/GridContainer";
import "../components/App.css";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FilterListIcon from "@material-ui/icons/FilterList";
import moment from "moment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Switch from "@material-ui/core/Switch";
import AccessTime from "@material-ui/icons/AccessTime";
import LinearProgress from "@material-ui/core/LinearProgress";
import Plan_detail from "../../../plan-detail";
import PersonIcon from "@material-ui/icons/Person";
import Skeleton from "@material-ui/lab/Skeleton";
import formatBytes from "../../../formatbytes.js";

import {
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Table,
} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  stats: {
    color: "black",
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: "black",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
    padding: "0 15px",
  },
  cardCategoryWhite: {
    color: "white",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: "black",
    padding: "0 15px",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontSize: "20px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "black",
      fontWeight: "600",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: "black",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "black",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardIcon: {
    borderRadius: "3px",
    padding: "15px",
    marginTop: "-20px",
    marginRight: "15px",
    float: "left",
    background: "linear-gradient(60deg, #ffb74d 40%, #ff8731 60%)",
  },
  marginContent: {
    padding: "15px",
    justifyContent: "left",
  },
}));

function sumProperty(arr, type) {
  return arr.reduce((total, obj) => {
    if(obj['selected'] === true){
      if (typeof obj[type] === "string" ) {
        return total + Number(obj[type]);
      }
      return total + obj[type];
    }
    return total
  }, 0);
}

function Todos(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const { data } = props;
  const todoslistFalse = data.filter((todo) => {
    return todo.completed !== true;
  });
  const todoslistTrue = data.filter((todo) => {
    return todo.completed === true;
  });

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? "panel" + panel : false);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose1() {
    setAnchorEl(null);
  }

  function handleAll() {
    handleClose1();
    props.handleAll();
  }

  function handleToday() {
    handleClose1();
    props.handleTodayData();
  }

  function handleWeek() {
    handleClose1();
    props.handleWeekData();
  }

  function handleMonth() {
    handleClose1();
    props.handleMonthData();
  }

  const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten("#ff6c5c", 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: "#ff6c5c",
    },
  })(LinearProgress);

  const video_update_date = props.counts.video_count
    ? moment(props.total.video_last_update.timestamp).format("DD/MM/YYYY")
    : 0;
  const image_update_date = props.counts.video_count
    ? moment(props.total.video_last_update.timestamp).format("DD/MM/YYYY")
    : 0;
  const file_update_date = props.counts.video_count
    ? moment(props.total.video_last_update.timestamp).format("DD/MM/YYYY")
    : 0;
  return (
    <>
      <div style={{ padding: "10px", paddingTop: "40px", flexWrap: "wrap" }}>
        <GridContainer style={{ width: "100%", maxWidth: "100%", margin: 0 }}>
          <div
            style={{
              width: "100%",
              minWidth: "fit-content",
              maxWidth: "100%  ",
            }}
          >
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <Card className="jssSlide3" style={{ minHeight: "189px" }}>
                  <CardHeader stats icon style={{ margin: "0 10px 0 25px" }}>
                    <div
                      className="jssSlide2"
                      style={{ justifyContent: "left", float: "left" }}
                    >
                      {!props.loading ? (
                        <>
                          {props.plan.type === "Premium" ? (
                            <CardIcon
                              align="left"
                              className={classes.cardIcon}
                              style={{
                                padding: "35px",
                                background: "darkviolet",
                                boxShadow:
                                  "0 4px 20px 0 #ffcc80, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                              }}
                            >
                              <img
                                alt="premium"
                                style={{ filter: "invert(100%)" }}
                                src="https://img.icons8.com/ios-filled/48/000000/best-seller.png"
                              />
                            </CardIcon>
                          ) : props.plan.type === "Platinum" ? (
                            <CardIcon
                              align="left"
                              className={classes.cardIcon}
                              style={{
                                padding: "35px",
                                background: "red",
                                boxShadow:
                                  "0 4px 20px 0 #ffcc80, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                              }}
                            >
                              <img
                                alt="platinum"
                                style={{ filter: "invert(100%)" }}
                                src="https://img.icons8.com/material/48/000000/skyrim.png"
                              />
                            </CardIcon>
                          ) : (
                            <CardIcon
                              align="left"
                              className={classes.cardIcon}
                              style={{
                                padding: "35px",
                                background: "default",
                                boxShadow:
                                  "0 4px 20px 0 #ffcc80, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                              }}
                            >
                              <PersonIcon />
                            </CardIcon>
                          )}
                        </>
                      ) : (
                        <Skeleton variant="rect" width={130} height={130} />
                      )}
                    </div>
                    <div>
                      {!props.loading ? (
                        <Typography
                          className={classes.cardTitle}
                          style={{
                            fontWeight: "500",
                            fontSize: "33.3px",
                            padding: "35px",
                          }}
                        >
                          {props.plan.type}
                        </Typography>
                      ) : (
                        <Typography
                          className={classes.cardTitle}
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            padding: "35px 0",
                          }}
                        >
                          <Skeleton animation="wave" height={30} />
                        </Typography>
                      )}
                      <p className={classes.cardCategory}>Storage</p>
                      <h3 className={classes.cardTitle}>
                        {!props.loading ? (
                          <>
                            {props.overall ? (
                              <>{formatBytes(props.overall)}</>
                            ) : (
                              0
                            )}
                            /{formatBytes(props.plan.cloud_storage_value)}
                          </>
                        ) : (
                          <Skeleton animation="wave" />
                        )}
                      </h3>
                    </div>
                  </CardHeader>
                  <BorderLinearProgress
                    className={classes.margin}
                    variant="determinate"
                    color="secondary"
                    value={
                      (props.overall.toFixed(2) * 100.00) /
                      props.plan.cloud_storage_value
                    }
                  />
                  <CardFooter stats>
                    <div
                      className={classes.stats}
                      style={{ marginTop: "10px" }}
                    >
                      <a href="/plan">Get more space</a>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card className="jssSlide3" style={{ minHeight: "189px" }}>
                  <CardHeader stats icon style={{ margin: "0 10px 0 25px" }}>
                    <div
                      className="jssSlide2"
                      style={{ justifyContent: "left", float: "left" }}
                    >
                      <CardIcon
                        align="left"
                        className={classes.cardIcon}
                        style={{
                          color: "white",
                          background:
                            "linear-gradient(60deg, #9575cd 40%, #673ab7 60%)",
                          boxShadow:
                            "0 4px 20px 0 #90caf9, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                        }}
                      >
                        <img
                          alt="s"
                          style={{ padding: "18px", filter: "invert(100%)" }}
                          src="https://img.icons8.com/material-sharp/48/000000/image.png"
                        />
                      </CardIcon>
                    </div>
                    <div>
                      <h2
                        className={classes.cardTitle}
                        style={{ fontWeight: "900", fontSize: "80px" }}
                      >
                        {props.counts.image_count
                          ? props.counts.image_count
                          : 0}
                      </h2>
                      <p className={classes.cardCategory}>Albums</p>
                      <h3 className={classes.cardTitle}>
                        {!props.loading ? (
                          <>
                            {props.image_total > 0 ? (
                              <>{formatBytes(props.image_total)} </>
                            ) : (
                              0
                            )}
                          </>
                        ) : (
                          <Skeleton animation="wave" />
                        )}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardFooter stats>
                    <div
                      className={classes.stats}
                      style={{ marginTop: "10px" }}
                    >
                      <AccessTime />
                      Last Added{"  " + image_update_date}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card className="jssSlide3" style={{ minHeight: "189px" }}>
                  <CardHeader stats icon style={{ margin: "0 10px 0 25px" }}>
                    <div
                      className="jssSlide2"
                      style={{ justifyContent: "left", float: "left" }}
                    >
                      <CardIcon
                        align="left"
                        className={classes.cardIcon}
                        style={{
                          color: "white",
                          background:
                            "linear-gradient(60deg, #4db6ac 40%, #009688 60%)",
                          boxShadow:
                            "0 4px 20px 0 #80cbc4, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                        }}
                      >
                        <img
                          alt="video"
                          style={{ padding: "18px", filter: "invert(100%)" }}
                          src="https://img.icons8.com/material/48/000000/video-playlist.png"
                        />
                      </CardIcon>
                    </div>
                    <div>
                      <h2
                        className={classes.cardTitle}
                        style={{ fontWeight: "900", fontSize: "80px" }}
                      >
                        {props.counts.video_count}
                      </h2>
                      <p className={classes.cardCategory}>Videos</p>
                      <h3 className={classes.cardTitle}>
                        {!props.loading ? (
                          <>
                            {props.video_total > 0 ? (
                              <>{formatBytes(props.video_total)}</>
                            ) : (
                              0
                            )}
                          </>
                        ) : (
                          <Skeleton animation="wave" />
                        )}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardFooter stats>
                    <div
                      className={classes.stats}
                      style={{ marginTop: "10px" }}
                    >
                      <AccessTime />
                      Last Added{"  " + video_update_date}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Card className="jssSlide3" style={{ minHeight: "189px" }}>
                  <CardHeader stats icon style={{ margin: "0 10px 0 25px" }}>
                    <div
                      className="jssSlide2"
                      style={{ justifyContent: "left", float: "left" }}
                    >
                      <CardIcon
                        align="left"
                        className={classes.cardIcon}
                        style={{
                          color: "white",
                          background:
                            "linear-gradient(60deg, #a1887f 40%, #795548 60%)",
                          boxShadow:
                            "0 4px 20px 0 #bcaaa4, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                        }}
                      >
                        <img
                          alt="pdf"
                          style={{ padding: "18px", filter: "invert(100%)" }}
                          src="https://img.icons8.com/material-sharp/48/000000/pdf.png"
                        />
                      </CardIcon>
                    </div>
                    <div>
                      <h2
                        className={classes.cardTitle}
                        style={{ fontWeight: "900", fontSize: "80px" }}
                      >
                        {props.counts.doc_count}
                      </h2>
                      <p className={classes.cardCategory}>Document</p>
                      <h3 className={classes.cardTitle}>
                        {!props.loading ? (
                          <>
                            {props.doc_total > 0 ? (
                              <>{formatBytes(props.doc_total)}</>
                            ) : (
                              0
                            )}
                          </>
                        ) : (
                          <Skeleton animation="wave" />
                        )}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardFooter stats>
                    <div
                      className={classes.stats}
                      style={{ marginTop: "10px" }}
                    >
                      <AccessTime />
                      Last Added{"  " + file_update_date}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          {props.allign.todo ? (
            <GridContainer
              style={{
                flexWrap: "unset",
                width: "100%",
                maxWidth: "100%",
                minWidth: "fit-content",
                float: "right",
              }}
            >
              <Card
                style={{
                  margin: "30px",
                  borderRadius: " 15px",
                  height: "fit-content",
                }}
              >
                <CardHeader
                  style={{
                    background: "#192d3e",
                    padding: 0,
                    borderRadius: "15px",
                  }}
                >
                  <div style={{ float: "right", margin: "20px" }}>
                    <Tooltip TransitionComponent={Zoom} title="Filter">
                      <Button
                        color="primary"
                        aria-label="add"
                        className={classes.ac}
                        style={{ color: "aliceblue" }}
                        onClick={handleMenu}
                      >
                        <FilterListIcon />
                      </Button>
                    </Tooltip>
                    <Menu
                      className={classes.icon}
                      padding="10px"
                      style={{ top: "46px", marginRight: "-5px", left: "-5px" }}
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open1}
                      onClose={handleClose1}
                    >
                      <MenuItem onClick={handleAll}>All</MenuItem>
                      <MenuItem onClick={handleToday}>Today</MenuItem>
                      <MenuItem onClick={handleWeek}>Week</MenuItem>
                      <MenuItem onClick={handleMonth}>Month</MenuItem>
                    </Menu>
                  </div>
                  <div>
                    <h4
                      className={classes.cardTitle}
                      style={{
                        marginTop: "17px",
                        color: "white",
                        marginLeft: "10px",
                      }}
                    >
                      <img
                        style={{ marginRight: "2px", filter: "invert(100%)" }}
                        src="https://img.icons8.com/material/24/000000/todo-list--v1.png"
                        alt="Todo"
                      />{" "}
                      To Do
                    </h4>
                    <p
                      className={classes.cardCategory}
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      Work Details
                    </p>
                  </div>

                  <AppBar
                    position="static"
                    color="default"
                    style={{ background: "#192d3e", marginTop: "10px" }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      scrollButtons="on"
                      style={{ fontColor: "#fff" }}
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                      <Tab
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          minWidth: "33.33%",
                        }}
                        icon={
                          <img
                            alt="-"
                            style={{ filter: "invert(100%)" }}
                            src="https://img.icons8.com/metro/26/000000/data-pending.png"
                          />
                        }
                        label="Pending"
                        {...a11yProps(0)}
                      />
                      <Tab
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          minWidth: "33.33%",
                        }}
                        icon={
                          <img
                            alt="-"
                            style={{ filter: "invert(100%)" }}
                            src="https://img.icons8.com/material-rounded/24/000000/task-completed.png"
                          />
                        }
                        label="Completed"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>
                </CardHeader>
                <div className={classes.root}>
                  {!props.loading ? (
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel
                        style={{
                          backgroundColor: "#fafafa",
                          borderBottomLeftRadius: "15px",
                          borderBottomRightRadius: "15px",
                          minHeight: "100%",
                        }}
                        value={value}
                        index={0}
                        dir={theme.direction}
                      >
                        {todoslistFalse.length > 0 ? (
                          <div spacing={1} className={classes.gridList}>
                            <Table>
                              <TableBody>
                                {todoslistFalse
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((data) => (
                                    <TableRow key={data.id}>
                                      <TableCell
                                        style={{
                                          padding: "0 0 9px 0",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <ExpansionPanel
                                          style={{ background: "#192d3e" }}
                                          expanded={
                                            expanded === "panel" + data.id
                                          }
                                          onChange={handleChange1(data.id)}
                                        >
                                          <ExpansionPanelSummary
                                            expandIcon={
                                              <ExpandMoreIcon
                                                style={{ color: "white" }}
                                              />
                                            }
                                            aria-controls="panel1bh-content"
                                            id={data.id}
                                          >
                                            <Typography
                                              className={classes.heading}
                                              style={{ color: "#FFFFFF" }}
                                            >
                                              {data.title}
                                            </Typography>
                                            <Typography
                                              className={
                                                classes.secondaryHeading
                                              }
                                              style={{ color: "#FFFFFF" }}
                                            >
                                              I am an expansion panel
                                            </Typography>
                                          </ExpansionPanelSummary>
                                          <ExpansionPanelDetails>
                                            <Typography
                                              style={{ color: "#FFFFFF" }}
                                            >
                                              {data.description}
                                            </Typography>
                                            <div style={{ marginLeft: "auto" }}>
                                              <Switch
                                                value="checkedC"
                                                inputProps={{
                                                  "aria-label":
                                                    "primary checkbox",
                                                  color: "primary",
                                                }}
                                                onClick={(event) =>
                                                  props.handletoggle(
                                                    this,
                                                    data.id,
                                                    data.title,
                                                    data.description,
                                                    data.completed
                                                  )
                                                }
                                              />
                                            </div>
                                          </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                            <TablePagination
                              rowsPerPageOptions={[1, 2, 3, 5]}
                              component="div"
                              count={todoslistFalse.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                          </div>
                        ) : (
                          <p>No Pending ToDo</p>
                        )}
                      </TabPanel>
                      <TabPanel
                        style={{
                          backgroundColor: "#fafafa",
                          borderBottomLeftRadius: "15px",
                          borderBottomRightRadius: "15px",
                        }}
                        value={value}
                        index={1}
                        dir={theme.direction}
                      >
                        {todoslistTrue.length > 0 ? (
                          <div
                            cellHeight={200}
                            spacing={1}
                            className={classes.gridList}
                          >
                            <Table>
                              <TableBody>
                                {todoslistTrue
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((data) => (
                                    <TableRow key={data.id}>
                                      <TableCell
                                        style={{
                                          padding: "0 0 9px 0",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <ExpansionPanel
                                          style={{ background: "#192d3e" }}
                                          expanded={
                                            expanded === "panel" + data.id
                                          }
                                          onChange={handleChange1(data.id)}
                                        >
                                          <ExpansionPanelSummary
                                            expandIcon={
                                              <ExpandMoreIcon
                                                style={{ color: "white" }}
                                              />
                                            }
                                            aria-controls="panel1bh-content"
                                            id={data.id}
                                          >
                                            <Typography
                                              className={classes.heading}
                                              style={{ color: "#FFFFFF" }}
                                            >
                                              {data.title}
                                            </Typography>
                                            <Typography
                                              className={
                                                classes.secondaryHeading
                                              }
                                              style={{ color: "#FFFFFF" }}
                                            >
                                              I am an expansion panel
                                            </Typography>
                                          </ExpansionPanelSummary>
                                          <ExpansionPanelDetails>
                                            <Typography
                                              style={{ color: "#FFFFFF" }}
                                            >
                                              {data.description}
                                            </Typography>
                                            <div style={{ marginLeft: "auto" }}>
                                              <Switch
                                                value="checkedB"
                                                checked="true"
                                                inputProps={{
                                                  "aria-label":
                                                    "secondary checkbox",
                                                }}
                                                onClick={(event) =>
                                                  props.handletoggle(
                                                    this,
                                                    data.id,
                                                    data.title,
                                                    data.description,
                                                    data.completed
                                                  )
                                                }
                                              />
                                            </div>
                                            <IconButton
                                              aria-label="delete"
                                              style={{ color: "aliceblue" }}
                                              onClick={() =>
                                                props.handleComplete(
                                                  this,
                                                  data.id
                                                )
                                              }
                                            >
                                              <DeleteIcon />
                                            </IconButton>
                                          </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                            <TablePagination
                              rowsPerPageOptions={[1, 2, 3, 5]}
                              component="div"
                              count={todoslistTrue.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                          </div>
                        ) : (
                          <p>No Completed ToDo</p>
                        )}
                      </TabPanel>
                    </SwipeableViews>
                  ) : (
                    <div style={{ padding: "20px" }}>
                      <Skeleton animation="wave" height={70} />
                      <Skeleton animation="wave" height={70} />
                      <Skeleton animation="wave" height={70} />
                      <Skeleton animation="wave" height={70} />
                      <Skeleton animation="wave" height={70} />
                    </div>
                  )}
                </div>
              </Card>
            </GridContainer>
          ) : null}
        </GridContainer>
      </div>
    </>
  );
}

class DashTodo extends Component {
  state = {
    todos: [],
    video_count: 0,
    video_last_update: {},
    file_last_update: {},
    image_last_update: {},
    doc_count: 0,
    image_count: 0,
    total: 0,
    doc: [],
    video: [],
    image: [],
    plan: [],
    loading: true,
    todo_search: [],
    name: "",
    room: "",
    data: {
      todo: true,
    },
    project_data: []
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios
        .get(`https://${this.props.url}/Subs/?username=${this.props.username}`)
        .then((res) => {
          const val = res.data[0];
          var today = new Date();
          var dateFrom = moment(
            today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate()
          ).format("YYYY-MM-DD");
          var dateTo = "";
          if (~~val.amount === 89 || ~~val.amount === 199) {
            dateTo = moment(val.txn_date).add(1, "months").format("YYYY-MM-DD");
          } else if (~~val.amount === 748 || ~~val.amount === 1672) {
            dateTo = moment(val.txn_date)
              .add(12, "months")
              .format("YYYY-MM-DD");
          } else {
            dateTo = moment(dateFrom).add(1, "months").format("YYYY-MM-DD");
          }
          if (res.data.length > 0 && dateFrom < dateTo) {
            this.setState({
              plan: Plan_detail.filter((data) => {
                return data.price === ~~val.amount;
              })[0],
            });
          } else {
            if (res.data.length > 0) {
              this.setState({
                plan: Plan_detail.filter((data) => {
                  return data.price === 0;
                })[0],
              });
            }
          }
        });
      axios.get(`https://${this.props.url}/todo/`).then((res) => {
        this.setState({
          todos: res.data,
          todo_search: res.data,
        });
      });
      axios.get(`https://${this.props.url}/video/`).then((res) => {
        this.setState({
          video_count: res.data.length,
          video_last_update: res.data[res.data.length - 1],
          video: res.data,
        });
      });
      axios.get(`https://${this.props.url}/file/`).then((res) => {
        this.setState({
          doc_count: res.data.length,
          file_last_update: res.data[res.data.length - 1],
          doc: res.data,
        });
      });
      axios.get(`https://${this.props.url}/images/`).then((res) => {
        this.setState({
          image_count: res.data.length,
          image_last_update: res.data[res.data.length - 1],
        });
      });
      axios.get(`https://${this.props.url}/allidash/`).then((res) => {
        if (res.data.length > 0) {
          this.setState({
            data: res.data[0],
          });
        }
      });
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        const user = res.data.username;
        axios.get(`https://${this.props.url}/imagelist/`).then((res) => {
          this.setState({
            image: res.data.filter((res1) => {
              return res1.user === user;
            }),
            loading: false,
          });
        });
      });
      axios.get(`https://${this.props.url}/create/`).then((res) => {
        this.setState({
          project_data: res.data
        })
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios
        .get(`https://${this.props.url}/Subs/?username=${this.props.username}`)
        .then((res) => {
          const val = res.data[0];
          var today = new Date();
          var dateFrom = moment(
            today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate()
          ).format("YYYY-MM-DD");
          var dateTo = "";
          if (~~val.amount === 89 || ~~val.amount === 199) {
            dateTo = moment(val.txn_date).add(1, "months").format("YYYY-MM-DD");
          } else if (~~val.amount === 748 || ~~val.amount === 1672) {
            dateTo = moment(val.txn_date)
              .add(12, "months")
              .format("YYYY-MM-DD");
          } else {
            dateTo = moment(dateFrom).add(1, "months").format("YYYY-MM-DD");
          }
          if (res.data.length > 0 && dateFrom < dateTo) {
            this.setState({
              plan: Plan_detail.filter((data) => {
                return data.price === ~~val.amount;
              })[0],
            });
          } else {
            if (res.data.length > 0) {
              this.setState({
                plan: Plan_detail.filter((data) => {
                  return data.price === 0;
                })[0],
              });
            }
          }
        });
      axios.get(`https://${this.props.url}/todo/`).then((res) => {
        this.setState({
          todos: res.data,
          todo_search: res.data,
        });
      });
      axios.get(`https://${this.props.url}/video/`).then((res) => {
        this.setState({
          video_count: res.data.length,
          video_last_update: res.data[res.data.length - 1],
          video: res.data,
        });
      });
      axios.get(`https://${this.props.url}/file/`).then((res) => {
        this.setState({
          doc_count: res.data.length,
          file_last_update: res.data[res.data.length - 1],
          doc: res.data,
        });
      });
      axios.get().then((res) => {
        this.setState({
          image_count: res.data.length,
          image_last_update: res.data[res.data.length - 1],
        });
      });
      axios.get(`https://${this.props.url}/allidash/`).then((res) => {
        if (res.data.length > 0) {
          this.setState({
            data: res.data[0],
          });
        }
      });
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        const user = res.data.username;
        axios.get(`https://${this.props.url}/imagelist/`).then((res) => {
          this.setState({
            image: res.data.filter((res1) => {
              return res1.user === user;
            }),
            loading: false,
          });
        });
      });
      axios.get(`https://${this.props.url}/create/`).then((res) => {
        this.setState({
          project_data: res.data
        })
      });
    }
  }

  handletoggle = (event, id, title, description, completed) => {
    let form_data = new FormData();
    form_data.append("title", title);
    form_data.append("description", description);
    if (completed === false) {
      form_data.append("completed", true);
    }
    if (completed === true) {
      form_data.append("completed", false);
    }
    const url_put = `https://${this.props.url}/todo/${id}/`;
    axios
      .put(url_put, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.handleState(res.data);
      })
      .catch((err) => console.log(err));
  };

  handleState = (data) => {
    const { todos } = this.state;
    const remove = todos.filter((todo) => {
      return todo.id !== data.id;
    });
    this.setState({
      todos: remove,
    });
    this.setState((previousState) => ({
      todos: [data, ...previousState.todos],
    }));
  };

  handleComplete = (event, id) => {
    if (window.confirm("Are you sure you want to delete Todo?")) {
      const todoID = id;
      const data = [...this.state.todos];
      const removed = data.filter((todo) => {
        return todo.id !== id;
      });
      axios.delete(`https://${this.props.url}/todo/${todoID}`);
      this.setState({
        todos: removed,
      });
    }
  };

  handleAll = () => {
    this.setState({
      todos: this.state.todo_search,
    });
  };

  handleTodayData = () => {
    var today = new Date();
    var date = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    this.setState({
      todos: this.state.todo_search.filter((data) => {
        return data.timestamp === date;
      }),
    });
  };

  handleMonthData = () => {
    var today = new Date();
    var dateTo = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    var dateFrom = moment(dateTo).subtract(1, "months").format("YYYY-MM-DD");
    this.setState({
      todos: this.state.todo_search.filter((data) => {
        return dateTo >= data.timestamp && data.timestamp >= dateFrom;
      }),
    });
  };

  handleWeekData = () => {
    var today = new Date();
    var dateTo = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    var dateFrom = moment(dateTo).subtract(7, "days").format("YYYY-MM-DD");
    this.setState({
      todos: this.state.todo_search.filter((data) => {
        return dateTo >= data.timestamp && data.timestamp >= dateFrom;
      }),
    });
  };

  render() {
    let doc_total = sumProperty(this.state.doc, "size").toFixed(2);
    const doc_total_sum = sumProperty(this.state.doc, "size").toFixed(2);
    let video_total = sumProperty(this.state.video, "size").toFixed(2);
    const video_total_sum = sumProperty(this.state.video, "size").toFixed(2);
    let image_total = sumProperty(this.state.image, "size").toFixed(2);
    const image_total_sum = sumProperty(this.state.image, "size").toFixed(2);
    const project_selected_total = sumProperty(this.state.project_data, "project_size").toFixed(2);

    let overall_total =
      Number(image_total_sum) + Number(video_total_sum) + Number(doc_total_sum) + Number(project_selected_total);
    const overall_total_sum =
      Number(image_total_sum) + Number(video_total_sum) + Number(doc_total_sum) + Number(project_selected_total);

    return (
      <Todos
        data={this.state.todos}
        project_selected_total={project_selected_total}
        allign={this.state.data}
        handleAll={this.handleAll}
        loading={this.state.loading}
        overall={overall_total}
        overall_sum={overall_total_sum}
        plan={this.state.plan}
        handleTodayData={this.handleTodayData}
        handleWeekData={this.handleWeekData}
        handleMonthData={this.handleMonthData}
        counts={this.state}
        total={this.state}
        doc_total={doc_total}
        image_total={image_total}
        video_total={video_total}
        handletoggle={this.handletoggle}
        handleComplete={this.handleComplete}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
    username: state.username,
  };
};

export default connect(mapStateToProps)(DashTodo);
