import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCSS } from "fg-loadcss";
import { authLogout } from "../../store/actions/auth";
import Divider from "@material-ui/core/Divider";
import SidebarNav from "./sidebarNav/sidebarNav";
import Profile from "./profile/profile";
import { makeStyles } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import './side.css'

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  ac: {
    padding: theme.spacing(1),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  right: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: "64px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    height: "100%",
    paddingLeft: 280,
    paddingRight: "73px",
  },
  content1: {
    height: "100%",
  },
  list: {
    width: "300px",
  },
  root: {
    margin: "25px",

    paddingLeft: "0",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
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
    ...theme.mixins.toolbar,
  },
}));

const Sidebars = (props) => {
  const classes = useStyles();
  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const pages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon alt="Dashboard" />,
    },
    {
      title: "Todo",
      href: "/todolist",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/todo-list--v1.png"
          alt="Todo"
        />
      ),
    },
    {
      title: "Notes",
      href: "/note",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/note--v1.png"
          alt="Note"
        />
      ),
    },
    {
      title: "Diarys",
      href: "/diarys",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/spiral-bound-booklet.png"
          alt="Diary"
        />
      ),
    },
    {
      title: "Albums",
      href: "/data",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/image.png"
          alt="Albums"
        />
      ),
    },
    {
      title: "Videos",
      href: "/videos",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/video-playlist.png"
          alt="videos"
        />
      ),
    },
    {
      title: "Document",
      href: "/files",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/pdf.png"
          alt="pdf"
        />
      ),
    },
    {
      title: "Team",
      href: "/userlist",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/user-group-man-woman.png"
          alt="Team"
        />
      ),
    },
    {
      title: "Team Forum",
      href: "/teamforum",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/comment-discussion.png"
          alt="Forum"
        />
      ),
    },
    {
      title: "Profile",
      href: "/profile",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/person-male.png"
          alt="profile"
        />
      ),
    },
    {
      title: "Project",
      href: "/project",
      icon: (
        <img
          alt="=="
          src="https://img.icons8.com/material/24/000000/project.png"
          style={{ fontSize: "30px", filter: "invert(100%)" }}
        />
      ),
    },
    {
      title: "Selecter",
      href: "/selecter",
      icon: (
        <img
          alt="selecter"
          src="https://img.icons8.com/material/24/000000/checked--v1.png"
          style={{ fontSize: "30px", filter: "invert(100%)" }}
        />
      ),
    },
    {
      title: "Settings",
      href: "/settings",
      icon: (
        <img
          style={{ filter: "invert(100%)", fontSize: "30px" }}
          src="https://img.icons8.com/material/24/000000/gear.png"
          alt="setting"
        />
      ),
    },
  ];

  return (
    <div style={{ background: "#3f51b5"}}>
      {props.isAuthenticated ? (
        <div >
          <Profile open={props.handleOpen} />
          <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.87)" }} />
          <SidebarNav
            className={classes.nav}
            pages={pages}
            onClick={props.handle}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

class Sidebar extends Component {
  render() {
    return (
      <div>
        <Sidebars {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
