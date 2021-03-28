import React, { Component } from "react";
import { connect } from "react-redux";
import Plan_detail from "../../../plan-detail.js";
import axios from "axios";
import moment from "moment";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import CardHeader from "../../css/Card/CardHeader";
import Card from "../../css/Card/Card";
import Button from "../../css/CustomButtons/Button";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import { CardContent, CardActions } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
}));

const Cancel = (props) => {
  const { className } = props;
  const classes = useStyles();
  return (
    <div style={{ padding: "63px 40px" }}>
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
                Cancel your Subscription
              </Typography>
            </div>
          </CardHeader>
          <CardContent>
            <Card
              style={{
                width: "100%",
                boxShadow:
                  "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
              }}
            >
              <CardContent>
                <div style={{ width: "auto", padding: "16px" }}>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: "25px",
                      fontFamily: "cursive",
                      fontWeight: 700,
                    }}
                  >
                    Current Plan
                  </Typography>
                  <br />
                  <Typography>{`Price :- ${props.plan.price}`}</Typography>
                  <Typography>{`Subscription Type :- ${props.plan.type}`}</Typography>
                  <Typography>{`Time :- 1 ${props.plan.time}`}</Typography>
                  <Typography>{`Number of Team :- ${props.plan.No_team}`}</Typography>
                  <Typography>{`Number of Team Member :- ${props.plan.No_of_team_member}`}</Typography>
                  <Typography>{`Number of Projects :- ${props.plan.No_of_Projects}`}</Typography>
                  <Typography>{`Number of project Members :- ${props.plan.No_of_project_members}`}</Typography>
                  <Typography>{`Cloud Storage :- ${props.plan.cloud_storage}`}</Typography>
                </div>
              </CardContent>
              <CardActions style={{ padding: "0 15px 15px" }}>
                <div style={{ width: "100%" }}>
                  <hr />
                  <div style={{ display: "flex" }}>
                    <Button
                      onClick={(event) => props.handleCancelSubs(event)}
                      style={{ backgroundColor: "red" }}
                    >
                      Cancel Subscription
                    </Button>
                    <Button href="/settings">Cancel</Button>
                  </div>
                </div>
              </CardActions>
            </Card>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

class CancelSubs extends Component {
  state = {
    plan: [],
    subs: [],
    curDate: new Date(),
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
              subs: res.data[0],
            });
          } else {
            if (res.data.length > 0) {
              this.setState({
                plan: Plan_detail.filter((data) => {
                  return data.price === 0;
                })[0],
                subs: res.data[0],
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
              subs: res.data[0],
            });
          } else {
            if (res.data.length > 0) {
              this.setState({
                plan: Plan_detail.filter((data) => {
                  return data.price === 0;
                })[0],
                subs: res.data[0],
              });
            }
          }
        });
    }
  }

  handleCancelSubs = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to Cancel the Subscription?")) {
      var date = moment(this.state.curDate).format("YYYY-MM-DD HH:MM:SS");
      let form_data = new FormData();
      form_data.append("amount", 0);
      form_data.append("bank_name", "Free");
      form_data.append("txn_date", date);
      const url_patch = `https://${this.props.url}/Subs/${this.state.subs.id}/`;
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios
        .patch(url_patch, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.handleData();
        })
        .catch((err) => console.log(err));
    }
  };

  handleData = () => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/Subs/`).then((res) => {
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
        dateTo = moment(val.txn_date).add(12, "months").format("YYYY-MM-DD");
      } else {
        dateTo = moment(dateFrom).add(1, "months").format("YYYY-MM-DD");
      }
      if (res.data.length > 0 && dateFrom < dateTo) {
        this.setState({
          plan: Plan_detail.filter((data) => {
            return data.price === ~~val.amount;
          })[0],
          subs: res.data[0],
        });
      } else {
        if (res.data.length > 0) {
          this.setState({
            plan: Plan_detail.filter((data) => {
              return data.price === 0;
            })[0],
            subs: res.data[0],
          });
        }
      }
    });
  };

  render() {
    return (
      <Cancel plan={this.state.plan} handleCancelSubs={this.handleCancelSubs} />
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

export default connect(mapStateToProps)(CancelSubs);
