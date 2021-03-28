import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import axios from "axios";
import CardHeader from "../../css/Card/CardHeader";
import { DropzoneDialog } from "material-ui-dropzone";
import Card from "../../css/Card/Card";
import "../../chat/Messenger/Messenger.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import Loading from "../../../loading.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearWithValueLabel from "../../../progress.js";
import { Toolbar } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    minHeight: 706,
    padding: theme.spacing(2),
    transform: "translateZ(0)",
  },
  titleBar: {
    backgroundColor: "transparent",
  },
  cardCategoryWhite: {
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
  card: {
    width: "120px",
    marginRight: "15px",
  },
  media: {
    height: "120px",
  },
  heart: {
    marginLeft: "4px",
  },
}));

function VideoAdds(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    props.handleId(data);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open2 = Boolean(anchorEl1);
  function handleMenu(event) {
    setAnchorEl1(event.currentTarget);
  }

  function handleClose2() {
    setAnchorEl1(null);
  }

  function handleAll() {
    handleClose2();
    props.handleAllData();
  }

  function handleWeek() {
    handleClose2();
    props.handleWeekData();
  }

  const handleToday = () => {
    handleClose2();
    props.handleTodayData();
  };

  function handleMonth() {
    handleClose2();
    props.handleMonthData();
  }

  function handleDelete() {
    handleClose3();
    props.handleDelete();
  }

  const [open3, setOpen3] = React.useState(false);

  function handleClickOpen3() {
    setAnchorEl(null);
    setOpen3(true);
  }

  function handleClose3() {
    setOpen3(false);
  }

  const handledownload = () => {
    axios({
      url: props.datastate.file.Video,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${props.datastate.file.title}`);
      document.body.appendChild(link);
      link.click();
      setAnchorEl(null);
    });
  };

  const handleFav = (data) => {
    axios.get(`https://${props.url}/video/${data}/`).then((res) => {
      const value = res.data.favourite;
      let form_data = new FormData();
      form_data.append("favourite", !value);
      const url_put = `https://${props.url}/video/${data}/`;
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + props.datastate.token,
      };
      axios
        .patch(url_put, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          props.datastate.favourite === false
            ? handleRecent(false)
            : handlefavList(false);
        })
        .catch((err) => console.log(err));
    });
  };

  const handlefavList = (data) => {
    if (data) {
      props.handleLoading();
    }
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + props.datastate.token,
    };
    axios.get(`https://${props.url}/video/?favourite=true`).then((res) => {
      props.handledataagain(res.data);
    });
    props.favourite();
  };

  const handlefavList1 = (data) => {
    if (data) {
      props.handleLoading();
    }
    if (props.datastate.favourite === false) {
      props.favourite();
    }
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + props.datastate.token,
    };
    axios.get(`https://${props.url}/video/?favourite=true`).then((res) => {
      props.handledataagain(res.data);
    });
    props.favourite();
  };

  const handleRecent = (data) => {
    if (data) {
      props.handleLoading();
    }
    if (props.datastate.favourite === true) {
      props.favouriteNot();
    }
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + props.datastate.token,
    };
    axios.get(`https://${props.url}/video/`).then((res) => {
      props.handledataagain(res.data);
    });
  };

  const [open4, setOpen4] = React.useState(false);

  const handleClose4 = () => {
    setOpen4(false);
  };

  function handleSave(event) {
    props.handleSave(event);
    setOpen4(true);
  }

  //  for chat
  // const actions = [
  //     { icon: <img src="https://img.icons8.com/color/24/000000/pdf.png" />, name: 'Document' },
  //     { icon: <img src="https://img.icons8.com/cute-clipart/24/000000/video-file.png" />, name: 'Video File' },
  //     { icon: <img src="https://img.icons8.com/color/24/000000/mp3.png" />, name: 'Mp3' },
  //     { icon: <img src="https://img.icons8.com/cute-clipart/24/000000/add-file.png"/>, name: 'Others Files' },
  //   ];

  const actions = [
    {
      icon: (
        <img
          src="https://img.icons8.com/color/24/000000/video.png"
          alt="video"
        />
      ),
      name: "Add Video",
      act: (event) => props.handleOpen(event, this),
    },
    {
      icon: (
        <img
          src="https://img.icons8.com/color/24/000000/hearts.png"
          alt="heart"
        />
      ),
      name: "Favourites",
      act: () => handlefavList1(true),
    },
    {
      icon: (
        <img
          src="https://img.icons8.com/material-two-tone/24/000000/time-machine.png"
          alt="recent"
        />
      ),
      name: "Recent",
      act: () => handleRecent(true),
    },
  ];

  return (
    <div>
      <Card>
        <CardHeader
          color="info"
          style={{
            boxShadow:
              "rgb(33, 203, 243) 0px 4px 20px 0px, rgba(244, 67, 54, 0.4) 0px 7px 10px -5px",
          }}
        >
          <div style={{ float: "left" }}>
            <h4 className={classes.cardTitleWhite}>Videos</h4>
            <p className={classes.cardCategoryWhite}>Video List</p>
          </div>
          <div style={{ float: "right" }}>
            <Toolbar style={{ minHeight: 0 }}>
              <Input
                id="standard-adornment-weight"
                value={props.search}
                onChange={props.handleChange}
                endAdornment={<SearchIcon position="end" />}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "search",
                }}
              />
              <Tooltip title="Filter">
                <Button
                  color="primary"
                  aria-label="add"
                  className={classes.ac}
                  style={{ background: "transparent", color: "aliceblue" }}
                  onClick={handleMenu}
                >
                  <FilterListIcon />
                </Button>
              </Tooltip>

              <Menu
                className={classes.icon}
                padding="10px"
                style={{ top: "46px", marginRight: "-5px", left: "-5px" }}
                id="menu-appbar"
                anchorEl={anchorEl1}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open2}
                onClose={handleClose2}
              >
                <MenuItem onClick={handleAll}>All</MenuItem>
                <MenuItem onClick={handleToday}>Today</MenuItem>
                <MenuItem onClick={handleWeek}>Week</MenuItem>
                <MenuItem onClick={handleMonth}>Month</MenuItem>
              </Menu>
            </Toolbar>
          </div>
        </CardHeader>
        <CardContent>
          <div className="scrollable">
            {!props.loading ? (
              <div className={classes.gridList}>
                {props.data.map((data) => (
                  <div>
                    <Card className={classes.card}>
                      <Link href={data.Video} target="_blank">
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image="https://img.icons8.com/material/100/000000/vlc.png"
                            title={data.title}
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.title.slice(0, 30)}...
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                      <GridListTileBar
                        titlePosition="top"
                        title={
                          <div className={classes.heart}>
                            {data.favourite === true ? (
                              <Tooltip title="Favourite">
                                <button
                                  className={`heart-checkbox ${
                                    data.favourite ? "checked" : ""
                                  }`}
                                  onClick={(event) => handleFav(data.id)}
                                ></button>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Not Favourite">
                                <button
                                  className={`heart-checkbox ${
                                    data.favourite ? "checked" : ""
                                  }`}
                                  onClick={(event) => handleFav(data.id)}
                                ></button>
                              </Tooltip>
                            )}
                          </div>
                        }
                        actionIcon={
                          <>
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(event) => handleClick(event, data)}
                            >
                              <img
                                src="https://img.icons8.com/material/15/000000/menu-2--v1.png"
                                alt="menu"
                              />
                            </IconButton>
                            <Menu
                              id="menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={open1}
                              onClose={handleClose1}
                            >
                              <MenuItem onClick={handledownload}>
                                <img
                                  src="https://img.icons8.com/material/24/000000/download--v1.png"
                                  alt="download"
                                />{" "}
                                Download
                              </MenuItem>
                              <MenuItem>
                                <div onClick={() => handleClickOpen3()}>
                                  <img
                                    src="https://img.icons8.com/material/24/000000/delete-file.png"
                                    alt="delete-file"
                                  />
                                  Delete
                                </div>
                              </MenuItem>
                            </Menu>
                          </>
                        }
                        actionPosition="right"
                        className={classes.titleBar}
                      />
                    </Card>
                  </div>
                ))}
                {props.uploadPercentage !== 0 ? (
                  <Dialog
                    open={open4}
                    aria-labelledby="alert-dialog-title"
                    style={{ Width: "100%" }}
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      style={{ minWidth: "600px" }}
                    >
                      {"UPLOADING"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <LinearWithValueLabel
                          loaded={props.loaded}
                          total={props.total}
                          progress={props.uploadPercentage}
                        />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => props.handlerequestCancel()}
                        color="primary"
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                ) : (
                  () => handleClose4()
                )}
              </div>
            ) : (
              <div className={classes.gridList}>
                <Loading />
              </div>
            )}
          </div>
          <DropzoneDialog
            open={props.datastate.open}
            onSave={(event) => handleSave(event)}
            acceptedFiles={["video/*"]}
            showPreviews={true}
            maxFileSize={50000000}
            filesLimit={1}
            dropzoneText="Drag and drop an Video here or click"
            onClose={(event) => props.handleClose(event)}
          />
        </CardContent>
      </Card>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        FabProps={{ color: "default" }}
        open={open}
        style={{ position: "fixed", right: "99px", bottom: "36px", zIndex: 1 }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.act}
          />
        ))}
      </SpeedDial>
      <Dialog
        open={open3}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose3}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to Delete Video{" "}
            <b style={{ fontSize: "18px" }}>
              {" "}
              {props.datastate.file ? (
                <>{props.datastate.file.title}</>
              ) : null}{" "}
            </b>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleDelete()} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class VideoAdd extends Component {
  state = {
    username: "",
    files: [],
    open: false,
    token: null,
    id: 0,
    file: null,
    checked: false,
    favourite: false,
    search: "",
    videos_search: [],
    uploadPercentage: 0,
    loading: true,
    loaded: 0,
    total: 0,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSave = (event) => {
    this.setState({
      open: false,
    });
    const file = event[0];
    this.handleSubmit(file);
  };

  handlerequestCancel = () => {
    window.location.reload(false);
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          username: res.data.username,
          token: token,
        });
      });
      axios.get(`https://${this.props.url}/video/`).then((res) => {
        this.setState({
          files: res.data,
          videos_search: res.data,
          loading: false,
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
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          username: res.data.username,
          token: newProps.token,
        });
      });
      axios.get(`https://${this.props.url}/video/`).then((res) => {
        this.setState({
          files: res.data,
          videos_search: res.data,
          loading: false,
        });
      });
    }
  }
  handleSubmit = (data) => {
    let form_data = new FormData();
    form_data.append("user", this.state.username);
    form_data.append("title", data.name);
    form_data.append("type", data.type);
    form_data.append("Video", data);
    form_data.append("size", data.size);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        this.setState({
          total: total,
        });
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          this.setState({
            uploadPercentage: percent,
            loaded: loaded,
          });
        }
      },
    };
    const url_post = `https://${this.props.url}/video/`;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .post(url_post, form_data, options, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.handledata(res.data);
        this.setState({ uploadPercentage: 100 }, () => {
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 });
          }, 1000);
        });
      })
      .catch((err) => console.log(err));
  };

  handledata = (data) => {
    this.setState((previousState) => ({
      files: [...previousState.files, data],
      videos_search: [...previousState.files, data],
      loading: false,
    }));
  };

  handledata1 = (data) => {
    this.setState({
      files: data,
      loading: false,
    });
  };

  handleId = (data) => {
    this.setState({
      id: data.id,
      file: data,
    });
  };

  handledataagain = (data) => {
    this.setState({
      files: data,
      loading: false,
    });
  };

  favourite = () => {
    this.setState({
      favourite: true,
    });
  };

  favouriteNot = () => {
    this.setState({
      favourite: false,
    });
  };

  handleAllData = () => {
    this.setState({
      files: this.state.videos_search,
    });
  };

  handleTodayData = () => {
    var today = new Date();
    var date = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");

    this.setState({
      files: this.state.videos_search.filter((data11) => {
        return moment(data11.timestamp).format("YYYY-MM-DD") >= date;
      }),
    });
  };

  handleMonthData = () => {
    var today = new Date();
    var dateTo = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    var dateFrom = moment(dateTo).subtract(1, "months").format("YYYY-MM-DD");
    this.setState({
      files: this.state.videos_search.filter((data) => {
        return (
          dateTo >= moment(data.timestamp).format("YYYY-MM-DD") &&
          moment(data.timestamp).format("YYYY-MM-DD") >= dateFrom
        );
      }),
    });
  };

  handleWeekData = () => {
    var today = new Date();
    var dateTo = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    var dateFrom = moment(dateTo).subtract(7, "days").format("YYYY-MM-DD");
    this.setState({
      files: this.state.videos_search.filter((data) => {
        return (
          dateTo >= moment(data.timestamp).format("YYYY-MM-DD") &&
          moment(data.timestamp).format("YYYY-MM-DD") >= dateFrom
        );
      }),
    });
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
      files: this.state.videos_search.filter((res) => {
        return (
          res.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
          -1
        );
      }),
    });
  };

  handleLoading = () => {
    this.setState({
      loading: true,
    });
  };

  handleDelete = () => {
    this.setState({
      loading: true,
    });
    const data = [...this.state.files];
    const removed = data.filter((file) => {
      return file.id !== this.state.id;
    });

    axios.delete(`https://${this.props.url}/video/${this.state.id}/`);
    this.handledata1(removed);
  };

  render() {
    return (
      <VideoAdds
        data={this.state.files}
        loaded={this.state.loaded}
        total={this.state.total}
        handlerequestCancel={this.handlerequestCancel}
        uploadPercentage={this.state.uploadPercentage}
        handleDelete={this.handleDelete}
        handledata={this.handledata}
        handleLoading={this.handleLoading}
        loading={this.state.loading}
        handleAllData={this.handleAllData}
        url={this.props.url}
        search={this.state.search}
        handleChange={this.handleChange}
        handleTodayData={this.handleTodayData}
        handleWeekData={this.handleWeekData}
        handleMonthData={this.handleMonthData}
        handleId={this.handleId}
        favourite={this.favourite}
        favouriteNot={this.favouriteNot}
        handleSave={this.handleSave}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        file={this.state.files}
        handledataagain={this.handledataagain}
        handleSubmit={this.handleSubmit}
        datastate={this.state}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(VideoAdd);
