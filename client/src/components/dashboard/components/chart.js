import React, { Component } from "react";
import gamer from "../../css/Card/marc.jpg";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "../../css/Card/CardHeader";
import Card from "../../css/Card/Card";
import CardFooter from "../../css/Card/CardFooter";
import GridItem from "../../css/Grid/GridItem";
import GridContainer from "../../css/Grid/GridContainer";
import ChartistGraph from "react-chartist";
import "../components/App.css";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "./charts";

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
}));

function Charts(props) {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <div className="jssSlide1" style={{ padding: "13px" }}>
            <CardHeader
              color="success"
              className="jssSlide2 "
              style={{ margin: "-42px 0px 0px 0px" }}
            >
              <ChartistGraph
                className="ct-chart "
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
          </div>
          <div className={classes.marginContent}>
            <h4 className={classes.cardTitle}>Daily Sales</h4>
            <p className={classes.cardCategory}>
              <span className={classes.successText}>
                <ArrowUpward className={classes.upArrowCardCategory} /> 55%
              </span>{" "}
              increase in today sales.
            </p>
          </div>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> updated 4 minutes ago
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <div className="jssSlide1" style={{ padding: "13px" }}>
            <CardHeader
              color="warning"
              className="jssSlide2"
              style={{ margin: "-42px 0px 0px 0px" }}
            >
              <ChartistGraph
                className=" ct-chart jssSlide1"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <div className={classes.marginContent}>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </div>
          </div>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> campaign sent 2 days ago
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <div className="jssSlide1" style={{ padding: "13px" }}>
            <CardHeader
              color="danger"
              className="jssSlide2"
              style={{ margin: "-42px 0px 0px 0px" }}
            >
              <ChartistGraph
                className="ct-chart jssSlide1"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <div className={classes.marginContent}>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </div>
          </div>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> campaign sent 2 days ago
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

class DashChart extends Component {
  render() {
    return <Charts />;
  }
}

export default DashChart;
