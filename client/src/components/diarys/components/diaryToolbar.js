import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    flexGrow: 1,
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
    flexGrow: 1,
  },
}));

const DiarysToolbar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose1() {
    setAnchorEl(null);
  }

  function handleAllData() {
    handleClose1();
    props.handleAllData();
  }

  function handleToday() {
    handleClose1();
    props.handleTodayData();
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
    <div style={{ padding: "40px 20px 0 20px" }}>
      <div style={{ textAlign: "end", marginBottom: "20px" }}>
        <Input
          id="standard-adornment-weight"
          value={props.search}
          style={{ margin: "10px" }}
          onChange={props.handleChange}
          endAdornment={<SearchIcon position="end" />}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "search",
          }}
        />
        <Button
          href="/create_diarys"
          color="primary"
          variant="contained"
          style={{
            margin: "0 15px 0 20px",
            background: "black",
            color: "aliceblue",
            boxShadow:
              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
          }}
        >
          Create Diary
          <AddIcon />
        </Button>
        <Button
          color="primary"
          aria-label="add"
          className={classes.ac}
          style={{
            padding: "10px",
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
          <MenuItem onClick={handleAllData}>All</MenuItem>
          <MenuItem onClick={handleToday}>Today</MenuItem>
          <MenuItem onClick={handleWeek}>Week</MenuItem>
          <MenuItem onClick={handleMonth}>Month</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default DiarysToolbar;
