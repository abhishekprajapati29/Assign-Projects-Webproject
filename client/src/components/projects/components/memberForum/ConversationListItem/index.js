import React from "react";

import "./ConversationListItem.css";
import { Redirect } from "react-router-dom";
import { Card, makeStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../../../../../loading";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Toolbar from "@material-ui/core/Toolbar";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyle = makeStyles((theme) => ({
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

function ConversationListItems(props) {
  const classes = useStyle();
  return (
    <>
      <div className={classes.sectionDesktop} style={{ width: "100%" }}>
        {props.renderRedirect()}
        {!props.loading && !props.loading1 ? (
          props.activeUsers.map((data) => (
            <Card
              key={data.id}
              onClick={() => this.setRedirect(data.id)}
              style={{
                width: "100%",
                boxShadow:
                  "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                borderRadius: "35px",
                margin: "0 10px 10px 10px",
                background: "linear-gradient(45deg, #3c4858, #e0e0e0)",
              }}
            >
              <div className="conversation-list-item">
                <StyledBadge
                  style={{ margin: "13px 5px", display: "flex" }}
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  variant="dot"
                >
                  <img
                    className="conversation-photo"
                    src={data.image.image}
                    alt="conversation"
                  />
                </StyledBadge>
                <div className="conversation-info">
                  <h1 className="conversation-title">{data.username}</h1>
                  <p className="conversation-snippet">
                    {data.profile.about_me}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <div className={classes.sectionMobile}>
        <>
          {props.renderRedirect()}
          {!props.loading && !props.loading1 ? (
            <div style={{ width: "100%", padding: "10px" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                  <div className={classes.column}>
                    <AvatarGroup max={3}>
                      {props.activeUsers.map((data) => (
                        <Avatar alt={data.username} src={data.image.image} />
                      ))}
                    </AvatarGroup>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div style={{ width: "100%" }}>
                    <Typography
                      style={{
                        textAlign: "center",
                        fontWeight: "800",
                        padding: "5px",
                      }}
                    >
                      Active Users:-
                    </Typography>
                    <div
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "2px",
                        height: "225px",
                        overflow: "auto",
                      }}
                    >
                      {props.activeUsers.map((data) => (
                        <Toolbar style={{ width: "100%" }} key={data.id}>
                          <Avatar
                            alt={data.username}
                            src={data.image.image}
                            style={{ margin: "0 10px 3px 0" }}
                          />
                          <Typography style={{ textTransform: "capitalize" }}>
                            {data.username}
                          </Typography>
                        </Toolbar>
                      ))}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : null}
        </>
      </div>
    </>
  );
}

class ConversationListItem extends React.Component {
  state = {
    redirect: false,
    id: "",
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

  render() {
    const { data, users } = this.props;
    var activeUsers = [];
    var DeactiveUsers = [];

    // var data = []
    // select.forEach(res=>{
    //   data = data.concat( this.props.taskFull.filter(filt=>{
    //     return filt.tasks === res;
    //   }))

    // })
    if (users) {
      users.map(
        (data1) =>
          (activeUsers = activeUsers.concat(
            data.filter((data2) => {
              return data2.username === data1.name;
            })
          ))
      );

      users.map(
        (data1) =>
          (DeactiveUsers = DeactiveUsers.concat(
            data.filter((data2) => {
              return data2.username !== data1.name;
            })
          ))
      );
    }

    return (
      <ConversationListItems
        loading={this.props.loading}
        loading1={this.props.loading1}
        activeUsers={activeUsers}
        renderRedirect={this.renderRedirect}
      />
    );
  }
}

export default ConversationListItem;
