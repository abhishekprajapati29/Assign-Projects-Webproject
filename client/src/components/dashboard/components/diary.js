import React, { Component } from "react";
import axios from "axios";
import CardHeader from "../../css/Card/CardHeader";
import CardIcon from "../../css/Card/CardIcon";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import "./App.css";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import MobileDiary from "./diarymobile.js";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
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
    background: "linear-gradient(60deg, #64b5f6 40%, #2196f3 60%)",
    boxShadow: "0 4px 20px 0 #64b5f6, 0 7px 10px -5px rgba(244, 67, 54,.4)",
  },
  marginContent: {
    padding: "15px",
    justifyContent: "left",
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

function DiaryLists(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.sectionDesktop}>
        <>
          {props.renderRedirect()}
          <Card
            style={{ width: "100%", margin: "30px", overflow: "visible" }}
            className="jssSlide3"
          >
            <CardHeader stats icon>
              <div
                className="jssSlide2"
                style={{
                  justifyContent: "left",
                  float: "left",
                  overflow: "visible",
                }}
              >
                <CardIcon className={classes.cardIcon}>
                  <img
                    alt="group"
                    style={{ padding: "20px", filter: "invert(100%)" }}
                    src="https://img.icons8.com/material/48/000000/user-group-man-woman--v1.png"
                  />
                </CardIcon>
              </div>
              <h3
                className={classes.cardTitle}
                style={{
                  textAlign: "left",
                  fontSize: "22px",
                  overflow: "hidden",
                  padding: "17px",
                  textTransform: "capitalize",
                }}
              >
                Diary
                <p style={{ textAlign: "left", fontSize: "12px" }}>
                  Last 7 Diarys
                </p>
              </h3>
            </CardHeader>
            <br />
            <div className="team1 team2">
              <TableContainer
                component={Paper}
                style={{ boxShadow: "none" }}
                className="team21"
              >
                <Table
                  className={classes.table}
                  aria-label="custom pagination table"
                  style={{ borderTop: "1px solid #eee" }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ textAlign: "center" }}>
                        <Box fontWeight="fontWeightBold" fontSize="17px">
                          Date
                        </Box>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Box fontWeight="fontWeightBold" fontSize="17px">
                          Title
                        </Box>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Box fontWeight="fontWeightBold" fontSize="17px">
                          Content
                        </Box>
                      </TableCell>
                    </TableRow>

                    {!props.loading ? (
                      <>
                        {props.data.slice(0, 7).map((diary) => (
                          <TableRow
                            hover
                            onClick={() => props.setRedirect(diary.id)}
                            key={diary.id}
                          >
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                              style={{
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: 700,
                              }}
                            >
                              {moment(diary.posted_date).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell align="center">
                              {diary.title.length < 10
                                ? diary.title
                                : diary.title.slice(0, 10) + "...."}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {diary.text.length < 10
                                ? diary.text
                                : diary.text.slice(0, 10) + "...."}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <>
                        {[...Array(7)].map((e, i) => (
                          <TableRow hover key={i}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell align="center">
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell align="center">
                              <Skeleton animation="wave" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ width: "auto", margin: "0 auto" }}>
                {props.team_image ? (
                  <div
                    className="team21"
                    style={{ textAlign: "-webkit-center" }}
                  >
                    <img
                      alt="team"
                      className="teamImage"
                      src={props.team_image}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Card>
        </>
      </div>
      <div className={classes.sectionMobile}>
        <div style={{ width: "100%" }}>
          {props.renderRedirect()}
          <Card
            style={{ width: "100%", overflow: "visible" }}
            className="jssSlide3"
          >
            <CardHeader stats icon>
              <div
                className="jssSlide2"
                style={{
                  justifyContent: "left",
                  float: "left",
                  overflow: "visible",
                }}
              >
                <CardIcon className={classes.cardIcon}>
                  <img
                    alt="group"
                    style={{ padding: "20px", filter: "invert(100%)" }}
                    src="https://img.icons8.com/material/48/000000/user-group-man-woman--v1.png"
                  />
                </CardIcon>
              </div>
              <h3
                className={classes.cardTitle}
                style={{
                  textAlign: "left",
                  fontSize: "22px",
                  overflow: "hidden",
                  padding: "17px",
                  textTransform: "capitalize",
                }}
              >
                Diary
                <p style={{ textAlign: "left", fontSize: "12px" }}>
                  Last 7 Diarys
                </p>
              </h3>
            </CardHeader>
            <br />
            <div className="team1 team2">
              {props.data.slice(0, 7).map((diary) => (
                <MobileDiary data={diary} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

class DiaryList extends Component {
  state = {
    diary: [],
    search: "",
    redirect: false,
    id: 0,
    loading: true,
  };

  setRedirect = (data) => {
    this.setState({
      redirect: true,
      id: data,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/diaryview/${this.state.id}/`} />;
    }
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/diary/`).then((res) => {
        this.setState({
          diary: res.data,
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
      axios.get(`https://${this.props.url}/diary/`).then((res) => {
        this.setState({
          diary: res.data,
          loading: false,
        });
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.diary.length > 0 ? (
          <DiaryLists
            data={this.state.diary}
            loading={this.state.loading}
            setRedirect={this.setRedirect}
            renderRedirect={this.renderRedirect}
            handleDelete={this.handleDelete}
            search={this.state.search}
            handleChange={this.handleChange}
            handleTodayData={this.handleTodayData}
            handleMonthData={this.handleMonthData}
            handleWeekData={this.handleWeekData}
          />
        ) : null}
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

export default connect(mapStateToProps)(DiaryList);
