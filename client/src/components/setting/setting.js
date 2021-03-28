import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Notifications from "./components/notification";
import Password from "./components/password";
import UserProfileSetting from "./components/usercard.js";
import Subscription from "./components/subscription.js";
import ContactUs from "./components/contactus.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "none",
    width: "100%",
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

export default function Settings(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.sectionDesktop} style={{ padding: "50px" }}>
        <AppBar
          position="static"
          color="default"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{
              background: "black",
              boxShadow:
                "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
            }}
          >
            <Tab
              style={{ color: "aliceblue" }}
              label="General"
              {...a11yProps(0)}
              icon={
                <img
                  alt="general"
                  src="https://img.icons8.com/color/24/000000/user-male-circle.png"
                />
              }
            />
            <Tab
              style={{ color: "aliceblue" }}
              label="Subscription"
              icon={
                <img
                  style={{ backgroundColor: "bisque" }}
                  alt="subscription"
                  src="https://img.icons8.com/dotty/24/000000/subscription.png"
                />
              }
              {...a11yProps(1)}
            />
            <Tab
              style={{ color: "aliceblue" }}
              label="Notification"
              icon={
                <img
                  alt="notification"
                  src="https://img.icons8.com/color/24/000000/appointment-reminders.png"
                />
              }
              {...a11yProps(2)}
            />
            <Tab
              style={{ color: "aliceblue" }}
              label="Security"
              icon={
                <img
                  alt="security"
                  src="https://img.icons8.com/fluent/24/000000/security-pass.png"
                />
              }
              {...a11yProps(3)}
            />
            <Tab
              style={{ color: "aliceblue" }}
              label="Contact Us"
              icon={
                <img
                  alt="contact-us"
                  src="https://img.icons8.com/color/24/000000/add-contact-to-company.png"
                />
              }
              {...a11yProps(4)}
            />
          </Tabs>
        </AppBar>
      </div>
      <div className={classes.sectionMobile}>
        <AppBar
          position="static"
          color="default"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{
              background: "black",
              boxShadow:
                "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
            }}
          >
            <Tab
              style={{ color: "aliceblue" }}
              {...a11yProps(0)}
              icon={
                <img
                  alt="general"
                  src="https://img.icons8.com/color/24/000000/user-male-circle.png"
                />
              }
            />
            <Tab
              style={{ color: "aliceblue" }}
              icon={
                <img
                  style={{ backgroundColor: "bisque" }}
                  alt="subscription"
                  src="https://img.icons8.com/dotty/24/000000/subscription.png"
                />
              }
              {...a11yProps(1)}
            />
            <Tab
              style={{ color: "aliceblue" }}
              icon={
                <img
                  alt="notification"
                  src="https://img.icons8.com/color/24/000000/appointment-reminders.png"
                />
              }
              {...a11yProps(2)}
            />
            <Tab
              style={{ color: "aliceblue" }}
              icon={
                <img
                  alt="security"
                  src="https://img.icons8.com/fluent/24/000000/security-pass.png"
                />
              }
              {...a11yProps(3)}
            />
            <Tab
              style={{ color: "aliceblue" }}
              icon={
                <img
                  alt="contact-us"
                  src="https://img.icons8.com/color/24/000000/add-contact-to-company.png"
                />
              }
              {...a11yProps(4)}
            />
          </Tabs>
        </AppBar>
      </div>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserProfileSetting handlelong={props.handlelong} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Subscription />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Notifications handleAllignment={props.handleAllignment} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Password />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <ContactUs />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
