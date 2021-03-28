import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TodayIcon from "@material-ui/icons/Today";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Loading from "../../../loading.js";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "tasks", numeric: false, disablePadding: true, label: "Tasks" },
  {
    id: "assigned",
    numeric: true,
    disablePadding: false,
    label: "Assigned To",
  },
  { id: "Status", numeric: true, disablePadding: false, label: "Status" },
  { id: "Due", numeric: true, disablePadding: false, label: "Due Date" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ background: "cadetblue" }}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    background: "cadetblue",
    borderRadius: "20px",
    marginBottom: "21px",
    color: "aliceblue",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTodayFilter = () => {
    handleClose();
    props.handleTodayFilter();
  };

  const handleWeekFilter = () => {
    handleClose();
    props.handleWeekFilter();
  };

  const handleMonthFilter = () => {
    handleClose();
    props.handleMonthFilter();
  };

  const [open4, setOpen4] = React.useState(false);

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange4 = (event) => {
    setSelectedValue(event.target.value);
    props.handleStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    props.handleUpdateStatus();
    setOpen4(false);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Tasks Assigned
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Change Status">
            <IconButton aria-label="Edit" onClick={handleClickOpen4}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={open4}
            onClose={handleClose4}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Update Status</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    value="Success"
                    control={
                      <GreenRadio
                        checked={selectedValue === "Success"}
                        onChange={handleChange4}
                      />
                    }
                    label="Success"
                    labelPlacement="end"
                  ></FormControlLabel>
                  <FormControlLabel
                    value="Pending"
                    control={
                      <GreenRadio
                        checked={selectedValue === "Pending"}
                        onChange={handleChange4}
                      />
                    }
                    label="Pending"
                    labelPlacement="end"
                  ></FormControlLabel>
                  <FormControlLabel
                    value="Hold"
                    control={
                      <GreenRadio
                        checked={selectedValue === "Hold"}
                        onChange={handleChange4}
                      />
                    }
                    label="Hold"
                    labelPlacement="end"
                  ></FormControlLabel>
                  <FormControlLabel
                    value="Error"
                    control={
                      <GreenRadio
                        checked={selectedValue === "Error"}
                        onChange={handleChange4}
                      />
                    }
                    label="Error"
                    labelPlacement="end"
                  ></FormControlLabel>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose4} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdateStatus} color="primary" autoFocus>
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => props.handleDeleteTasks(props)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Refresh">
            <IconButton
              aria-label="Refresh"
              onClick={() => props.handleRefreshTasks()}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
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
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" onClick={handleClick}>
              <FilterListIcon
                style={{ color: "aliceblue" }}
                aria-controls="customized-menu"
                aria-haspopup="true"
              />
            </IconButton>
          </Tooltip>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleTodayFilter}>
              <ListItemIcon>
                <TodayIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Today" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleWeekFilter}>
              <ListItemIcon>
                <ViewWeekIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Last Week" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleMonthFilter}>
              <ListItemIcon>
                <DateRangeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Last Month" />
            </StyledMenuItem>
          </StyledMenu>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function Tasks(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Tasks");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n) => n.tasks);
      props.setSelected(newSelecteds);
      return;
    }
    props.setSelectedNULL();
  };

  const handleClick = (event, tasks, index) => {
    const selectedIndex = props.selected.indexOf(tasks);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, tasks);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selected.slice(0, selectedIndex),
        props.selected.slice(selectedIndex + 1)
      );
    }

    props.setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (tasks, index) => props.selected.indexOf(tasks) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    props.handleAssignElement();
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    props.handleMember(event.target.value);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const handleOpen = () => {
    setOpen1(true);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-03-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.handleDate(date);
  };

  const handleAssignData = (event) => {
    props.handleAssignData(event);
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        {props.loading ? <Loading /> : <></>}
        <div style={{ textAlignLast: "end" }}>
          <FormControlLabel
            style={{ margin: "25px 0" }}
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
          <Button
            style={{
              background: "black",
              marginLeft: "12px",
              color: "aliceblue",
            }}
            onClick={handleClickOpen}
          >
            Assign Task
          </Button>
          <Dialog
            open={open}
            onClose={handleClose1}
            aria-labelledby="form-dialog-title"
          >
            <div
              style={{
                boxShadow:
                  "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
                color: "aliceblue",
                background: "black",
                overflowX: "auto",
              }}
            >
              <DialogTitle id="form-dialog-title">Assign Tasks</DialogTitle>
            </div>
            <DialogContent>
              <TextField
                style={{ marginTop: "10px" }}
                autoFocus
                margin="dense"
                id="name"
                value={props.content}
                onChange={(event) => props.handletaskcontent(event)}
                label="Task"
                type="text"
                autoComplete="off"
                fullWidth
              />
              <div style={{ width: "100%" }}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Member To Assign
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open1}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={props.member}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.project_member
                      ? props.project_member.map((data) => (
                          <MenuItem value={data.member}>{data.member}</MenuItem>
                        ))
                      : null}
                  </Select>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      autoOk
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Due Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose1}
                style={{
                  boxShadow:
                    "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
                  color: "aliceblue",
                  background: "black",
                  overflowX: "auto",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={(event) => handleAssignData(event)}
                style={{
                  boxShadow:
                    "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
                  color: "aliceblue",
                  background: "black",
                  overflowX: "auto",
                }}
              >
                Assign
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Paper
          className={classes.paper}
          style={{ background: "transparent", boxShadow: "unset" }}
        >
          <EnhancedTableToolbar
            numSelected={props.selected.length}
            handleUpdateStatus={props.handleUpdateStatus}
            handleStatus={props.handleStatus}
            handleRefreshTasks={props.handleRefreshTasks}
            search={props.search}
            handleChange={props.handleChange}
            select={props.selected}
            handleWeekFilter={props.handleWeekFilter}
            handleMonthFilter={props.handleMonthFilter}
            handleTodayFilter={props.handleTodayFilter}
            handleEditTasks={props.handleEditTasks}
            handleDeleteTasks={props.handleDeleteTasks}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <>
                <EnhancedTableHead
                  classes={classes}
                  numSelected={props.selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={props.data.length}
                />
                <TableBody>
                  {stableSort(props.data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.tasks, index);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(event, row.tasks, index)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.tasks}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ textTransform: "capitalize" }}
                          >
                            {row.requested_to}
                          </TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <TableCell align="right">
                            {moment(row.due_date).format("DD-MM-YYYY")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}

class TaskOwner extends Component {
  state = {
    selected: [],
    search: "",
    project_member: [],
    status: "",
    content: "",
    member: "",
    date: "",
    loading: false,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.setState({
        loading: true,
      });
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios
        .get(`https://${this.props.url}/create/${this.props.data.id}`)
        .then((res) => {
          this.setState({
            project_member: res.data.promem.filter((re) => {
              return re.member !== this.props.username;
            }),
            loading: false,
          });
        });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.setState({
        loading: true,
      });
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios
        .get(`https://${this.props.url}/create/${this.props.data.id}`)
        .then((res) => {
          this.setState({
            project_member: res.data.promem.filter((re) => {
              return re.member !== this.props.username;
            }),
            loading: false,
          });
        });
    }
  }

  handleDeleteTasks = (props) => {
    this.setState({
      loading: true,
    });
    const { select } = props;
    var data = [];
    select.forEach((res) => {
      data = data.concat(
        this.props.taskFull.filter((filt) => {
          return filt.tasks === res;
        })
      );
    });
    data.forEach((res) => {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios
        .delete(`https://${this.props.url}/project-task-owner/${res.id}`)
        .then((res1) => {
          this.props.handleRefreshTasksOwner(res.id);
        });
    });
    this.setState({
      loading: false,
    });

    this.setSelectedNULL();
  };

  setSelected = (data) => {
    this.setState({
      selected: data,
    });
  };

  setSelectedNULL = () => {
    this.setState({
      selected: [],
    });
  };

  handleEditTasks = () => {
    this.setState({
      loading: true,
    });
    const { selected } = this.state;
    var data = [];
    selected.forEach((res) => {
      data = data.concat(
        this.props.taskFull.filter((filt) => {
          return filt.tasks === res;
        })
      );
    });
    data.forEach((res) => {
      let form_data = new FormData();
      if (res.status === "Pending") {
        form_data.append("status", "Success");
      } else {
        form_data.append("status", "Pending");
      }
      const url_put = `https://${this.props.url}/project-task-owner/${res.id}/`;
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios
        .patch(url_put, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.setState({
            loading: true,
          });
        });
    });
    this.setSelectedNULL();
  };

  handleTodayFilter = () => {
    this.props.handleTodayFilterOwner();
  };

  handleWeekFilter = () => {
    this.props.handleWeekFilterOwner();
  };

  handleMonthFilter = () => {
    this.props.handleMonthFilterOwner();
  };

  handleChange = (event) => {
    const data = event.target.value;
    this.setState({
      search: data,
    });
    this.props.handleSearchOwner(data);
  };

  handleRefreshTasks = () => {
    this.props.handleRefreshTasksFull();
  };

  handleStatus = (data) => {
    this.setState({
      status: data,
    });
  };

  handletaskcontent = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  handleMember = (data) => {
    console.log(data);
    this.setState({
      member: data,
    });
  };

  handleDate = (data) => {
    this.setState({
      date: data,
    });
  };

  handleAssignData = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    let form_data = new FormData();
    form_data.append("tasks", this.state.content);
    form_data.append("status", "Pending");
    form_data.append("requested_by", this.props.username);
    form_data.append("requested_to", this.state.member);
    form_data.append("due_date", moment(this.state.date).format("YYYY-MM-DD"));
    form_data.append("project_id", this.props.data.id);
    const url_post = `https://${this.props.url}/project-task/`;
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
        this.props.handleCreateTasksOwner(res.data);
        this.handleAssignElement();
        this.setState({
          loading: false,
        });
      });
  };

  handleAssignElement = () => {
    this.setState({
      content: "",
      member: "",
      date: "",
    });
  };

  handleUpdateStatus = () => {
    this.setState({
      loading: true,
    });
    var data = [];
    this.state.selected.forEach((res) => {
      data = data.concat(
        this.props.taskFull.filter((filt) => {
          return filt.tasks === res;
        })
      );
    });
    data.forEach((data1) => {
      let form_data = new FormData();
      form_data.append("status", this.state.status);
      const url_post = `https://${this.props.url}/project-task-owner/${data1.id}/`;
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };
      axios
        .patch(url_post, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.props.handleRefreshTasksOwner(res.data.id);
          this.props.handleCreateTasksOwner(res.data);
          this.setSelectedNULL();
          this.setState({
            loading: false,
          });
        });
    });
  };

  render() {
    return (
      <Tasks
        data={this.props.taskFull}
        loading={this.state.loading}
        handleAssignElement={this.handleAssignElement}
        handleAssignData={this.handleAssignData}
        handleUpdateStatus={this.handleUpdateStatus}
        handleDate={this.handleDate}
        handleMember={this.handleMember}
        content={this.state.content}
        handletaskcontent={this.handletaskcontent}
        handleStatus={this.handleStatus}
        project_member={this.state.project_member}
        project={this.props.data}
        handleRefreshTasks={this.handleRefreshTasks}
        selected={this.state.selected}
        search={this.state.search}
        handleChange={this.handleChange}
        handleWeekFilter={this.handleWeekFilter}
        handleMonthFilter={this.handleMonthFilter}
        handleTodayFilter={this.handleTodayFilter}
        handleEditTasks={this.handleEditTasks}
        handleDeleteTasks={this.handleDeleteTasks}
        setSelectedNULL={this.setSelectedNULL}
        setSelected={this.setSelected}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(TaskOwner);
