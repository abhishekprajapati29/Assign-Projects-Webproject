import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

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
    alignItems: "center",
  },
  column: {
    flexBasis: "100%",
    padding: "5px ",
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

export default function UserlistMobile(props) {
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
            <Typography className={classes.heading} style={{ fontWeight: 500 }}>
              User:-
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography
              className={classes.heading}
              style={{ fontWeight: 800, textTransform: "capitalize" }}
            >
              {data.username ? data.username : "-"}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            <Avatar
              style={{ margin: "auto", padding: "4px" }}
              src={data.image.image}
            ></Avatar>
            <Typography
              variant="h6"
              style={{
                fontWeight: 700,
                textAlignLast: "center",
                padding: "4px",
              }}
              gutterBottom
            >
              Email
            </Typography>
            <Typography style={{ fontSize: "18px", textAlignLast: "center" }}>
              {data.email ? data.email : "-"}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontWeight: 700,
                textAlignLast: "center",
                padding: "4px",
              }}
              gutterBottom
            >
              Location
            </Typography>
            <Typography style={{ fontSize: "18px", textAlignLast: "center" }}>
              {data.profile.loaction ? data.profile.loaction : "-"}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontWeight: 700,
                textAlignLast: "center",
                padding: "4px",
              }}
              gutterBottom
            >
              Phone Number
            </Typography>
            <Typography style={{ fontSize: "18px", textAlignLast: "center" }}>
              {data.phone_number ? data.phone_number : "-"}
            </Typography>
          </div>
        </AccordionDetails>
        <>
          {props.teamName === "default_team_name" ? (
            <>
              <Divider />

              <AccordionActions
                style={{ backgroundColor: "blue", justifyContent: "center" }}
              >
                {props.invoice_data.filter((fil) => {
                  return (
                    fil.requested_by === props.fulluserdata.id &&
                    fil.user === data.id
                  );
                }).length > 0 ? (
                  <Button color="primary" disabled>
                    Requested
                  </Button>
                ) : (
                  <Button
                    style={{ color: "aliceblue", flexGrow: "1" }}
                    onClick={(event) => {
                      props.handleInvoice(event, data.id);
                    }}
                  >
                    ADD
                  </Button>
                )}
              </AccordionActions>
            </>
          ) : (
            <>
              <Divider />

              <AccordionActions
                style={{ backgroundColor: "blue", justifyContent: "center" }}
              >
                <Button
                  style={{ color: "aliceblue", flexGrow: "1" }}
                  onClick={(event) => {
                    props.setRedirect(data.id);
                  }}
                >
                  View
                </Button>
              </AccordionActions>
            </>
          )}
        </>
      </Accordion>
    </div>
  );
}
