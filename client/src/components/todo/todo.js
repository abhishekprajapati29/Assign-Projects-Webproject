import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Pending from "./component/pending.js";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import Completed from "./component/completed.js";
import moment from "moment";
import FilterListIcon from "@material-ui/icons/FilterList";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import Chip from "@material-ui/core/Chip";
import Chips from "./component/chips.js";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 20px 0 20px",
  },
  root1: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
    background: "lightskyblue",
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
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: blue,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Todos = (props) => {
  const classes = useStyles();
  const { data } = props;
  const todoslistFalse = data.filter((todo) => {
    return todo.completed !== true;
  });
  const todoslistTrue = data.filter((todo) => {
    return todo.completed === true;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  const [open, setOpen] = React.useState(false);

  function handleBack(event) {
    props.handleSubmit(event);
    setOpen(false);
  }

  function handleCancelChip() {
    setOpen(false);
    props.handleCancel();
  }

  function handleClose() {
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

  return (
    <div className={classes.root}>
      <div style={{ textAlign: "end", marginBottom: "20px" }}>
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
          ADD TODO
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
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          <Pending
            loading={props.loading}
            data={todoslistFalse}
            chips={props.chips}
            handleChipSearch={props.handleChipSearch}
            handleSubmitSearch={props.handleSubmitSearch}
            search={props.search}
            handleTodayData={props.handleTodayData}
            handleWeekData={props.handleWeekData}
            handleMonthData={props.handleMonthData}
            handleBack={props.handleBack}
            handleSubmit={props.handleSubmit}
            handletoggle={props.handletoggle}
            handleChange={props.handleChange}
            handleCreateData={props.handleCreateData}
            handledata={props.handledata}
            handleExit={props.handleExit}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <Completed
            loading={props.loading}
            handleID={props.handleID}
            id={props.id}
            data={todoslistTrue}
            chips={props.chips}
            handleChipSearch={props.handleChipSearch}
            handletoggle={props.handletoggle}
            handleComplete={props.handleComplete}
            handledata={props.handledata}
          />
        </Grid>
      </Grid>

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
            Create To Do
          </DialogTitle>
        </div>

        <DialogContent>
          <Chips handleChips={props.handleChips} />
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
            value={props.title}
            onChange={props.handleCreateData}
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="description"
            label="Description"
            name="description"
            type="text"
            multiline
            rows="4"
            value={props.description}
            fullWidth
            onChange={props.handleCreateData}
          />
        </DialogContent>

        <DialogActions>
          <div className={classes.wrapper}>
            <Button
              onClick={handleBack}
              disabled={props.loadingCreate}
              color="primary"
              style={{
                boxShadow:
                  "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
                background: "black",
                color: "aliceblue",
                overflowX: "auto",
              }}
            >
              Create
            </Button>
          </div>
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
      {props.loadingCreate && (
        <CircularProgress size={48} className={classes.buttonProgress} />
      )}
    </div>
  );
};

class Todo extends Component {
  state = {
    todos: [],
    title: "",
    description: "",
    search: "",
    chips: [],
    array: [],
    todos_search: [],
    loading: true,
    loadingCreate: false,
    id: {},
  };

  handleID = (id) => {
    this.setState({
      id: id,
    });
  };

  handletoggle = (event, id, title, description, completed) => {
    let form_data = new FormData();
    form_data.append("title", title);
    form_data.append("description", description);
    if (completed === false) {
      form_data.append("completed", true);
    }
    if (completed === true) {
      form_data.append("completed", false);
    }
    const url_put = `https://${this.props.url}/todo/${id}/`;
    axios
      .put(url_put, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.handleState(res.data);
      })
      .catch((err) => console.log(err));
  };

  handleComplete = (id) => {
    this.setState({
      loadingCreate: true,
    });
    const todoID = id;
    const data = [...this.state.todos];
    const removed = data.filter((todo) => {
      return todo.id !== id;
    });
    axios.delete(`https://${this.props.url}/todo/${todoID}`);
    this.setState({
      todos: removed,
      loadingCreate: false,
    });
  };

  handledata = () => {
    axios.get(`https://${this.props.url}/todo/`).then((res) => {
      this.setState({
        todos: res.data,
        todos_search: res.data,
        loadingCreate: false,
        title: "",
        description: "",
      });
    });
  };
  handleCancel = () => {
    this.setState({
      title: "",
      loadingCreate: false,
      description: "",
      array: [],
      chips: [],
    });
  };
  handleState = (data) => {
    const { todos } = this.state;
    const remove = todos.filter((todo) => {
      return todo.id !== data.id;
    });
    this.setState({
      todos: remove,
    });
    this.setState((previousState) => ({
      todos: [data, ...previousState.todos],
    }));
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/todo/`).then((res) => {
        this.setState({
          todos: res.data,
          todos_search: res.data,
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
      axios.get(`https://${this.props.url}/todo/`).then((res) => {
        this.setState({
          todos: res.data,
          todos_search: res.data,
          loading: false,
        });
      });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loadingCreate: true,
    });
    let form_data = new FormData();
    form_data.append("title", this.state.title);
    form_data.append("description", this.state.description);
    form_data.append("completed", false);
    const url_post = `https://${this.props.url}/todo/`;
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
      form_data["todochip"] = data;
      form_data["chips"] = res;
      this.setState({
        array: this.state.array.concat(form_data),
      });
    });
    const url_post = `https://${this.props.url}/todochip/`;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .post(url_post, this.state.array)
      .then((res) => {
        this.handledata(res.data);
        this.setState({
          array: [],
          chips: [],
        });
      })
      .catch((err) => console.log(err));
  };

  handleCreateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAll = () => {
    this.setState({
      todos: this.state.todos_search,
    });
  };

  handleTodayData = () => {
    var today = new Date();
    var date = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");

    this.setState({
      todos: this.state.todos_search.filter((data) => {
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
      todos: this.state.todos_search.filter((data) => {
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
      todos: this.state.todos_search.filter((data) => {
        return (
          dateTo >= moment(data.timestamp).format("YYYY-MM-DD") &&
          moment(data.timestamp).format("YYYY-MM-DD") >= dateFrom
        );
      }),
    });
  };

  handleChips = (data) => {
    (this.state.chips.indexOf(data) > -1) === false
      ? this.setState({
          chips: this.state.chips.concat(data),
        })
      : console.log("exists");
  };

  handlechipsDelete = (chipToDelete) => {
    this.setState({
      chips: this.state.chips.filter((data) => {
        return data !== chipToDelete;
      }),
    });
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
      todos: this.state.todos_search.filter((res) => {
        return (
          res.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
            -1 ||
          res.description
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
    axios.get(`https://${this.props.url}/todo/`).then((r) => {
      let todos_chip_search = r.data;
      axios.get(`https://${this.props.url}/todochip/`).then((res) => {
        let todochips_data = res.data.filter((d) => {
          return d.chips === data;
        });
        let final_data = todochips_data.map((chip) => {
          return todos_chip_search.filter((ch) => {
            return ch.id === chip.todochip;
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
          todos: f_data,
          loadingCreate: false,
        });
      });
    });
  };

  render() {
    return (
      <Todos
        data={this.state.todos}
        id={this.state.id}
        handleID={this.handleID}
        loadingCreate={this.state.loadingCreate}
        loading={this.state.loading}
        handleChipSearch={this.handleChipSearch}
        handleAll={this.handleAll}
        chips={this.state.chips}
        handleCancel={this.handleCancel}
        handlechipsDelete={this.handlechipsDelete}
        handleChips={this.handleChips}
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

export default connect(mapStateToProps)(Todo);
