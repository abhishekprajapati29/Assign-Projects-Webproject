import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../image.css";
import { DropzoneDialog } from "material-ui-dropzone";
import { Button, Link, Toolbar, Grid } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "../../../components/css/Card/CardHeader";
import Card from "../../../components/css/Card/Card";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import moment from "moment";
import FilterListIcon from "@material-ui/icons/FilterList";
import Loading from "../../../loading.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearWithValueLabel from "../../../progress.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "22px",
    backgroundColor: theme.palette.background.paper,
  },
  root1: {
    flexGrow: 1,
    padding: "60px 20px 0 20px",
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
  gridList: {
    width: "100%",
    minHeight: 710,
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  icon: {
    color: "white",
  },
  fab: {
    margin: theme.spacing(2),
    color: "white",
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(5),
  },
  img: {
    width: "100%",
    height: "100%",
    paddingTop: "46px",
    backgroundColor: "white",
  },
  heart: {
    marginLeft: "4px",
  },
}));

function Images(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  function handleClose() {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose1() {
    setAnchorEl(null);
  }

  function handleToday() {
    handleClose1();
    props.handleTodayData();
  }

  function handleAll() {
    handleClose1();
    props.handleAllData();
  }

  function handleWeek() {
    handleClose1();
    props.handleWeekData();
  }

  function handleMonth() {
    handleClose1();
    props.handleMonthData();
  }

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
    axios.get(`https://${props.url}/images/?favourite=true`).then((res) => {
      props.handledata1(res.data);
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
    axios.get(`https://${props.url}/images/?favourite=true`).then((res) => {
      props.handledata1(res.data);
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
    axios.get(`https://${props.url}/images/`).then((res) => {
      props.handledata1(res.data);
    });
  };

  const handleFav = (data) => {
    axios.get(`https://${props.url}/images/${data}/`).then((res) => {
      const value = res.data.favourite;
      let form_data = new FormData();
      form_data.append("favourite", !value);
      const url_put = `https://${props.url}/images/${data}/`;
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

  const actions = [
    {
      icon: (
        <img
          src="https://img.icons8.com/material/24/000000/albums.png"
          alt="album"
        />
      ),
      name: "Add Album",
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
    handleClose2();
    props.handleDelete();
  }

  const [open2, setOpen2] = React.useState(false);

  function handleClickOpen1(data) {
    props.handleDeleteData(data);
    setOpen2(true);
  }

  function handleClose2() {
    setOpen2(false);
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
    <div className={classes.root1}>
      <Card className={classes.card}>
        <CardHeader
          color="info"
          style={{
            boxShadow:
              "rgb(33, 203, 243) 0px 4px 20px 0px, rgba(244, 67, 54, 0.4) 0px 7px 10px -5px",
          }}
        >
          <div style={{ float: "left" }}>
            <h4 className={classes.cardTitleWhite}>Albums</h4>
            <p className={classes.cardCategoryWhite}>Collections</p>
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
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open1}
                onClose={handleClose1}
              >
                <MenuItem onClick={handleAll}>All</MenuItem>
                <MenuItem onClick={handleToday}>Today</MenuItem>
                <MenuItem onClick={handleWeek}>Week</MenuItem>
                <MenuItem onClick={handleMonth}>Month</MenuItem>
              </Menu>
            </Toolbar>
          </div>
        </CardHeader>
        <div className={classes.root}>
          {props.loadingCreate && (
            <CircularProgress size={48} className={classes.buttonProgress} />
          )}

          {!props.loading ? (
            <Grid
              container
              cellHeight={150}
              cols={2}
              style={{ padding: "10px" }}
              className={classes.gridList}
            >
              {props.data.map((tile) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  key={tile.image}
                  style={{
                    padding: 0,
                    height: "auto",
                    minHeight: "260px",
                    maxHeight: "360px",
                    overflow: "hidden",
                    boxShadow: "none",
                  }}
                >
                  <div
                    className=" show-image"
                    data-text="asdkljfalskjfl"
                    style={{ padding: "10px" }}
                  >
                    <Link href={`/data/images/${tile.id}`}>
                      <img
                        className={classes.img}
                        alt={tile.title}
                        src={tile.image}
                      />
                    </Link>
                    <div className="fav">
                      {tile.favourite === true ? (
                        <Tooltip title="Favourite">
                          <button
                            className={`heart-checkbox ${
                              tile.favourite ? "checked" : ""
                            }`}
                            onClick={(event) => handleFav(tile.id)}
                          ></button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Not Favourite">
                          <button
                            className={`heart-checkbox ${
                              tile.favourite ? "checked" : ""
                            }`}
                            onClick={(event) => handleFav(tile.id)}
                          ></button>
                        </Tooltip>
                      )}
                    </div>
                    <div className="data">{tile.title}</div>
                    <div className="delete">
                      <Tooltip title="Delete">
                        <Button
                          size="medium"
                          aria-label="delete"
                          style={{ color: "black" }}
                          onClick={(event) => handleClickOpen1(tile)}
                        >
                          <div
                            className={clsx(classes.margin, "fa fa-trash")}
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <GridList
              cellHeight={150}
              cols={2}
              style={{ padding: "10px" }}
              className={classes.gridList}
            >
              <Loading />
            </GridList>
          )}
          {props.uploadPercentage !== 0 ? (
            <Dialog
              open={open4}
              aria-labelledby="alert-dialog-title"
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
          <DropzoneDialog
            open={props.datastate.open}
            onSave={(event) => handleSave(event)}
            acceptedFiles={["image/*"]}
            showPreviews={true}
            maxFileSize={5000000}
            filesLimit={1}
            dropzoneText="Drag and drop an Album Image here or click"
            onClose={(event) => props.handleClose(event)}
          />
        </div>
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
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to Delete Album{" "}
            <b style={{ fontSize: "18px" }}>
              {" "}
              {props.edit_data ? <>{props.edit_data.title}</> : null}{" "}
            </b>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Disagree
          </Button>
          <Button onClick={(event) => handleDelete()} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class Image extends Component {
  state = {
    title: "",
    image: null,
    images: [],
    token: null,
    favourite: false,
    search: "",
    albums_search: [],
    loading: true,
    uploadPercentage: 0,
    loadingCreate: false,
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
      axios.get(`https://${this.props.url}/images/`).then((res) => {
        this.setState({
          images: res.data,
          token: token,
          albums_search: res.data,
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
      axios.get(`https://${this.props.url}/images/`).then((res) => {
        this.setState({
          images: res.data,
          token: newProps.token,
          albums_search: res.data,
          loading: false,
        });
      });
    }
  }
  handleSubmit = (file) => {
    let form_data = new FormData();
    form_data.append("title", file.name);
    form_data.append("image", file);

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

    const url_post = `https://${this.props.url}/images/`;

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
      images: [...previousState.images, data],
      loadingCreate: false,
    }));
  };

  handledata1 = (data) => {
    this.setState({
      images: data,
      loading: false,
    });
  };

  handleDelete = (id) => {
    this.setState({
      loadingCreate: true,
    });
    const imageID = this.state.edit_data.id;
    const data = [...this.state.images];
    const removed = data.filter((image) => {
      return image.id !== imageID;
    });
    this.setState({
      images: removed,
    });
    axios.delete(`https://${this.props.url}/images/${imageID}`);
    this.setState({
      loadingCreate: false,
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
      images: this.state.albums_search,
    });
  };

  handleTodayData = () => {
    var today = new Date();
    var date = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    this.setState({
      images: this.state.albums_search.filter((data) => {
        return moment(data.timestamp).format("YYYY-MM-DD") === date;
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
      images: this.state.albums_search.filter((data) => {
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
      images: this.state.albums_search.filter((data) => {
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
      images: this.state.albums_search.filter((res) => {
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

  handleDeleteData = (data) => {
    this.setState({
      edit_data: data,
    });
  };

  render() {
    return (
      <Images
        data={this.state.images}
        loaded={this.state.loaded}
        total={this.state.total}
        handlerequestCancel={this.handlerequestCancel}
        uploadPercentage={this.state.uploadPercentage}
        edit_data={this.state.edit_data}
        handleDeleteData={this.handleDeleteData}
        loadingCreate={this.state.loadingCreate}
        handleLoading={this.handleLoading}
        albums_search={this.albums_search}
        url={this.props.url}
        loading={this.state.loading}
        handleAllData={this.handleAllData}
        search={this.state.search}
        handleChange={this.handleChange}
        handleTodayData={this.handleTodayData}
        handleWeekData={this.handleWeekData}
        handleMonthData={this.handleMonthData}
        handleDeleteButton={this.handleDeleteButton}
        favourite={this.favourite}
        favouriteNot={this.favouriteNot}
        handleSave={this.handleSave}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        handledata1={this.handledata1}
        handleSubmit={this.handleSubmit}
        datastate={this.state}
        handleDelete={this.handleDelete}
        handleCreateData={this.handleCreateData}
        handleImageCreate={this.handleImageCreate}
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

export default connect(mapStateToProps)(Image);
