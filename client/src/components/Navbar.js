import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import logo from '../logo.png'
import MoreIcon from "@material-ui/icons/MoreVert";
import Sidebar from "./sidebar/sidebar.js";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Icon from "@material-ui/core/Icon";
import SettingsIcon from "@material-ui/icons/Settings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import "../navbar.css";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const drawerWidth = 240;
const drawerWidth1 = 400;

const theme1 = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiDrawer: {
      // Name of the rule
      paper: {
        // Some CSS
        backgroundColor: "rgb(63, 81, 181)",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 250,
    backgroundColor: "red",
  },
  fullList: {
    width: "auto",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: "18px",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  drawer1: {
    width: drawerWidth1,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "rgb(63, 81, 181)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "rgb(63, 81, 181)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginTop: '64px'
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    props.handleSideBarOpen();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    props.handleSideBarClose();
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLink=(data)=>{
    handleMenuClose();
    props.setRedirect(data)
  }

  const handleLogout=(event)=>{
    handleMenuClose();
    props.handleLogout(event);
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ backgroundColor: "rgb(63, 81, 181)" }}
    >
      <Sidebar
        handleOpen={props.SideBar}
        handleClose={props.handleSideBarClose}
      />
    </div>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleLink("dashboard")}>
        <DashboardIcon style={{ marginRight: "10px" }} /> Dashboard
      </MenuItem>
      <MenuItem onClick={() => handleLink("profile")}>
        <AccountCircleIcon style={{ marginRight: "10px" }} /> Profile
      </MenuItem>
      <MenuItem onClick={() => handleLink("settings")}>
        <SettingsIcon style={{ marginRight: "10px" }} /> Setting
      </MenuItem>
      <MenuItem onClick={(event) => handleLogout(event)}>
        <PowerSettingsNewIcon style={{ marginRight: "10px" }} />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <React.Fragment>
      {props.isAuthenticated ? (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuOpen}>
            <Avatar
              alt={props.username}
              style={{
                boxShadow:
                  "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
              }}
              src={props.user_image}
            />
            <Typography style={{ padding: "6px" }}>Profile</Typography>
          </MenuItem>
          <MenuItem onClick={props.toggleDrawer("right", true)}>
            <img
              alt="invite"
              src="https://img.icons8.com/fluent/24/000000/invite.png"
              style={{ color: "white", padding: "4px" }}
            />
            Invite
          </MenuItem>
          <MenuItem onClick={props.toggleDrawer1("right", true)}>
            <img
              alt="message"
              style={{ padding: "4px" }}
              src="https://img.icons8.com/flat_round/24/000000/speech-bubble.png"
            />
            Message
          </MenuItem>
          <MenuItem onClick={props.toggleDrawer2("right", true)}>
            <img
              alt="notification"
              style={{ padding: "4px" }}
              src="https://img.icons8.com/color/24/000000/appointment-reminders.png"
            />
            Notification
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={() => handleLink("signin")}>
            <Icon
              className={clsx(classes.icon, "fas fa-sign-in-alt")}
              style={{ marginRight: "10px" }}
              variant="outlined"
            />
            Sign In
          </MenuItem>
          <MenuItem onClick={() => handleLink("signup")}>
            <PersonAddIcon style={{ marginRight: "10px" }} /> Sign Up
          </MenuItem>
        </Menu>
      )}
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {props.isAuthenticated ? (
            <div>
              <div className={classes.sectionDesktop}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer("left", true)}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          ) : null}

          {/* {
                (props.isAuthenticated)?
                (<IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <MenuIcon />
                  </IconButton>):
                (null)
            } */}

          {open === false ? (
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <img alt="logo" src={logo} style={{width: '40px', height: '40px'}}/>
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                CTPM
              </Typography>
            </Toolbar>
          ) : null}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.isAuthenticated ? (
              <Fragment>
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={props.toggleDrawer("right", true)}
                >
                  <Badge badgeContent={props.invoice} color="secondary">
                    <img
                      alt="invite"
                      src="https://img.icons8.com/fluent/24/000000/invite.png"
                      style={{ color: "white" }}
                    />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={props.toggleDrawer1("right", true)}
                >
                  <Badge badgeContent={props.messages} color="secondary">
                    <img
                      alt="message"
                      src="https://img.icons8.com/flat_round/24/000000/speech-bubble.png"
                    />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={props.toggleDrawer2("right", true)}
                >
                  <Badge badgeContent={props.notification} color="secondary">
                    <img
                      alt="notification"
                      src="https://img.icons8.com/color/24/000000/appointment-reminders.png"
                    />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt={props.username}
                    style={{
                      boxShadow:
                        "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                    }}
                    src={props.user_image}
                  />
                </IconButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  onClick={() => props.setRedirect("signin")}
                  color="inherit"
                  variant="outlined"
                  className={classes.icon}
                >
                  <Icon
                    className={clsx(classes.icon, "fas fa-sign-in-alt")}
                    variant="outlined"
                  />
                  Sign In
                </Button>
                <Button
                  onClick={() => props.setRedirect("signup")}
                  color="inherit"
                  variant="outlined"
                  className={classes.icon}
                >
                  <PersonAddIcon variant="extended" className={classes.icon} />
                  Sign Up
                </Button>
              </Fragment>
            )}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {props.isAuthenticated ? (
        <>
          <div className={classes.sectionDesktop}>
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
            >
              <div
                className={classes.toolbar}
                style={{ backgroundColor: "black" }}
              >
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  style={{ color: "white" }}
                >
                  <img alt="logo" src={logo} style={{width: '40px', height: '40px'}} />
                </IconButton>
                <Typography
                  className={classes.title}
                  style={{ color: "white" }}
                  variant="h6"
                  noWrap
                >
                  CTPM
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon style={{ color: "white" }} />
                  ) : (
                    <ChevronLeftIcon style={{ color: "white" }} />
                  )}
                </IconButton>
              </div>
              <Divider />
              <Sidebar
                handleOpen={props.SideBar}
                handleClose={props.handleSideBarClose}
              />
            </Drawer>
            <Drawer
              anchor="right"
              open={props.state2}
              onClose={props.toggleDrawer1("right", false)}
            >
              {props.sideListMessage("right")}
            </Drawer>
            <Drawer
              anchor="right"
              open={props.state1}
              onClose={props.toggleDrawer("right", false)}
            >
              {props.sideListInvoice("right")}
            </Drawer>

            <Drawer
              anchor="right"
              open={props.state3}
              onClose={props.toggleDrawer2("right", false)}
            >
              {props.sideListNotification("right")}
            </Drawer>
          </div>
          <div className={classes.sectionMobile}>
            <ThemeProvider theme={theme1}>
              <React.Fragment key={"left"}>
                <Drawer
                  anchor={"left"}
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  {list("left")}
                </Drawer>
              </React.Fragment>
            </ThemeProvider>
          </div>
        </>
      ) : null}
      <main className={classes.content}>{props.children}</main>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
