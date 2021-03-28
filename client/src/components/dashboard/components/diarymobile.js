import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "5px 0",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    display: "flex",
  },
  column: {
    flexBasis: "70%",
    padding: "5px",
  },
  column1: {
    flexBasis: "30%",
    padding: "5px",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function MobileDiary(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading} style={{ fontWeight: 800 }}>
              Date:-
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {moment(data.posted_date).format("YYYY-MM-DD")}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            <Typography
              variant="h6"
              style={{ fontWeight: 700, textAlignLast: "center" }}
              gutterBottom
            >
              Title
            </Typography>
            <Typography style={{ fontSize: "18px" }}>
              {data.title.length < 10
                ? data.title
                : data.title.slice(0, 10) + "...."}
            </Typography>
          </div>
          <div className={clsx(classes.column1, classes.helper)}>
            <Tooltip title="View">
              <Button
                size="medium"
                aria-label="Edit"
                className={classes.fab}
                href={`/diaryview/${data.id}/`}
              >
                <VisibilityIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                size="medium"
                aria-label="Edit"
                className={classes.fab}
                href={`/diarys/${data.id}/`}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
