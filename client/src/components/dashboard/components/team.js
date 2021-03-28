import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "../../css/Card/CardHeader";
import GridContainer from "../../css/Grid/GridContainer";
import CardIcon from "../../css/Card/CardIcon";
import Paper from "@material-ui/core/Paper";
import Card from "../../css/Card/Card";
import "../components/App.css";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import UserlistMobile from "../../userslist/userlistMobile.js";

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
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Teams(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sectionDesktop}>
        {props.renderRedirect()}
        <GridContainer>
          <Card
            style={{
              margin: "30px",
              width: "100%",
              padding: "0 10px",
              minWidth: "fit-content",
            }}
            className="jssSlide3"
          >
            <CardHeader stats icon>
              <div
                className="jssSlide2"
                style={{ justifyContent: "left", float: "left" }}
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
                {props.teamName} Members
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
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        style={{ fontSize: "16px", fontWeight: "700" }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", fontWeight: "700" }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", fontWeight: "700" }}
                      >
                        Designation
                      </TableCell>
                    </TableRow>

                    {!props.loading ? (
                      <>
                        {props.data ? (
                          props.data.map((data) => (
                            <TableRow
                              key={data.id}
                              hover
                              onClick={() => props.setRedirect(data.id)}
                            >
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {data.username}
                              </TableCell>
                              {data.email ? (
                                <TableCell align="center">
                                  {data.email}
                                </TableCell>
                              ) : (
                                <TableCell align="center">-</TableCell>
                              )}
                              {data.profile.designation ? (
                                <TableCell align="center">
                                  {data.profile.designation}
                                </TableCell>
                              ) : (
                                <TableCell align="center">-</TableCell>
                              )}
                            </TableRow>
                          ))
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        {[...Array(3)].map((e, i) => (
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
        </GridContainer>
      </div>
      <div className={classes.sectionMobile}>
        {props.renderRedirect()}
        <Card
          style={{ width: "100%", padding: "0 10px", minWidth: "fit-content" }}
          className="jssSlide3"
        >
          <CardHeader stats icon>
            <div
              className="jssSlide2"
              style={{ justifyContent: "left", float: "left" }}
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
              {props.teamName} Members
            </h3>
          </CardHeader>
          <br />
          {!props.loading ? (
            <>
              {props.data ? (
                props.data.map((data) => (
                  <UserlistMobile data={data} setRedirect={props.setRedirect} />
                ))
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {[...Array(3)].map((e, i) => (
                <TableRow hover key={i}>
                  <TableCell align="center" component="th" scope="row">
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
          <div style={{ width: "auto", margin: "0 auto" }}>
            {props.team_image ? (
              <div className="team21" style={{ textAlign: "-webkit-center" }}>
                <img alt="team" className="teamImage" src={props.team_image} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </Card>

        {/* <Card style={{margin: 0,width:'100%'}} className="jssSlide3">
        
        <CardHeader stats icon>
        <div  className='jssSlide2' style={{justifyContent:'left', float:'left'}}>
          <CardIcon className={classes.cardIcon}>
            <img alt='group' style={{padding: '20px',filter: 'invert(100%)'}} src="https://img.icons8.com/material/48/000000/user-group-man-woman--v1.png"/>
          </CardIcon>
          </div>
          <h3 className={classes.cardTitle} style={{textAlign: 'left', fontSize: '22px', overflow: 'hidden', padding: '17px',textTransform: 'capitalize'}}>
          {props.teamName} Members
          </h3>
        </CardHeader>
        <br/>
        <div className='team1 team2'>
        <TableContainer component={Paper} style={{ boxShadow: 'none'}} className='team21'>
          <Table className={classes.table} aria-label="custom pagination table" style={{borderTop: '1px solid #eee'}}>
            <TableBody  >
            <TableRow >
              <TableCell align="center" component="th" scope="row" style={{fontSize: '16px' ,fontWeight: '700'}} >
                  Username
              </TableCell>
          <TableCell align="center" style={{fontSize: '16px' ,fontWeight: '700'}}>Email</TableCell>
              </TableRow>
              
              {
                (!props.loading)?
                (
                  <>
                  {
                    (props.data)?
                    (
                        props.data.map(data=>(
                            <TableRow key={data.id} hover onClick={()=>props.setRedirect(data.id)} >
                            <TableCell align="center" component="th" scope="row">
                                {data.username}
                            </TableCell>
                            {(data.email)?
                            (<TableCell align="center">{data.email}</TableCell>):(<TableCell align="center">-</TableCell>)}
                            
                            </TableRow>
                        ))
                    ):(<></>)
                }
                </>
                )
                :
                (
                  <>
                    {
                      [...Array(3)].map((e,i)=>(<TableRow hover key={i} >
                        <TableCell align="center" component="th" scope="row">
                        <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell align="center"><Skeleton animation="wave" /></TableCell>
                      </TableRow>))
                    }
                  </>
                  

                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{width:'auto', margin:'0 auto'}}>
        {
            (props.team_image)?
            (
                <div className="team21" style={{textAlign: '-webkit-center'}}>
                    <img alt='team' className="teamImage" src={props.team_image}/>
                </div>
            )
            :
            (
                <></>
            )
        }
        </div>
        </div>
        
        </Card> */}
      </div>
    </>
  );
}

class DashTeam extends Component {
  state = {
    data: [],
    teamName: "",
    team_image: null,
    redirect: false,
    id: "",
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
      return <Redirect to={`/team-member-profile/${this.state.id}/`} />;
    }
  };

  componentDidMount() {
    if (this.props.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        this.setState({
          teamName: prof.teamName,
          team_image: prof.team_image,
        });
        if (prof.teamName !== "default_team_name") {
          axios
            .get(
              `https://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}`
            )
            .then((res) => {
              this.setState({
                data: res.data,
                loading: false,
              });
            });
        }
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        this.setState({
          teamName: prof.teamName,
          team_image: prof.team_image,
        });
        if (prof.teamName !== "default_team_name") {
          axios
            .get(
              `https://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}`
            )
            .then((res) => {
              this.setState({
                data: res.data,
                loading: false,
              });
            });
        }
      });
    }
  }

  render() {
    return (
      <>
        {this.state.data.length !== 0 ? (
          <Teams
            data={this.state.data}
            loading={this.state.loading}
            teamName={this.state.teamName}
            renderRedirect={this.renderRedirect}
            setRedirect={this.setRedirect}
            team_image={this.state.team_image}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(DashTeam);
