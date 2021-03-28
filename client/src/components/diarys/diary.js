import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import DiarysTable from "./components/diarysTable";
import DiarysToolbar from "./components/diaryToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    toolbar: theme.mixins.toolbar,
    padding: "0px 20px 0 20px",
  },
  content: {
    marginTop: theme.spacing(2),
    background: "black",
    color: "aliceblue",
    boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
    borderRadius: "6px",
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

function DiaryLists(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DiarysToolbar
        handleChange={props.handleChange}
        search={props.search}
        handleAllData={props.handleAllData}
        handleTodayData={props.handleTodayData}
        handleMonthData={props.handleMonthData}
        handleWeekData={props.handleWeekData}
      />
      <div className={classes.content}>
        <DiarysTable
          diarys={props.data}
          edit_diary={props.edit_diary}
          handleDeleteData={props.handleDeleteData}
          loading={props.loading}
          handleDelete={props.handleDelete}
        />
      </div>
    </div>
  );
}

class DiaryList extends Component {
  state = {
    diary: [],
    search: "",
    diarys_search: [],
    loading: true,
    edit_diary: {},
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/diary/`).then((res) => {
        this.setState({
          diary: res.data,
          diarys_search: res.data,
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
      axios.get(`https://${this.props.url}/diary/`).then((res) => {
        this.setState({
          diary: res.data,
          diarys_search: res.data,
          loading: false,
        });
      });
    }
  }

  handleDeleteData = (data) => {
    this.setState({
      edit_diary: data,
    });
  };

  handleDelete = () => {
    this.setState({
      loading: true,
    });
    const diaryID = this.state.edit_diary.id;
    const data = [...this.state.diary];
    const removed = data.filter((diary) => {
      return diary.id !== diaryID;
    });
    axios.delete(`https://${this.props.url}/diary/${diaryID}`);
    this.setState({
      diary: removed,
      loading: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
      diary: this.state.diarys_search.filter((res) => {
        return (
          res.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
            -1 ||
          res.text.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
            -1
        );
      }),
    });
  };

  handleCreateData = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAllData = () => {
    this.setState({
      diary: this.state.diarys_search,
    });
  };

  handleTodayData = () => {
    var today = new Date();
    var date = moment(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).format("YYYY-MM-DD");
    this.setState({
      diary: this.state.diarys_search.filter((data) => {
        return moment(data.posted_date).format("YYYY-MM-DD") === date;
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
      diary: this.state.diarys_search.filter((data) => {
        return (
          dateTo >= moment(data.posted_date).format("YYYY-MM-DD") &&
          moment(data.posted_date).format("YYYY-MM-DD") >= dateFrom
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
      diary: this.state.diarys_search.filter((data) => {
        return (
          dateTo >= moment(data.posted_date).format("YYYY-MM-DD") &&
          moment(data.posted_date).format("YYYY-MM-DD") >= dateFrom
        );
      }),
    });
  };

  render() {
    return (
      <div>
        <DiaryLists
          loading={this.state.loading}
          edit_diary={this.state.edit_diary}
          handleAllData={this.handleAllData}
          data={this.state.diary}
          handleDelete={this.handleDelete}
          handleDeleteData={this.handleDeleteData}
          search={this.state.search}
          handleChange={this.handleChange}
          handleTodayData={this.handleTodayData}
          handleMonthData={this.handleMonthData}
          handleWeekData={this.handleWeekData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(DiaryList);
