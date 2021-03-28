import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function Reports(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      {props.report
        ? props.report.map((data) => (
            <ExpansionPanel
              key={data.id}
              expanded={expanded === `panel${data.id}`}
              onChange={handleChange(`panel${data.id}`)}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id={`panel${data.id}bh-header`}
              >
                <Typography component={"span"} className={classes.heading}>
                  Posted By:- {data.posted_by}
                </Typography>
                <Typography
                  component={"span"}
                  className={classes.secondaryHeading}
                ></Typography>
                <Typography
                  component={"span"}
                  className={classes.secondaryHeading}
                  style={{ align: "right" }}
                >
                  {moment(data.timestamp).format("DD/MM/YYYY")}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <>
                  <Typography component={"span"}>
                    Report:- {ReactHtmlParser(data.report)}
                  </Typography>
                </>
                <>
                  <hr />
                  <Typography component={"span"} style={{ marginTop: "10px" }}>
                    Status:- {data.status}
                  </Typography>
                </>
                <>
                  <hr />
                  <Typography component={"span"} style={{ marginTop: "10px" }}>
                    Comment:- {data.comment}
                  </Typography>
                </>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        : null}
    </div>
  );
}

class ReportOwner extends Component {
  state = {};

  render() {
    return <Reports report={this.props.data.report} />;
  }
}

export default ReportOwner;
