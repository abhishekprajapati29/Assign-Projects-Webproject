import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import axios from "axios";
import CardHeader from "../../../css/Card/CardHeader";
import { DropzoneDialog } from "material-ui-dropzone";
import Card from "../../../css/Card/Card";
import "../../../chat/Messenger/Messenger.css";
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
import "../Document/file.css";
import moment from "moment";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import Loading from "../../../../loading.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearWithValueLabel from "../../../../progress.js";
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
    color: "rgba(255,255,255,.62)",
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

function FileAdds(props) {
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

  const handledownload = () => {
    axios({
      url: props.datastate.file.file,
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
    axios.get(`https://${props.url}/file/${data}/`).then((res) => {
      const value = res.data.favourite;
      let form_data = new FormData();
      form_data.append("favourite", !value);
      const url_put = `https://${props.url}/file/${data}/`;
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
    axios.get(`https://${props.url}/file/?favourite=true`).then((res) => {
      props.handledata(res.data);
    });
  };

  const handlefavList = (data) => {
    if (data) {
      props.handeLoading();
    }
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + props.datastate.token,
    };
    axios.get(`https://${props.url}/file/?favourite=true`).then((res) => {
      props.handledata(res.data);
    });
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
    axios.get(`https://${props.url}/file/`).then((res) => {
      props.handledata(res.data);
    });
  };

  const actions = [
    {
      icon: (
        <img
          src="https://img.icons8.com/material/24/000000/add-file--v1.png"
          alt="pdf"
        />
      ),
      name: "Add File",
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

  function handleDelete() {
    handleClose3();
    props.handleDelete();
  }

  const [open3, setOpen3] = React.useState(false);

  function handleClickOpen3() {
    setOpen3(true);
    setAnchorEl(null);
  }

  function handleClose3() {
    setOpen3(false);
  }

  const [open4, setOpen4] = React.useState(false);

  const handleClose4 = () => {
    setOpen4(false);
  };

  function handleSave(event) {
    props.handleSave(event);
    setOpen4(true);
  }

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
            <h4 className={classes.cardTitleWhite}>File</h4>
            <p className={classes.cardCategoryWhite}>
              Important File (PDF, EXE, ZIP)
            </p>
          </div>
          <div style={{ float: "right" }}>
            <Toolbar>
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
                  <div key={data.id}>
                    <Card className={classes.card}>
                      <Link href={data.file} target="_blank">
                        <CardActionArea>
                          {data.type === "application/pdf" ? (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/pdf-2--v1.png"
                              title={data.title}
                            />
                          ) : data.type === "application/x-ms-dos-executable" ||
                            data.type === "application/x-msdownload" ? (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/exe.png"
                              title={data.title}
                            />
                          ) : data.type === "application/x-zip-compressed" ? (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/zip.png"
                              title={data.title}
                            />
                          ) : (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/file--v1.png"
                              title={data.title}
                            />
                          )}
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
                                <div onClick={handleClickOpen3}>
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
                    style={{ width: "100%" }}
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
            acceptedFiles={["application/*"]}
            showPreviews={true}
            maxFileSize={50000000}
            filesLimit={1}
            dropzoneText="Drag and drop an Document file here or click"
            onClose={(event) => props.handleClose(event)}
          />
        </CardContent>
      </Card>
      <Tooltip
        title="Add Document"
        style={{ position: "fixed", right: "99px", bottom: "36px", zIndex: 1 }}
      >
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          FabProps={{ color: "inherit" }}
          open={open}
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
      </Tooltip>
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
            Are you sure you want to Delete todo{" "}
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

class FileAdd extends Component {
  state = {
    username: "",
    files: [],
    open: false,
    token: null,
    id: 0,
    favourite: false,
    search: "",
    files_search: [],
    loading: true,
    loadingCreate: false,
    uploadPercentage: 0,
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
      axios.get(`https://${this.props.url}/file/`).then((res) => {
        this.setState({
          files: res.data,
          files_search: res.data,
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
      axios.get(`https://${this.props.url}/file/`).then((res) => {
        this.setState({
          files: res.data,
          files_search: res.data,
          loading: false,
        });
      });
    }
  }

  handlerequestCancel = () => {
    window.location.reload(false);
  };

  handleSubmit = (data) => {
    let form_data = new FormData();
    form_data.append("user", this.state.username);
    form_data.append("title", data.name);
    form_data.append("type", data.type);
    form_data.append("file", data);
    form_data.append("size", data.size);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        this.setState({
          total: total,
        });
        if (percent < 100) {
          this.setState({ uploadPercentage: percent, loaded: loaded });
        }
      },
    };
    const url_post = `https://${this.props.url}/file/`;
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
        this.handledata1(res.data);
        this.setState({ uploadPercentage: 100 }, () => {
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 });
          }, 1000);
        });
      })
      .catch((err) => console.log(err));
  };

  handledata1 = (data) => {
    this.setState((previousState) => ({
      files: [...previousState.files, data],
      files_search: [...previousState.files, data],
      loadingCreate: false,
    }));
  };

  handleId = (data) => {
    this.setState({
      id: data.id,
      file: data,
    });
  };

  handledata = (data) => {
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
      files: this.state.files_search,
    });
  };

  handleTodayData = () => {
    var today = new Date();
    var date = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    this.setState({
      files: this.state.files_search.filter((data11) => {
        return moment(data11.timestamp).format("YYYY-MM-DD") === date;
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
      files: this.state.files_search.filter((data) => {
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
      files: this.state.files_search.filter((data) => {
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
      files: this.state.files_search.filter((res) => {
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
      return file.id !== this.state.file.id;
    });

    axios.delete(`https://${this.props.url}/file/${this.state.file.id}/`);
    this.setState({
      files: removed,
      loading: false,
    });
  };

  render() {
    return (
      <FileAdds
        data={this.state.files}
        loaded={this.state.loaded}
        total={this.state.total}
        handlerequestCancel={this.handlerequestCancel}
        uploadPercentage={this.state.uploadPercentage}
        loadingCreate={this.state.loadingCreate}
        handleDelete={this.handleDelete}
        loading={this.state.loading}
        handleLoading={this.handleLoading}
        url={this.props.url}
        handleAllData={this.handleAllData}
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
        handledata={this.handledata}
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

export default connect(mapStateToProps)(FileAdd);
