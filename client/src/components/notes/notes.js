import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NoteChips from "./components/chips";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import "./components/note.css";
import Loading from "../../loading.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root1: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "5px",
  },
  chip: {
    margin: "5px",
    background: "lightskyblue",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none",
    marginBottom: "10px",
  },
  resize: {
    fontSize: 30,
  },
  resize1: {
    fontSize: 20,
  },
  buttonProgress: {
    color: blue,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Notes = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    props.handleEditNULL();
    props.handle_chips_edit_data();
    props.handle_array_data();
    setOpen3(false);
  };

  const handleClose3a = () => {
    props.handleEditNULL();
    props.handle_chips_edit_data();
    setOpen3(false);
  };

  const handleNotes = (data) => {
    props.handleChipsEditData(data);
    props.handleEditNote(data);
    handleClickOpen3();
  };

  const handleEditSave = (event) => {
    props.handleEditSave(event);
    handleClose3a();
  };
  const handleEditCancel = (event) => {
    props.handleEditCancel(event);
    handleClose3();
  };

  function handleBack(event) {
    setOpen(false);
    props.handleSubmit(event);
  }

  function handleCancelChip() {
    setOpen(false);
    props.handleCancel();
  }

  function handleClose() {
    props.handle_array_data();
    setOpen(false);
  }

  function handleClose1() {
    setAnchorEl(null);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleToday() {
    handleClose1();
    props.handleTodayData();
  }

  function handleAll() {
    handleClose1();
    props.handleAll();
  }

  function handleWeek() {
    handleClose1();
    props.handleWeekData();
  }

  function handleMonth() {
    handleClose1();
    props.handleMonthData();
  }

  const handleDelete = (data) => {
    props.handleDeleteChips(data);
  };

  function handleDelete4(data) {
    handleClose4();
    props.handleEditDelete();
  }

  const [open4, setOpen4] = React.useState(false);

  function handleClickOpen4() {
    setOpen3(false);
    setOpen4(true);
  }

  function handleClose4() {
    setOpen4(false);
  }

  function handleDisagree() {
    setOpen3(true);
    setOpen4(false);
  }

  return !props.loading ? (
    <div style={{ padding: "40px 20px 0 20px" }}>
      <div style={{ textAlign: "end", marginBottom: "20px" }}>
        <div>
          <Input
            id="standard-adornment-weight"
            value={props.search}
            style={{ margin: "12px" }}
            onChange={props.handleChange}
            endAdornment={<SearchIcon position="end" />}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "search",
            }}
          />
          <Button
            color="primary"
            aria-label="add"
            style={{
              margin: "12px",
              background: "black",
              color: "aliceblue",
              boxShadow:
                "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
            }}
            onClick={handleClickOpen}
          >
            ADD NOTE
            <AddIcon />
          </Button>
          <Button
            color="primary"
            aria-label="add"
            className={classes.ac}
            style={{
              background: "black",
              color: "aliceblue",
              boxShadow:
                "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
            }}
            onClick={handleMenu}
          >
            Filter
            <FilterListIcon />
          </Button>
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
        </div>
      </div>
      <Card
        className="note1"
        style={{
          display: "flex",
          padding: "2px",
          flexFlow: "wrap",
          flexDirection: "row",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={2}>
          {props.notes
            ? props.notes.map((res) => (
                <>
                  <Grid item xs={12} sm={3}>
                    <Card
                      style={{
                        textTransform: "none",
                        width: "100%",
                        padding: "4px",
                        margin: "5px",
                        borderRadius: "11px",
                        alignSelf: "baseline",
                      }}
                    >
                      <Button
                        onClick={() => handleNotes(res)}
                        style={{
                          width: "99%",
                          height: "30%",
                          borderRadius: "11px",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              style={{
                                fontWeight: "700",
                                textTransform: "capitalize",
                              }}
                            >
                              {res.note_title}
                            </Typography>
                            {res.note_content.length <= 20 ? (
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h1"
                                style={{ fontSize: "50px", fontFamily: "none" }}
                              >
                                {res.note_content}
                              </Typography>
                            ) : res.note_content.length >= 20 &&
                              res.note_content.length <= 60 ? (
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h1"
                                style={{ fontSize: "35px", fontFamily: "none" }}
                              >
                                {res.note_content}
                              </Typography>
                            ) : res.note_content.length >= 60 &&
                              res.note_content.length <= 140 ? (
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h1"
                                style={{ fontSize: "20px", fontFamily: "none" }}
                              >
                                {res.note_content}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h1"
                                style={{ fontSize: "20px", fontFamily: "none" }}
                              >
                                {res.note_content.slice(0, 140)} ...
                              </Typography>
                            )}
                          </CardContent>
                        </CardActionArea>
                      </Button>
                      <CardActions>
                        <div>
                          {res.notechip.map((data1) => (
                            <>
                              <Chip
                                onClick={() =>
                                  props.handleChipSearch(data1.note_chips)
                                }
                                key={data1.id}
                                label={data1.note_chips}
                                style={{ background: "lightskyblue" }}
                              />
                            </>
                          ))}
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              ))
            : null}
        </Grid>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div
          color="primary"
          style={{
            boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
            background: "black",
            overflowX: "auto",
          }}
        >
          <DialogTitle
            id="form-dialog-title"
            className={classes.cardTitleWhite}
          >
            Create Notes
          </DialogTitle>
        </div>

        <DialogContent>
          <NoteChips handleChips={props.handleChips} />
          <Paper
            className={classes.root1}
            style={{ boxShadow: "none", background: "transparent" }}
          >
            {props.chips.map((data) => (
              <div>
                <Chip
                  key={data}
                  label={data}
                  onDelete={() => props.handlechipsDelete(data)}
                  className={classes.chip}
                />
              </div>
            ))}
          </Paper>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="title"
            label="Title"
            name="title"
            type="text"
            value={props.data.title}
            onChange={props.handleCreateData}
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="content"
            label="Content"
            name="content"
            type="text"
            multiline
            rows="6"
            value={props.data.content}
            fullWidth
            onChange={props.handleCreateData}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleBack}
            color="primary"
            style={{
              boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
              background: "black",
              color: "aliceblue",
              overflowX: "auto",
            }}
          >
            Create
          </Button>
          <Button
            onClick={handleCancelChip}
            color="primary"
            style={{
              boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
              background: "black",
              color: "aliceblue",
              overflowX: "auto",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open4}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose4}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to Delete Note{" "}
            <b style={{ fontSize: "18px" }}> {props.data.edit_title} </b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleDelete4()} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open3}
        key={props.data.edit_id}
        keepMounted
        onClose={handleClose3}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          color="primary"
          style={{
            boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
            background: "black",
            overflowX: "auto",
          }}
        >
          <DialogTitle
            id="form-dialog-title"
            className={classes.cardTitleWhite}
          >
            Note
          </DialogTitle>
        </div>
        <DialogContent style={{ marginTop: "29px" }}>
          <TextField
            variant="outlined"
            margin="dense"
            id="edit_title"
            label="Title"
            name="edit_title"
            type="text"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            value={props.data.edit_title}
            onChange={props.handleCreateData}
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="edit_content"
            label="Content"
            name="edit_content"
            type="text"
            multiline
            InputProps={{
              classes: {
                input: classes.resize1,
              },
            }}
            rows="6"
            value={props.data.edit_content}
            fullWidth
            onChange={props.handleCreateData}
          />
          <NoteChips handleChips={props.handleChips} />
          <Paper
            className={classes.root1}
            style={{ boxShadow: "none", background: "transparent" }}
          >
            {props.chips.map((data) => (
              <div>
                <Chip
                  key={data}
                  label={data}
                  onDelete={() => props.handlechipsDelete(data)}
                  className={classes.chip}
                />
              </div>
            ))}
            <div>
              {props.data.edit_notechip
                ? props.data.edit_notechip.map((data) => (
                    <>
                      <Chip
                        key={data.id}
                        label={data.note_chips}
                        onDelete={() => handleDelete(data.id)}
                        style={{ background: "lightskyblue" }}
                      />
                    </>
                  ))
                : null}
            </div>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => handleClickOpen4()}
            style={{
              boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
              background: "black",
              color: "aliceblue",
              overflowX: "auto",
              marginInlineEnd: "auto",
            }}
            color="primary"
          >
            Delete
          </Button>

          <Button
            onClick={(event) => handleEditSave(event)}
            disabled={props.loadingCreate}
            style={{
              boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
              background: "black",
              color: "aliceblue",
              overflowX: "auto",
            }}
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={(event) => handleEditCancel(event)}
            style={{
              boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
              background: "black",
              color: "aliceblue",
              overflowX: "auto",
            }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {props.loadingCreate && (
        <CircularProgress size={48} className={classes.buttonProgress} />
      )}
    </div>
  ) : (
    <Loading />
  );
};

class Note extends Component {
  state = {
    notes: [],
    chips: [],
    title: "",
    content: "",
    array: [],
    edit_id: 0,
    edit_title: "",
    edit_content: "",
    edit_notechip: [],
    notes_search: [],
    chips_edit_data: [],
    loading: true,
    loadingCreate: false,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/note/`).then((res) => {
        this.setState({
          notes: res.data,
          notes_search: res.data,
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
      axios.get(`https://${this.props.url}/note/`).then((res) => {
        this.setState({
          notes: res.data,
          notes_search: res.data,
          loading: false,
        });
      });
    }
  }

  handleChange = (event) => {
    const data = event.target.value;
    axios.get(`https://${this.props.url}/note/?search=${data}`).then((res) => {
      this.setState({
        notes: res.data,
        search: data,
      });
    });
  };

  handledata = () => {
    axios.get(`https://${this.props.url}/note/`).then((res) => {
      this.setState({
        notes: res.data,
        notes_search: res.data,
        loadingCreate: false,
        title: "",
        content: "",
      });
    });
  };
  handleCancel = () => {
    this.setState({
      title: "",
      content: "",
      array: [],
      chips: [],
    });
  };
  handleState = (data) => {
    const { notes } = this.state;
    const remove = notes.filter((note) => {
      return note.id !== data.id;
    });
    this.setState({
      notes: remove,
    });
    this.setState((previousState) => ({
      notes: [data, ...previousState.notes],
    }));
  };

  handleSubmit = (event) => {
    this.setState({
      loadingCreate: true,
    });
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("note_title", this.state.title);
    form_data.append("note_content", this.state.content);
    const url_post = `https://${this.props.url}/note/`;
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
      .then((res) => {
        this.handlechipsdata(res.data.id);
      })
      .catch((err) => console.log(err));
  };

  handlechipsdata = (data) => {
    this.state.chips.forEach((res) => {
      let form_data = {};
      form_data["notechip"] = data;
      form_data["note_chips"] = res;
      this.setState({
        array: this.state.array.concat(form_data),
      });
    });
    const url_post = `https://${this.props.url}/notechip/`;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .post(url_post, this.state.array)
      .then((res) => {
        this.setState({
          array: [],
          chips: [],
        });
        this.handledata();
      })
      .catch((err) => console.log(err));
  };

  handleCreateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleTodayData = () => {
    var today = new Date();
    var dateTo = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    var dateFrom = moment(dateTo).subtract(0, "days").format("YYYY-MM-DD");
    this.setState({
      notes: this.state.notes_search.filter((tod) => {
        return (
          dateTo >= moment(tod.timestamp).format("YYYY-MM-DD") &&
          moment(tod.timestamp).format("YYYY-MM-DD") >= dateFrom
        );
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
      notes: this.state.notes_search.filter((data) => {
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
      notes: this.state.notes_search.filter((data) => {
        return (
          dateTo >= moment(data.timestamp).format("YYYY-MM-DD") &&
          moment(data.timestamp).format("YYYY-MM-DD") >= dateFrom
        );
      }),
    });
  };

  handlechipsDelete = (chipToDelete) => {
    this.setState({
      chips: this.state.chips.filter((data) => {
        return data !== chipToDelete;
      }),
    });
  };

  handleEditNote = (data) => {
    this.setState({
      edit_id: data.id,
      edit_title: data.note_title,
      edit_content: data.note_content,
      edit_notechip: data.notechip,
    });
  };

  handleEditNULL = () => {
    this.setState((previousState) => ({
      edit_id: 0,
      edit_title: "",
      edit_content: "",
      edit_notechip: [],
    }));
  };

  handleEditSave = (event) => {
    this.setState({
      loadingCreate: true,
    });
    event.preventDefault();
    const edit_id = this.state.edit_id;
    let form_data = new FormData();
    form_data.append("note_title", this.state.edit_title);
    form_data.append("note_content", this.state.edit_content);
    const url_put = `https://${this.props.url}/note/${this.state.edit_id}/`;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .put(url_put, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.handlechipsdata(edit_id);
        this.handle_chips_edit_data();
      })
      .catch((err) => console.log(err));
  };

  handleDeleteChips = (id) => {
    const notechipID = id;
    const data = [...this.state.edit_notechip];
    const removed = data.filter((note) => {
      return note.id !== notechipID;
    });
    axios.delete(`https://${this.props.url}/notechip/${notechipID}`);
    this.setState({
      edit_notechip: removed,
    });
  };

  handleEditCancel = () => {
    this.handleEditNULL();
    this.handledata();
    this.handle_chips_edit_data();
    this.setState({
      array: [],
      chips: [],
    });
  };

  handleEditDelete = () => {
    this.setState({
      loadingCreate: true,
    });
    const noteID = this.state.edit_id;
    const data = [...this.state.notes];
    const removed = data.filter((note) => {
      return note.id !== noteID;
    });
    axios.delete(`https://${this.props.url}/note/${noteID}`);
    this.setState({
      notes: removed,
      array: [],
      chips: [],
      edit_id: 0,
      edit_title: "",
      edit_content: "",
      edit_notechip: [],
      chips_edit_data: [],
      loadingCreate: false,
    });
  };

  handleAll = () => {
    this.setState({
      notes: this.state.notes_search,
    });
  };

  handleChips = (data) => {
    (this.state.chips.indexOf(data) > -1) === false &&
    (this.state.chips_edit_data.indexOf(data) > -1) === false
      ? this.setState({
          chips: this.state.chips.concat(data),
        })
      : console.log("exists");
  };

  handleChipsEditData = (data) => {
    let a = [];
    data.notechip.forEach((d1) => {
      a = a.concat(d1.note_chips);
    });
    this.setState({
      chips_edit_data: a,
    });
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
      notes: this.state.notes_search.filter((res) => {
        return (
          res.note_content
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1 ||
          res.note_title
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
        );
      }),
    });
  };

  handleChipSearch = (data) => {
    this.setState({
      loadingCreate: true,
    });
    axios.get(`https://${this.props.url}/note/`).then((r) => {
      let notes_chip_search = r.data;
      axios.get(`https://${this.props.url}/notechip/`).then((res) => {
        let notechips_data = res.data.filter((d) => {
          return d.note_chips === data;
        });
        let final_data = notechips_data.map((chip) => {
          return notes_chip_search.filter((ch) => {
            return ch.id === chip.notechip;
          });
        });
        let final_data1 = final_data.filter((res) => {
          return res.length >= 1;
        });
        let f_data = [];
        final_data1.forEach((dd) => {
          f_data = f_data.concat(dd[0]);
        });
        this.setState({
          notes: f_data,
          loadingCreate: false,
        });
      });
    });
  };

  handle_chips_edit_data = () => {
    this.setState({
      chips_edit_data: [],
    });
    this.handledata();
  };

  handle_array_data = () => {
    this.setState({
      array: [],
      chips: [],
    });
  };

  render() {
    return (
      <Notes
        notes={this.state.notes}
        data={this.state}
        handleChipSearch={this.handleChipSearch}
        loadingCreate={this.state.loadingCreate}
        loading={this.state.loading}
        handle_array_data={this.handle_array_data}
        handle_chips_edit_data={this.handle_chips_edit_data}
        handleChipsEditData={this.handleChipsEditData}
        handleAll={this.handleAll}
        handleDeleteChips={this.handleDeleteChips}
        handleEditNote={this.handleEditNote}
        handleEditCancel={this.handleEditCancel}
        handleEditDelete={this.handleEditDelete}
        handleEditSave={this.handleEditSave}
        handleEditNULL={this.handleEditNULL}
        chips={this.state.chips}
        handleChips={this.handleChips}
        handleCancel={this.handleCancel}
        handlechipsDelete={this.handlechipsDelete}
        handleSubmitSearch={this.handleSubmitSearch}
        search={this.state.search}
        handleBack={this.handleBack}
        title={this.state.title}
        description={this.state.description}
        handleSubmit={this.handleSubmit}
        handleCreateData={this.handleCreateData}
        handleChange={this.handleChange}
        handletoggle={this.handletoggle}
        handleExit={this.handleExit}
        handledata={this.handledata}
        handleComplete={this.handleComplete}
        handleTodayData={this.handleTodayData}
        handleMonthData={this.handleMonthData}
        handleWeekData={this.handleWeekData}
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

export default connect(mapStateToProps)(Note);
