import React, { Component } from "react";

import CardHeader from "../../css/Card/CardHeader";
import Card from "../../css/Card/Card";
import CardFooter from "../../css/Card/CardFooter";
import GridItem from "../../css/Grid/GridItem";
import GridContainer from "../../css/Grid/GridContainer";
import { makeStyles } from "@material-ui/core/styles";
import "../components/App.css";
import axios from "axios";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Tooltip from "@material-ui/core/Tooltip";

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
    background: "#ff8731",
  },
  marginContent: {
    padding: "15px",
    justifyContent: "left",
  },
  image: {
    width: "100%",
    height: "100%",
  },
}));

function Posts(props) {
  const classes = useStyles();

  return (
    <>
      {props.data.posts.length !== 0 ? (
        <>
          <h1 className="bashboardpost">POSTS</h1>
          <GridContainer>
            {props.data.posts.reverse().map((res) => (
              <GridItem xs={12} sm={12} md={4} key={res.id}>
                <Card chart>
                  <div
                    className="jssSlide1"
                    style={{ textAlign: "-webkit-center", padding: "20px" }}
                  >
                    {res.img ? (
                      <CardHeader
                        className="jssSlide2"
                        style={{
                          overflow: "hidden",
                          margin: "-42px 0px 0px 0px",
                          padding: "0",
                          borderRadius: "20px",
                          boxShadow:
                            "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(244, 67, 54,.4)",
                        }}
                      >
                        <img alt="aa" src={res.img} className={classes.image} />
                      </CardHeader>
                    ) : (
                      <></>
                    )}
                    <div
                      className={classes.marginContent}
                      style={{ textAlignLast: "center" }}
                    >
                      <p
                        className={classes.cardCategory}
                        style={{ fontSize: "x-large" }}
                      >
                        {res.content}
                      </p>
                    </div>
                  </div>
                  <CardFooter chart>
                    <div className={classes.stats} style={{ flexGrow: "1" }}>
                      {/* <AccessTime /> updated 4 minutes ago */}
                      <AvatarGroup>
                        {props.data.user_image.filter((data) => {
                          return data.user === res.user;
                        })[0]
                          ? res.post_comment
                              .reverse()
                              .slice(0, 3)
                              .map((res1) => (
                                <>
                                  <Avatar
                                    key={res1.id}
                                    alt={res1.commented_by}
                                    src={
                                      props.data.user_image.filter((data) => {
                                        return data.user === res1.commented_by;
                                      })[0]["image"]
                                    }
                                  />
                                </>
                              ))
                          : null}
                        {res.comment_count === 0 ||
                        res.comment_count === 1 ||
                        res.comment_count === 2 ||
                        res.comment_count === 3 ? null : (
                          <Tooltip title="Comments">
                            <Avatar>+{res.comment_count - 3}</Avatar>
                          </Tooltip>
                        )}
                      </AvatarGroup>

                      <div style={{ marginLeft: "auto", alignSelf: "center" }}>
                        <p
                          style={{
                            fontSize: "15px",
                            marginRight: "10px",
                            marginTop: "5px",
                            marginBottom: "4px",
                            fontFamily: "cursive",
                          }}
                        >
                          Posted By - {res.user.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </GridContainer>
        </>
      ) : null}
    </>
  );
}

class DashPost extends Component {
  state = {
    posts: [],
    user_image: [],
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/post/`).then((res) => {
        this.setState({
          posts: res.data,
        });
      });
      axios.get(`https://${this.props.url}/user_image`).then((res) => {
        this.setState({
          user_image: res.data,
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
      axios.get(`https://${this.props.url}/post/`).then((res) => {
        this.setState({
          posts: res.data,
        });
      });
      axios.get(`https://${this.props.url}/user_image`).then((res) => {
        this.setState({
          user_image: res.data,
        });
      });
    }
  }

  render() {
    return <Posts data={this.state} />;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(DashPost);
