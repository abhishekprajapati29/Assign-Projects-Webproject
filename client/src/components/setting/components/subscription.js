import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import CardHeader from "../../css/Card/CardHeader";
import Card from "../../css/Card/Card";
import Button from "../../css/CustomButtons/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Plan_detail from "../../../plan-detail.js";
import { green } from "@material-ui/core/colors";
import moment from "moment";
import CardIcon from "../../css/Card/CardIcon";
import Skeleton from "@material-ui/lab/Skeleton";
import formatBytes from "../../../formatbytes.js";
import CardFooter from "../../css/Card/CardFooter";

import { CardContent, CardActions, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
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
  title: {
    fontSize: "28px",
    fontFamily: "initial",
    padding: "25px",
  },
  rounded: {
    color: "#fff",
    backgroundColor: green,
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

function Subscriptions(props) {
  const { className } = props;
  const classes = useStyles();
  return (
    <>
      <Card
        className={clsx(classes.root, className)}
        style={{
          boxShadow:
            "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
        }}
      >
        <form>
          <CardHeader
            color="success"
            style={{
              boxShadow:
                "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
            }}
          >
            <div style={{ float: "right" }}>
              <Button
                href="/plan"
                style={{
                  backgroundColor: "black",
                  color: "aliceblue",
                  boxShadow:
                    "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                }}
              >
                UPGRADE PLAN
              </Button>
            </div>
            <div>
              <h4 className={classes.cardTitleWhite}>Subscription</h4>
              <Typography className={classes.cardCategoryWhite}>
                Manage your Subscription
              </Typography>
            </div>
          </CardHeader>
          <CardContent>
            <div className={classes.sectionDesktop}>
              <Card
                style={{
                  width: "100%",
                  boxShadow:
                    "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                }}
              >
                <CardContent>
                  <div
                    style={{ float: "right", width: "auto", padding: "16px" }}
                  >
                    {props.plan.type === "Premium" ? (
                      <Avatar
                        variant="rounded"
                        style={{
                          float: "left",
                          width: "60px",
                          height: "60px",
                          background: "darkviolet",
                        }}
                      >
                        <img
                          alt="premium"
                          style={{ filter: "invert(100%)" }}
                          src="https://img.icons8.com/ios-filled/24/000000/best-seller.png"
                        />
                      </Avatar>
                    ) : props.plan.type === "Platinum" ? (
                      <Avatar
                        variant="rounded"
                        style={{
                          float: "left",
                          width: "60px",
                          height: "60px",
                          backgroundColor: "red",
                        }}
                      >
                        <img
                          alt="platinum"
                          style={{ filter: "invert(100%)" }}
                          src="https://img.icons8.com/material/24/000000/skyrim.png"
                        />
                      </Avatar>
                    ) : (
                      <Avatar
                        variant="rounded"
                        style={{ float: "left", width: "60px", height: "60px" }}
                      >
                        <PersonIcon />
                      </Avatar>
                    )}

                    <Typography
                      component={"span"}
                      style={{
                        fontSize: "28px",
                        float: "left",
                        marginTop: "10px",
                        marginLeft: "5px",
                      }}
                    >
                      {props.plan.type}
                    </Typography>
                  </div>
                  <Typography
                    component={"span"}
                    className={classes.title}
                    style={{ display: "flex" }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <span style={{ fontSize: "30px", marginRight: "5px" }}>
                      &#8377;
                    </span>
                    {props.plan.price}/{props.plan.time}
                  </Typography>
                </CardContent>
                <CardActions style={{ padding: "0 15px 15px" }}>
                  <div style={{ width: "100%" }}>
                    <hr />
                    <div style={{ display: "flex" }}>
                      <Typography
                        component={"span"}
                        style={{ textAlignLast: "center", flex: "auto" }}
                      >
                        <Typography style={{ fontSize: "19px" }}>
                          1 Team{" "}
                        </Typography>
                        <Typography>
                          {`${props.plan.No_of_team_member} Team Member`}{" "}
                        </Typography>
                      </Typography>
                      <Typography
                        component={"span"}
                        style={{ textAlignLast: "center", flex: "auto" }}
                      >
                        <Typography style={{ fontSize: "19px" }}>
                          {`${props.plan.No_of_Projects} Project's`}{" "}
                        </Typography>
                        <Typography>
                          {`${props.plan.No_of_project_members} Project Member`}{" "}
                        </Typography>
                      </Typography>
                      <Typography
                        component={"span"}
                        style={{ textAlignLast: "center", flex: "auto" }}
                      >
                        <Typography style={{ fontSize: "19px" }}>
                          Cloud Storage{" "}
                        </Typography>
                        <Typography>{props.plan.cloud_storage} </Typography>
                      </Typography>
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
            <div className={classes.sectionMobile}>
              <Card className="jssSlide3" style={{ minHeight: "189px" }}>
                <CardHeader stats icon style={{ textAlign: "center" }}>
                  <div style={{ width: "fit-content", margin: "0 auto" }}>
                    {!props.loading ? (
                      <>
                        {props.plan.type === "Premium" ? (
                          <CardIcon
                            align="center"
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
                      <>
                        <Typography
                          component={"span"}
                          style={{ alignContent: "center", fontSize: "40px" }}
                          color="textSecondary"
                        >
                          <span style={{ fontSize: "50px" }}>&#8377;</span>
                          {props.plan.price}/{props.plan.time}
                        </Typography>
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
                      </>
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
                <CardFooter stats style={{ alignSelf: "center" }}>
                  <hr />
                  <Typography
                    component={"span"}
                    style={{ textAlignLast: "center" }}
                  >
                    <Typography style={{ fontSize: "19px" }}>
                      1 Team{" "}
                    </Typography>
                    <Typography>
                      {`${props.plan.No_of_team_member} Team Member`}{" "}
                    </Typography>
                    <Typography style={{ fontSize: "19px" }}>
                      {`${props.plan.No_of_Projects} Project's`}{" "}
                    </Typography>
                    <Typography>
                      {`${props.plan.No_of_project_members} Project Member`}{" "}
                    </Typography>
                    <Typography style={{ fontSize: "19px" }}>
                      Cloud Storage{" "}
                    </Typography>
                    <Typography>{props.plan.cloud_storage} </Typography>
                  </Typography>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
          <Divider />
          <CardActions>
            <Typography>
              The refunds don't work once you have the subscription, but you can
              always <a href="/cancel">Cancel your subscription</a>.
            </Typography>
          </CardActions>
        </form>
      </Card>
    </>
  );
}

class Subscription extends Component {
  state = {
    prime: false,
    Subscription_level: "Free",
    plan: [],
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          prime: "true",
        });
      });
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
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          prime: "true",
        });
      });
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
    }
  }

  render() {
    return (
      <Subscriptions
        prime={this.state.prime}
        plan={this.state.plan}
        Subscription_level={this.state.Subscription_level}
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

export default connect(mapStateToProps)(Subscription);
