import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import helpers from "../diarys/components/helpers.js";
import SendIcon from "@material-ui/icons/Send";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Plan_detail from "../../plan-detail.js";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";

import { successColor, blackColor, hexToRgb } from "../as.js";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

import SearchInput from "./searchInput.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  root1: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  position: {
    width: 560,
    height: 710,
    transform: "translateZ(0)",
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  iconright: {
    margin: theme.spacing(1),
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  success: {
    backgroundColor: successColor[0],
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(successColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(successColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(successColor[0]) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: successColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.2)",
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
}));

const UsersToolbars = (props) => {
  const [open1, setOpen] = React.useState(false);
  const [open, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClickOpen2 = (scrollType) => () => {
    setOpen2(true);
    setScroll(scrollType);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen1 = (scrollType) => () => {
    setOpen1(true);
    setOpen22(false)
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const classes = useStyles();

  function handleBack(event) {
    setOpen2(false);
    props.handleSubmit(event);
  }

  const [open12, setOpen12] = React.useState(false);

  const handleClickOpen12 = () => {
    setOpen12(true);
  };

  const handleClose12 = () => {
    setOpen12(false);
  };

  const [open11, setOpen11] = React.useState(false);

  const handleClickOpen11 = () => {
    setOpen11(true);
  };

  const handleClose11 = () => {
    setOpen11(false);
  };

  const [open22, setOpen22] = React.useState(false);

  const handleClickOpen22 = () => {
    setOpen22(true);
  };

  const handleClose22 = () => {
    setOpen22(false);
  };

  function handleDelete(event, id) {
    setOpen22(true);
    props.handleDelete(event, id);
  }

  const [open33, setOpen33] = React.useState(false);

  const handleClickOpen33 = () => {
    setOpen33(true);
  };

  const handleClose33 = () => {
    setOpen33(false);
  };

  function handleLeave(event) {
    setOpen33(true);
    props.handleLeave(event);
  }

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <div className={classes.row} style={{ marginRight: "10px" }}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
            handleDataChange={props.handleDataChange}
          />
        </div>
        {props.teamName === "default_team_name" ? (
          <>
            <div className={classes.sectionDesktop}>
              <Button
                color="primary"
                variant="contained"
                style={{
                  margin: "0 10px 0 20px",
                  background: "black",
                  color: "aliceblue",
                  boxShadow:
                    "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                }}
                onClick={handleClickOpen2("paper")}
              >
                <img
                  style={{ margin: "5px" }}
                  alt="Create Team"
                  src="https://img.icons8.com/fluent/24/000000/user-group-man-woman.png"
                />
                Create Team
              </Button>
              <Badge
                color="secondary"
                style={{ margin: "10px" }}
                badgeContent={props.team_request_count}
              >
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    margin: "0 10px 0 20px",
                    background: "black",
                    color: "aliceblue",
                    boxShadow:
                      "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                  }}
                  onClick={handleClickOpen1("paper")}
                >
                  <img
                    style={{ margin: "5px" }}
                    alt="Team Request's"
                    src="https://img.icons8.com/fluent/24/000000/invite.png"
                  />
                  Team Request
                </Button>
              </Badge>
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
              <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
              >
                <MenuItem onClick={handleClickOpen2("paper")}>
                  <img
                    style={{ margin: "10px" }}
                    alt="Create Team"
                    src="https://img.icons8.com/fluent/24/000000/user-group-man-woman.png"
                  />
                  Create Team
                </MenuItem>
                <MenuItem onClick={handleClickOpen1("paper")}>
                  <Badge
                    color="secondary"
                    style={{ margin: "10px" }}
                    badgeContent={props.team_request_count}
                  >
                    <img
                      alt="Team Request's"
                      src="https://img.icons8.com/fluent/24/000000/invite.png"
                    />
                  </Badge>{" "}
                  Team Request's
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <>
            <div className={classes.sectionDesktop}>
              <Badge
                color="secondary"
                style={{ margin: "10px" }}
                badgeContent={props.team_request_count}
              >
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    margin: "0 0px 0 20px",
                    background: "black",
                    color: "aliceblue",
                    boxShadow:
                      "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                  }}
                  onClick={handleClickOpen1("paper")}
                >
                  <img
                    alt="Team Request's"
                    style={{ margin: "5px" }}
                    src="https://img.icons8.com/fluent/24/000000/invite.png"
                  />
                  Team Request
                </Button>
              </Badge>
              <Button
                color="primary"
                variant="contained"
                className={classes.iconright}
                style={{
                  margin: "5px",
                  background: "black",
                  color: "aliceblue",
                  boxShadow:
                    "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                }}
                onClick={handleClickOpen("paper")}
              >
                <img
                  style={{ margin: "5px" }}
                  alt="Add User's"
                  src="https://img.icons8.com/fluent/24/000000/user-group-man-woman.png"
                />
                Add user
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.iconright}
                style={{
                  color: "aliceblue",
                  margin: "5px",
                  boxShadow:
                    "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                }}
                startIcon={
                  <img
                    alt="Leave Team"
                    src="https://img.icons8.com/color/24/000000/leaving-queue.png"
                  />
                }
                onClick={handleClickOpen33}
              >
                Leave Team
              </Button>
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
              <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
              >
                <MenuItem onClick={handleClickOpen1("paper")}>
                  <Badge
                    color="secondary"
                    style={{ margin: "10px" }}
                    badgeContent={props.team_request_count}
                  >
                    <img
                      alt="Team Request's"
                      src="https://img.icons8.com/fluent/24/000000/invite.png"
                    />
                  </Badge>{" "}
                  Team Request's
                </MenuItem>

                <MenuItem onClick={handleClickOpen("paper")}>
                  <img
                    alt="Add User's"
                    style={{ margin: "10px" }}
                    src="https://img.icons8.com/fluent/24/000000/user-group-man-woman.png"
                  />
                  Add User's
                </MenuItem>
                <MenuItem onClick={handleClickOpen33}>
                  <img
                    alt="leave Team"
                    style={{ margin: "10px" }}
                    src="https://img.icons8.com/color/24/000000/leaving-queue.png"
                  />
                  Leave Team
                </MenuItem>
              </Menu>
            </div>

            <Dialog
              open={open33}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose22}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">Action</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure to Leave Team?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose33} color="primary">
                  Disagree
                </Button>
                <Button onClick={(event) => handleLeave(event)} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose1}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Team Request</DialogTitle>
        <DialogContent
          className={classes.position}
          dividers={scroll === "paper"}
        >
          <Table>
            <TableBody>
              {props.currentuserInvoice.map((user) => (
                <TableRow className={classes.tableRow} hover key={user.id}>
                  <TableCell>
                    <div className={classes.nameContainer}>{user.invoice}</div>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      aria-label="contained primary button group"
                    >
                      {props.users.length < props.plan.No_of_team_member ? (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={props.loading}
                          loading={props.loading}
                          onClick={(event) =>
                            props.Teamaddrequestbutton(
                              event,
                              user.requested_by,
                              user,
                              user.id
                            )
                          }
                        >
                          Accept terms
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen12}
                          >
                            Accept terms
                          </Button>
                          <Dialog
                            open={open12}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose12}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle id="alert-dialog-slide-title">
                              Alert
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                You Limit For Accepting Team Member is Full,
                                Upgrade to add more.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                href="/plan"
                                onClick={handleClose12}
                                style={{
                                  color: "aliceblue",
                                  background: "black",
                                }}
                              >
                                Upgrade
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      )}
                      <Button onClick={handleClickOpen22} color="default">
                        Cancel
                      </Button>
                      <Dialog
                        open={open22}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose22}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle id="alert-dialog-slide-title">
                          {"Use Google's location service?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure to remove{" "}
                            <b style={{ fontSize: "18px" }}>
                              {" "}
                              {user.invoice ? <>{user.invoice}</> : null}{" "}
                            </b>
                            ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose22} color="primary">
                            Disagree
                          </Button>
                          <Button
                            onClick={(event) => handleDelete(event, user.id)}
                            color="primary"
                          >
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">ADD USER</DialogTitle>
        <DialogContent
          className={classes.position}
          dividers={scroll === "paper"}
        >
          <Table>
            <TableBody>
              {props.data.map((user) => (
                <TableRow className={classes.tableRow} hover key={user.id}>
                  <TableCell>
                    <div className={classes.nameContainer}>
                      <Avatar className={classes.avatar} src={user.image.image}>
                        {helpers(user.username)}
                      </Avatar>
                      <Typography variant="body1">{user.username}</Typography>
                    </div>
                  </TableCell>
                  <TableCell className={classes.root}>
                    {!props.requested.find((data) => {
                      return (
                        data.user === user.id || data.user === props.user_id
                      );
                    }) ? (
                      props.users.length < props.plan.No_of_team_member ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(event) =>
                            props.handleaddbutton(event, user.id)
                          }
                        >
                          Add
                          <SendIcon className={classes.icon} />
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen11}
                          >
                            Add
                            <SendIcon className={classes.icon} />
                          </Button>
                          <Dialog
                            open={open11}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose11}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle id="alert-dialog-slide-title">
                              Alert
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                You Limit For Accepting Team Member is Full,
                                Upgrade to add more.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                href="/plan"
                                onClick={handleClose11}
                                style={{
                                  color: "aliceblue",
                                  background: "black",
                                }}
                              >
                                Upgrade
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      )
                    ) : (
                      <Button disabled variant="contained" color="primary">
                        Requested
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create Team Name</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="team"
            label="Team Name"
            name="team"
            type="text"
            value={props.team}
            fullWidth
            onChange={props.handleCreateData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

UsersToolbars.propTypes = {
  className: PropTypes.string,
};

class UsersToolbar extends Component {
  state = {
    useraddlist: [],
    loading: false,
    team: "",
    plan: [],
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

      axios
        .get(
          `https://${this.props.url}/addUserList/?profile__teamName=default_team_name`
        )
        .then((res) => {
          this.setState({
            useraddlist: res.data,
          });
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
      axios
        .get(
          `https://${this.props.url}/addUserList/?profile__teamName=default_team_name`
        )
        .then((res) => {
          this.setState({
            useraddlist: res.data,
          });
        });
    }
  }

  handleCreateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleDelete = (event, id) => {
    this.props.handleDelete(event, id);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("teamName", this.state.team);
    const url_put = `https://${this.props.url}/userprofile/${this.props.data.user_id}/`;
    axios
      .put(url_put, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.props.teamNameChange(res.data.teamName);
        axios
          .get(
            `https://${this.props.url}/addUserList/?profile__teamName=${this.props.data.teamName}`
          )
          .then((res) => {
            this.props.handleDataChange(res.data);
          });
      })
      .catch((err) => console.log(err));
  };

  handleLeave = (event) => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .get(`https://${this.props.url}/userprofile/`)
      .then((res0) => {
        const haha = res0.data[0];
        const old_teamName = haha.teamName;

        event.preventDefault();
        let form_data = new FormData();
        form_data.append("teamName", "default_team_name");
        const url_put = `https://${this.props.url}/userprofile/${this.props.data.user_id}/`;
        axios
          .put(url_put, form_data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            var socket = io("https://live-data-manager.herokuapp.com");
            axios.defaults.headers = {
              "Content-Type": "application.json",
              Authorization: "Token " + this.props.token,
            };

            axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
              const prof = res.data[0];
              this.setState({
                name: prof.user,
                room: prof.teamName,
              });
              socket.emit(
                "join",
                { name: prof.user, room: prof.teamName },
                (error) => {
                  if (error) {
                    alert(error);
                  }
                }
              );

              return () => {
                if (!prof.user & !prof.teamName) {
                  socket.emit("disconnect");

                  socket.off();
                }
              };
            });

            axios.defaults.headers = {
              "Content-Type": "application.json",
              Authorization: "Token " + this.props.token,
            };

            axios.get(`https://${this.props.url}/userprofile/`).then((res1) => {
              const prof = res1.data[0];
              const name = prof.user;
              const room = old_teamName;
              axios
                .get(`https://${this.props.url}/userprofileList/`)
                .then((res2) => {
                  const message = res2.data.filter((da) => {
                    return name !== da.username;
                  });
                  const ENDPOINT = "https://live-data-manager.herokuapp.com/";
                  socket = io(ENDPOINT);
                  socket.emit("userLeave", { name, room, message });
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 500);
                });
              const message2 = {
                id: Number(-1),
                content: `${name} Leaves the Team`,
                posted_by: prof.user,
                user: Number(0),
              };

              socket.emit("notificationSent", {
                name,
                room,
                message: message2,
              });
            });
            this.props.teamNameChange("default_team_name");
            axios
              .get(`https://${this.props.url}/userprofileList/`)
              .then((res3) => {
                const userdata = res3.data.filter((data) => {
                  return data.profile.teamName !== "default_team_name";
                });
                this.props.handleDataChange(userdata);
              });
          });
        axios.get(`https://${this.props.url}/userprofileList/`).then((res3) => {
          const userdata = res3.data.filter((data) => {
            return data.profile.teamName !== "default_team_name";
          });
          this.props.handleDataChange(userdata);
        });
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        const teamName = old_teamName;
        axios
          .get(
            `https://${this.props.url}/userprofileList/?profile__teamName=${teamName}`
          )
          .then((res6) => {
            var data1 = res6.data.filter((data) => {
              return data.username !== this.props.username;
            });
            data1.forEach((m) => {
              event.persist();
              let form_data = new FormData();
              form_data.append(
                "content",
                `${this.props.username} Leaves The Team`
              );
              form_data.append("posted_by", this.props.username);
              form_data.append("user", m.id);
              const url_post = `https://${this.props.url}/notification/`;
              axios.defaults.headers = {
                "Content-Type": "application.json",
                Authorization: "Token " + this.props.token,
              };
              axios
                .post(url_post, form_data, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {})
                .catch((err) => console.log(err));
            });
          });
      })
      .catch((err) => console.log(err));
  };

  handleaddbutton = (event, data) => {
    const userid = data;
    event.preventDefault();
    const username = localStorage.getItem("username");
    let form_data = new FormData();
    form_data.append("user", userid);
    form_data.append("invoice", `this invoice is given by ${username}`);
    form_data.append("requested_by", this.props.data.user_id);
    const url_post = `https://${this.props.url}/invoice/`;
    axios
      .post(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const data = res.data;
        var socket = io("https://live-data-manager.herokuapp.com");

        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios.get(`https://${this.props.url}/userprofile/`).then((res1) => {
          const prof = res1.data[0];
          const name = prof.user;
          const room = prof.teamName;
          const message = res.data;
          axios
            .get(`https://${this.props.url}/userprofileList/?id=${data.user}`)
            .then((res2) => {
              const prod = res2.data[0];
              const sendTo = prod.username;
              if (sendTo) {
                socket.emit("addUser", { name, room, sendTo, message });
              }
            });
        });
        axios.get(`https://${this.props.url}/invoice/`).then((res) => {
          this.props.handleInvoice(res.data);
        });
      })
      .catch((err) => console.log(err));
  };

  handleFull = (teamName, invoice_id) => {
    this.props.teamNameChange(teamName);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .get(
        `https://${this.props.url}/userprofileList/?profile__teamName=${teamName}`
      )
      .then((res) => {
        this.props.handleDataChange(res.data);
        this.setState({
          loading: false,
        });
      });
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.delete(`https://${this.props.url}/invoice/${invoice_id}/`);
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/invoice/`).then((res1) => {
      const currentuserInvoicedata = res1.data.filter((data) => {
        return Number(data.user) === invoice_id;
      });
      this.props.handleCurrentUserInvoice(currentuserInvoicedata);
    });
  };

  Teamaddrequestbutton = (event, data, user, invoice_id) => {
    this.setState({
      loading: true,
    });
    const { token } = this.props;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + token,
    };
    axios.get(`https://${this.props.url}/userprofile/`).then((aa) => {
      const teamName1 = aa.data[0];
      if (teamName1.teamName === "default_team_name") {
        axios
          .get(`https://${this.props.url}/addUserList/${data}/`)
          .then((res) => {
            const teamName = res.data.profile.teamName;
            event.persist();
            let form_data = new FormData();
            form_data.append("teamName", res.data.profile.teamName);
            const url_put = `https://${this.props.url}/userprofile/${this.props.data.user_id}/`;
            axios.defaults.headers = {
              "Content-Type": "application.json",
              Authorization: "Token " + token,
            };
            axios
              .put(url_put, form_data, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res0) => {
                var socket = io("https://live-data-manager.herokuapp.com");
                axios.defaults.headers = {
                  "Content-Type": "application.json",
                  Authorization: "Token " + this.props.token,
                };

                axios
                  .get(`https://${this.props.url}/userprofile/`)
                  .then((res) => {
                    const prof = res.data[0];
                    this.setState({
                      name: prof.user,
                      room: prof.teamName,
                    });
                    socket.emit(
                      "join",
                      { name: prof.user, room: prof.teamName },
                      (error) => {
                        if (error) {
                          alert(error);
                        }
                      }
                    );

                    return () => {
                      if (!prof.user & !prof.teamName) {
                        socket.emit("disconnect");

                        socket.off();
                      }
                    };
                  });
                axios.defaults.headers = {
                  "Content-Type": "application.json",
                  Authorization: "Token " + this.props.token,
                };

                axios
                  .get(`https://${this.props.url}/userprofile/`)
                  .then((res1) => {
                    const prof = res1.data[0];
                    const name = prof.user;
                    axios
                      .get(
                        `https://${this.props.url}/userprofileList/?id=${data}`
                      )
                      .then((res2) => {
                        const prod = res2.data[0];
                        const room = prod.profile.teamName;
                        axios
                          .get(
                            `https://${this.props.url}/userprofileList/?id=${user.user}`
                          )
                          .then((res3) => {
                            const message = { userdata: res3.data };
                            socket.emit("acceptUserAgain", {
                              name,
                              room,
                              message,
                            });
                          });
                      });
                  });
                this.handleFull(teamName, invoice_id);
              });
          })
          .catch((err) => console.log(err));
      } else {
        axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
          const teamName = res.data.profile.teamName;
          event.preventDefault();
          let form_data = new FormData();
          form_data.append("teamName", res.data.profile.teamName);
          const url_put = `https://${this.props.url}/addUserListteam/${data}/`;
          axios.defaults.headers = {
            "Content-Type": "application.json",
            Authorization: "Token " + token,
          };
          axios
            .put(url_put, form_data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              var socket = io("https://live-data-manager.herokuapp.com");
              axios.defaults.headers = {
                "Content-Type": "application.json",
                Authorization: "Token " + this.props.token,
              };

              axios
                .get(`https://${this.props.url}/userprofile/`)
                .then((res) => {
                  const prof = res.data[0];
                  socket.emit(
                    "join",
                    { name: prof.user, room: prof.teamName },
                    (error) => {
                      if (error) {
                        alert(error);
                      }
                    }
                  );

                  return () => {
                    if (!prof.user & !prof.teamName) {
                      socket.emit("disconnect");

                      socket.off();
                    }
                  };
                });
              axios.defaults.headers = {
                "Content-Type": "application.json",
                Authorization: "Token " + this.props.token,
              };

              axios
                .get(`https://${this.props.url}/userprofile/`)
                .then((res1) => {
                  axios
                    .get(
                      `https://${this.props.url}/userprofileList/?id=${data}`
                    )
                    .then((res3) => {
                      axios
                        .get(
                          `https://${this.props.url}/userprofileList/?profile__teamName=${teamName1.teamName}`
                        )
                        .then((res4) => {
                          setTimeout(() => {
                            axios.defaults.headers = {
                              "Content-Type": "application.json",
                              Authorization: "Token " + this.props.token,
                            };

                            axios
                              .get(`https://${this.props.url}/userprofile/`)
                              .then((res) => {
                                const prof = res.data[0];
                                this.setState({
                                  name: prof.user,
                                  room: prof.teamName,
                                });
                                socket.emit(
                                  "join",
                                  { name: prof.user, room: prof.teamName },
                                  (error) => {
                                    if (error) {
                                      alert(error);
                                    }
                                  }
                                );

                                return () => {
                                  if (!prof.user & !prof.teamName) {
                                    socket.emit("disconnect");

                                    socket.off();
                                  }
                                };
                              });
                            axios.defaults.headers = {
                              "Content-Type": "application.json",
                              Authorization: "Token " + this.props.token,
                            };

                            axios
                              .get(`https://${this.props.url}/userprofile/`)
                              .then((res1) => {
                                const prof = res1.data[0];
                                const name = prof.user;
                                const room = teamName1.teamName;
                                axios
                                  .get(
                                    `https://${this.props.url}/userprofileList/?id=${data}`
                                  )
                                  .then((res3) => {
                                    const send = res3.data[0];

                                    axios
                                      .get(
                                        `https://${this.props.url}/userprofileList/?profile__teamName=${teamName1.teamName}`
                                      )
                                      .then((res4) => {
                                        socket.emit("acceptUsertoback", {
                                          name,
                                          room,
                                          sendTo: send.username,
                                          message: res4.data,
                                        });
                                      });
                                  });
                              });
                          }, 500);
                        });
                    });
                });
              axios.defaults.headers = {
                "Content-Type": "application.json",
                Authorization: "Token " + this.props.token,
              };
              axios
                .get(
                  `https://${this.props.url}/userprofileList/?profile__teamName=${teamName}`
                )
                .then((res) => {
                  this.props.handleDataChange(res.data);
                  this.setState({
                    loading: false,
                  });
                });
              axios.defaults.headers = {
                "Content-Type": "application.json",
                Authorization: "Token " + this.props.token,
              };
              axios.delete(`https://${this.props.url}/invoice/${invoice_id}/`);
              axios.defaults.headers = {
                "Content-Type": "application.json",
                Authorization: "Token " + this.props.token,
              };
              axios.get(`https://${this.props.url}/invoice/`).then((res) => {
                const currentuserInvoicedata = res.data.filter((data) => {
                  return Number(data.user) === invoice_id;
                });
                this.props.handleCurrentUserInvoice(currentuserInvoicedata);
              });
            });
        });
      }
    });
  };

  render() {
    return (
      <UsersToolbars
        data={this.state.useraddlist}
        team_request_count={this.props.data.currentuserInvoice.length}
        plan={this.state.plan}
        users={this.props.users}
        handleLeave={this.handleLeave}
        handleDelete={this.handleDelete}
        handleSubmit={this.handleSubmit}
        handleCreateData={this.handleCreateData}
        loading={this.state.loading}
        handleDataChange={this.props.handleDataChange}
        Teamaddrequestbutton={this.Teamaddrequestbutton}
        currentuserInvoice={this.props.data.currentuserInvoice}
        requested={this.props.data.invoice}
        teamName={this.props.data.teamName}
        team={this.state.team}
        user_id={this.props.data.user_id}
        handleaddbutton={this.handleaddbutton}
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

export default connect(mapStateToProps)(UsersToolbar);
