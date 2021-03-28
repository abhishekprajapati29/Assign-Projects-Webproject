import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  Typography,
  Button,
  Paper,
  Toolbar,
  Grid,
} from "@material-ui/core";
import "./project.css";
import Plan_detail from "../../../plan-detail.js";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Slider from '@material-ui/core/Slider';
import selectimage from "./add-file.png";
import { Redirect } from "react-router-dom";
import Loading from "../../../loading.js";
import formatBytes1 from './format.js'



const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function CreateProjects(props) {
  const data1 = formatBytes1(2680000000,1)
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("Team");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.handleradiovalue(event.target.value);
  };

  function valuetext(value) {
    return value;
  }

  function setSlider(value){
    props.setProjectSize(value);
  }

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2017-08-18T21:11:54")
  );
  const [selectedDate1, setSelectedDate1] = React.useState(
    new Date("2017-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.handleStartDate(date);
  };

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
    props.handleEndDate(date);
  };
  return (
    <>
      <div className={classes.sectionDesktop}>
        <>
          {!props.loading ? (
            props.no_of_projects < props.plan.No_of_Projects ? (
              <div>
                {props.renderRedirect()}
                <Card
                  className="back"
                  style={{ boxShadow: "unset", backgroundColor: "unset" }}
                >
                  <CardContent className="card2">
                    <div style={{ float: "left" }}>
                      <img
                        alt="=="
                        src="https://img.icons8.com/material/48/000000/project.png"
                        className="card1"
                      />
                      <div className="text" style={{ float: "right" }}>
                        Create Project
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Paper
                  style={{ margin: "0 112px", padding: "10px" }}
                  elevation={3}
                >
                  <div style={{ margin: "10px" }}>
                    <Card>
                      <CardContent
                        style={{ background: "aqua", padding: "12px" }}
                      >
                        <Typography>
                          <InfoIcon style={{ verticalAlign: "top" }} /> Once you
                          choose the project name you can’t change it unless you
                          contact customer support.
                        </Typography>
                      </CardContent>
                    </Card>
                    <br />
                    <div style={{ margin: "10px 24px" }}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        style={{ margin: "10px 0px" }}
                      >
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Project Name
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          name="project_name"
                          value={props.data.project_name}
                          onChange={(event) => props.handleChange(event)}
                          labelWidth={100}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        style={{ margin: "10px 0px" }}
                      >
                        <InputLabel htmlFor="outlined-adornment-amount1">
                          Application Name
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount1"
                          name="application"
                          value={props.data.application}
                          onChange={(event) => props.handleChange(event)}
                          labelWidth={130}
                        />
                      </FormControl>
                      <FormControl
                        variant="outlined"
                        style={{ margin: "10px 0px", width: "50%" }}
                      >
                        <InputLabel htmlFor="outlined-adornment-amount2">
                          Project Tags
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount2"
                          name="tag"
                          value={props.data.tag}
                          onChange={(event) => props.handleChange(event)}
                          labelWidth={100}
                        />
                      </FormControl>
                      <Button
                        style={{
                          margin: "17px",
                          padding: "9px 39px",
                          background: "aqua",
                        }}
                        onClick={() => props.handleAddTag()}
                      >
                        <AddIcon /> Add
                      </Button>
                      <div id="tags" style={{ marginBottom: "6px" }}>
                        <Typography>Tags- </Typography>
                        <Paper
                          style={{
                            width: "100%",
                            height: "50px",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {props.data.tags.map((data) => (
                            <Chip
                              style={{ background: "aqua" }}
                              key={data}
                              label={data}
                              onDelete={() => props.handlechipsDelete(data)}
                              className="chip"
                            />
                          ))}
                        </Paper>
                      </div>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          style={{ margin: "10px 5px", width: "49%" }}
                          variant="inline"
                          inputVariant="outlined"
                          label="Start Date"
                          format="MM/dd/yyyy"
                          value={selectedDate}
                          orientation="landscape"
                          InputAdornmentProps={{ position: "end" }}
                          onChange={(date) => handleDateChange(date)}
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider
                        variant="outlined"
                        utils={DateFnsUtils}
                      >
                        <KeyboardDatePicker
                          autoOk
                          variant="inline"
                          style={{ margin: "10px 5px", width: "49%" }}
                          inputVariant="outlined"
                          label="End Date"
                          format="dd/mm/yyyy"
                          orientation="landscape"
                          value={selectedDate1}
                          InputAdornmentProps={{ position: "end" }}
                          onChange={(date) => handleDateChange1(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                </Paper>
                <Paper
                  style={{
                    margin: "20px 112px",
                    padding: "10px",
                    borderRadius: "12px",
                  }}
                  elevation={3}
                >
                  <Typography variant="h5" style={{ margin: "12px" }}>
                    Project Cover
                  </Typography>
                  <Typography>{props.data.file_data.name}</Typography>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "11px",
                    }}
                  >
                    <input
                      accept="image/*,.pdf,.exe"
                      // className={classes.input}
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={(e) => props.handleDataFile(e.target.files[0])}
                    />

                    <label htmlFor="raised-button-file">
                      <Button
                        variant="outlined"
                        component="span"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          alt="p"
                          src={selectimage}
                          style={{ width: "134px" }}
                        />
                        <div>
                          <Typography variant="h5">Upload File</Typography>
                          <Typography
                            style={{
                              textTransform: "capitalize",
                              marginTop: "5px",
                            }}
                          >
                            Choose a File
                          </Typography>
                        </div>
                      </Button>
                    </label>
                  </div>
                </Paper>
                <Paper
                  style={{
                    margin: "30px 112px",
                    padding: "19px",
                    borderRadius: "12px",
                    height: "100%",
                  }}
                  elevation={3}
                >
                  <Typography variant="h5" style={{ margin: "12px" }}>
                    Project Description
                  </Typography>
                  <hr />
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "11px",
                    }}
                  >
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        props.handleText(data);
                      }}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "blockQuote",
                          "insertTable",
                          "undo",
                          "|",
                          "redo",
                          "Outdent",
                          "Indent",
                          "|",
                          "FontSize",
                        ],
                      }}
                    />
                  </div>
                </Paper>
                <Paper
                style={{
                  margin: "20px 112px",
                    padding: "10px",
                    borderRadius: "12px",
                    height: "100%",
                }}
                elevation={3}
              >
                <Typography variant="h5" style={{ margin: "12px" }}>
                  Allocate Project Size
                </Typography>
                
                <hr />
                <Toolbar>
                <Typography variant="h6" style={{ margin: "10px 12px" }}>
                  Avaliable Storage: -
                </Typography>
                <Typography variant="h6" style={{ margin: "10px 12px" }}>
                  {data1}
                </Typography>
                </Toolbar>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "11px",
                  }}
                >
                <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    onChange={(e,val)=>setSlider(val)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={data1/10}
                    marks
                    min={0}
                    max={formatBytes1(2680000000)}
                  />
                </div>
              </Paper>
                <Paper
                  style={{
                    margin: "20px 112px",
                    padding: "10px",
                    borderRadius: "12px",
                    height: "100%",
                  }}
                  elevation={3}
                >
                  <Typography variant="h5" style={{ margin: "12px" }}>
                    Project Preference
                  </Typography>
                  <hr />
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "11px",
                    }}
                  >
                    <Typography variant="h6" style={{ margin: "6px 14px" }}>
                      Project Privacy
                    </Typography>
                    <Typography
                      style={{ margin: "6px 14px", fontSize: "14px" }}
                    >
                      Choice The project Preference
                    </Typography>
                    <div style={{ margin: "12px" }}>
                      <FormControlLabel
                        value="female"
                        control={
                          <GreenRadio
                            checked={selectedValue === "Team"}
                            onChange={handleChange}
                            name="preference"
                            value="Team"
                            inputProps={{ "aria-label": "Team" }}
                          />
                        }
                        label="Allow Teamates To Join"
                        labelPlacement="end"
                      ></FormControlLabel>
                    </div>
                    <div style={{ margin: "12px" }}>
                      <FormControlLabel
                        value="female"
                        control={
                          <GreenRadio
                            checked={selectedValue === "Private"}
                            onChange={handleChange}
                            value="Private"
                            name="preference"
                            inputProps={{ "aria-label": "Private" }}
                          />
                        }
                        label="Private Project"
                        labelPlacement="end"
                      ></FormControlLabel>
                    </div>
                  </div>
                </Paper>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "20px 112px" }}
                  onClick={(event) => props.createProject(event)}
                >
                  Create Project
                </Button>
              </div>
            ) : null
          ) : (
            <Loading />
          )}
          {!props.loading ? (
            props.no_of_projects >= Number(props.plan.No_of_Projects) - 1 ? (
              <>
                <div>
                  <Paper
                    elevation={3}
                    style={{
                      margin: "51px",
                      padding: "43px",
                      background: "aqua",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "x-large",
                        fontFamily: "cursive",
                        textAlign: "center",
                      }}
                    >
                      You have reached your project Create limit. For more
                      project upgrade your plan.
                    </Typography>
                    <br />
                    <br />
                    <Button
                      href="/plan"
                      style={{
                        backgroundColor: "black",
                        display: "flex",
                        color: "aliceblue",
                        boxShadow:
                          "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                      }}
                    >
                      UPGRADE PLAN
                    </Button>
                  </Paper>
                </div>
              </>
            ) : null
          ) : (
            <Loading />
          )}
        </>
      </div>
      <div className={classes.sectionMobile}>
        {!props.loading ? (
          props.no_of_projects < props.plan.No_of_Projects ? (
            <div style={{ padding: "10px" }}>
              {props.renderRedirect()}
              <Card
                className="back"
                style={{ boxShadow: "unset", backgroundColor: "unset" }}
              >
                <CardContent
                  className="card2"
                  style={{ height: "auto", padding: 0 }}
                >
                  <Toolbar>
                    <img
                      alt="=="
                      src="https://img.icons8.com/material/48/000000/project.png"
                      className="card1"
                    />
                    <div className="text">Create Project</div>
                  </Toolbar>
                </CardContent>
              </Card>
              <Paper style={{ padding: "10px" }} elevation={3}>
                <div style={{ margin: "10px" }}>
                  <Card>
                    <CardContent
                      style={{ background: "aqua", padding: "12px" }}
                    >
                      <Typography>
                        <InfoIcon style={{ verticalAlign: "top" }} /> Once you
                        choose the project name you can’t change it unless you
                        contact customer support.
                      </Typography>
                    </CardContent>
                  </Card>
                  <br />
                  <div style={{ margin: "10px 24px" }}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      style={{ margin: "10px 0px" }}
                    >
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Project Name
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        name="project_name"
                        value={props.data.project_name}
                        onChange={(event) => props.handleChange(event)}
                        labelWidth={100}
                      />
                    </FormControl>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      style={{ margin: "10px 0px" }}
                    >
                      <InputLabel htmlFor="outlined-adornment-amount1">
                        Application Name
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount1"
                        name="application"
                        value={props.data.application}
                        onChange={(event) => props.handleChange(event)}
                        labelWidth={130}
                      />
                    </FormControl>
                    <Grid container spacing={2} style={{ padding: "10px" }}>
                      <Grid xs={12} sm={6}>
                        <FormControl
                          variant="outlined"
                          style={{ width: "100%" }}
                        >
                          <InputLabel htmlFor="outlined-adornment-amount2">
                            Project Tags
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount2"
                            name="tag"
                            value={props.data.tag}
                            onChange={(event) => props.handleChange(event)}
                            labelWidth={100}
                          />
                        </FormControl>
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <Button
                          style={{
                            width: "100%",
                            padding: "9px 39px",
                            background: "aqua",
                          }}
                          onClick={() => props.handleAddTag()}
                        >
                          <AddIcon /> Add
                        </Button>
                      </Grid>
                    </Grid>
                    <div id="tags" style={{ marginBottom: "6px" }}>
                      <Typography>Tags- </Typography>
                      <Paper
                        style={{
                          width: "100%",
                          height: "50px",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {props.data.tags.map((data) => (
                          <Chip
                            style={{ background: "aqua" }}
                            key={data}
                            label={data}
                            onDelete={() => props.handlechipsDelete(data)}
                            className="chip"
                          />
                        ))}
                      </Paper>
                    </div>
                    <Grid container spacing={2} style={{ padding: "25px 0" }}>
                      <Grid xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            style={{ width: "100%", padding: "15px" }}
                            label="Start Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            orientation="landscape"
                            InputAdornmentProps={{ position: "end" }}
                            onChange={(date) => handleDateChange(date)}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <MuiPickersUtilsProvider
                          variant="outlined"
                          utils={DateFnsUtils}
                        >
                          <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            label="End Date"
                            style={{ width: "100%", padding: "15px" }}
                            format="dd/mm/yyyy"
                            orientation="landscape"
                            value={selectedDate1}
                            InputAdornmentProps={{ position: "end" }}
                            onChange={(date) => handleDateChange1(date)}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Paper>
              <Paper
                style={{
                  margin: "20px 0",
                  padding: "10px",
                  borderRadius: "12px",
                }}
                elevation={3}
              >
                <Typography variant="h5" style={{ margin: "12px" }}>
                  Project Cover
                </Typography>
                <Typography>{props.data.file_data.name}</Typography>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "11px",
                  }}
                >
                  <input
                    accept="image/*,.pdf,.exe"
                    // className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) => props.handleDataFile(e.target.files[0])}
                  />

                  <label htmlFor="raised-button-file">
                    <Button
                      variant="outlined"
                      component="span"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        alt="p"
                        src={selectimage}
                        style={{ width: "134px" }}
                      />
                      <div>
                        <Typography variant="h5">Upload File</Typography>
                        <Typography
                          style={{
                            textTransform: "capitalize",
                            marginTop: "5px",
                          }}
                        >
                          Choose a File
                        </Typography>
                      </div>
                    </Button>
                  </label>
                </div>
              </Paper>
              <Paper
                style={{
                  width: "100%",
                  padding: "19px",
                  borderRadius: "12px",
                  height: "100%",
                }}
                elevation={3}
              >
                <Typography variant="h5">Project Description</Typography>
                <hr />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "11px",
                  }}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      props.handleText(data);
                    }}
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "numberedList",
                        "blockQuote",
                      ],
                    }}
                  />
                </div>
              </Paper>
              <Paper
                style={{
                  margin: "20px 0",
                  padding: "10px",
                  borderRadius: "12px",
                  height: "100%",
                }}
                elevation={3}
              >
                <Typography variant="h5" style={{ margin: "12px" }}>
                  Allocate Project Size
                </Typography>
                
                <hr />
                <Toolbar>
                <Typography variant="h6" style={{ margin: "10px 12px" }}>
                  Avaliable Storage: -
                </Typography>
                <Typography variant="h6" style={{ margin: "10px 12px" }}>
                  {data1}
                </Typography>
                </Toolbar>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "11px",
                  }}
                >
                <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    onChange={(e,val)=>setSlider(val)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={data1/10}
                    marks
                    min={0}
                    max={formatBytes1(2680000000)}
                  />
                </div>
              </Paper>
              <Paper
                style={{
                  margin: "20px 0",
                  padding: "10px",
                  borderRadius: "12px",
                  height: "100%",
                }}
                elevation={3}
              >
                <Typography variant="h5" style={{ margin: "12px" }}>
                  Project Preference
                </Typography>
                <hr />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "11px",
                  }}
                >
                  <Typography variant="h6" style={{ margin: "6px 14px" }}>
                    Project Privacy
                  </Typography>
                  <Typography style={{ margin: "6px 14px", fontSize: "14px" }}>
                    Choice The project Preference
                  </Typography>
                  <div style={{ margin: "12px" }}>
                    <FormControlLabel
                      value="female"
                      control={
                        <GreenRadio
                          checked={selectedValue === "Team"}
                          onChange={handleChange}
                          name="preference"
                          value="Team"
                          inputProps={{ "aria-label": "Team" }}
                        />
                      }
                      label="Allow Teamates To Join"
                      labelPlacement="end"
                    ></FormControlLabel>
                  </div>
                  <div style={{ margin: "12px" }}>
                    <FormControlLabel
                      value="female"
                      control={
                        <GreenRadio
                          checked={selectedValue === "Private"}
                          onChange={handleChange}
                          value="Private"
                          name="preference"
                          inputProps={{ "aria-label": "Private" }}
                        />
                      }
                      label="Private Project"
                      labelPlacement="end"
                    ></FormControlLabel>
                  </div>
                </div>
              </Paper>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "20px 0", width: "100%" }}
                onClick={(event) => props.createProject(event)}
              >
                Create Project
              </Button>
            </div>
          ) : null
        ) : (
          <Loading />
        )}
        {!props.loading ? (
          props.no_of_projects >= Number(props.plan.No_of_Projects) - 1 ? (
            <>
              <div>
                <Paper
                  elevation={3}
                  style={{
                    margin: "51px",
                    padding: "43px",
                    background: "aqua",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "x-large",
                      fontFamily: "cursive",
                      textAlign: "center",
                    }}
                  >
                    You have reached your project Create limit. For more
                    project's upgrade your plan.
                  </Typography>
                  <br />
                  <br />
                  <Button
                    href="/plan"
                    style={{
                      backgroundColor: "black",
                      display: "flex",
                      color: "aliceblue",
                      boxShadow:
                        "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                    }}
                  >
                    UPGRADE PLAN
                  </Button>
                </Paper>
              </div>
            </>
          ) : null
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

class CreateProject extends Component {
  state = {
    project_name: "",
    project_size: 0,
    application: "",
    tag: "",
    tags: [],
    start: 0,
    end: 0,
    file: {},
    text: "",
    preference: "Team",
    array: [],
    redirect: false,
    plan: [],
    no_of_projects: 0,
    file_data: [],
    loading: true,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/Subs/`).then((res) => {
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
          dateTo = moment(val.txn_date).add(12, "months").format("YYYY-MM-DD");
        } else {
          dateTo = moment(dateFrom).add(1, "months").format("YYYY-MM-DD");
        }
        if (res.data.length > 0 && dateFrom < dateTo) {
          this.setState({
            plan: Plan_detail.filter((data) => {
              return data.price === ~~val.amount;
            })[0],
            loading: false,
          });
        } else {
          if (res.data.length > 0) {
            this.setState({
              plan: Plan_detail.filter((data) => {
                return data.price === 0;
              })[0],
              loading: false,
            });
          }
        }
      });
      axios.get(`https://${this.props.url}/create/`).then((res) => {
        this.setState({
          no_of_projects: res.data.length,
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
      axios.get(`https://${this.props.url}/Subs/`).then((res) => {
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
          dateTo = moment(val.txn_date).add(12, "months").format("YYYY-MM-DD");
        } else {
          dateTo = moment(dateFrom).add(1, "months").format("YYYY-MM-DD");
        }
        if (res.data.length > 0 && dateFrom < dateTo) {
          this.setState({
            plan: Plan_detail.filter((data) => {
              return data.price === ~~val.amount;
            })[0],
            loading: false,
          });
        } else {
          if (res.data.length > 0) {
            this.setState({
              plan: Plan_detail.filter((data) => {
                return data.price === 0;
              })[0],
              loading: false,
            });
          }
        }
      });
      axios.get(`https://${this.props.url}/create/`).then((res) => {
        this.setState({
          no_of_projects: res.data.length,
        });
      });
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/project" />;
    }
  };

  handleradiovalue = (data) => {
    this.setState({
      preference: data,
    });
  };

  createProject = (event) => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("project_name", this.state.project_name);
    form_data.append("main_application", this.state.application);
    form_data.append("start_date", this.state.start);
    form_data.append("end_date", this.state.end);
    form_data.append("project_size", this.state.project_size);
    form_data.append("project_description", this.state.text);
    form_data.append("preferenece", this.state.preference);
    const url_post = `https://${this.props.url}/create/`;
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
        this.handledata(res.data);
        this.handlePromem(res.data);
        if (this.state.file_data.length > 0) {
          this.handleFileData(res.data);
        }
        this.handleActivityCreate(res.data);
      })
      .catch((err) => console.log(err));
  };

  handlePromem = (data) => {
    let form_data = new FormData();
    form_data.append("member", data.username);
    form_data.append("project_id", data.id);
    const url_post = `https://${this.props.url}/project-member/`;
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
      .then((res) => {});
  };

  handleActivityCreate = (data) => {
    let form_data = new FormData();
    form_data.append(
      "activity",
      `${data.username} has Created a Project (" ${data.project_name}")`
    );
    form_data.append("image_type", "create");
    form_data.append("name", data.username);
    form_data.append("project_id", data.id);
    const url_post = `https://${this.props.url}/project-activity/`;
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
        this.setRedirect();
        this.setState({
          loading: false,
        });
      });
  };

  handleDataFile = (data) => {
    this.setState({
      file_data: data,
    });
  };

  handleFileData = (data) => {
    let form_data = new FormData();
    form_data.append("uploaded_by", data.username);
    form_data.append("title", this.state.file_data.name);
    form_data.append("type", this.state.file_data.type);
    form_data.append("files", this.state.file_data);
    form_data.append("size", this.state.file_data.size);
    form_data.append("project_id", data.id);
    const url_post = `https://${this.props.url}/project-file/`;
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
        this.handleFile(res.data, data);
      })
      .catch((err) => console.log(err));
  };

  handleFile = (data, data1) => {
    let form_data = new FormData();
    form_data.append(
      "activity",
      `${data1.username} has Uploaded a file ("${this.state.file_data.name}")`
    );
    form_data.append("image_type", "upload");
    form_data.append("name", data1.username);
    form_data.append("project_id", data1.id);
    const url_post = `https://${this.props.url}/project-activity/`;
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
      .then((res) => {});
  };

  handledata = () => {
    this.setState({
      project_name: "",
      application: "",
      tag: "",
      start: 0,
      end: 0,
      file: {},
      text: "",
      preference: "",
    });
  };

  handlechipsdata = (data) => {
    this.state.tags.forEach((res) => {
      let form_data = {};
      form_data["ProjectCreatechip"] = data;
      form_data["chips"] = res;
      this.setState({
        array: this.state.array.concat(form_data),
      });
    });
    const url_post = `https://${this.props.url}/project-chip/`;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .post(url_post, this.state.array)
      .then((res) => {
        this.setState({
          array: [],
          tags: [],
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleStartDate = (date) => {
    const data = moment(date).format("YYYY-MM-DD");
    this.setState({
      start: data,
    });
  };

  handleEndDate = (date) => {
    const data = moment(date).format("YYYY-MM-DD");
    this.setState({
      end: data,
    });
  };

  handleAddTag = () => {
    if (
      this.state.tags.filter((data) => {
        return data === this.state.tag;
      }).length === 0
    ) {
      this.setState({
        tags: this.state.tags.concat(this.state.tag),
        tag: "",
      });
    } else {
      this.setState({
        tag: "",
      });
    }
  };
  handlechipsDelete = (tagsToDelete) => {
    this.setState({
      tags: this.state.tags.filter((data) => {
        return data !== tagsToDelete;
      }),
    });
  };

  handleImage = (data) => {
    this.setState({
      file: data,
    });
  };

  handleText = (data) => {
    this.setState({
      text: data,
    });
  };

  setProjectSize=(value)=>{
    this.setState({
      project_size: value
    })
  }

  render() {
    return (
      <CreateProjects
        loading={this.state.loading}
        handleDataFile={this.handleDataFile}
        handleFile={this.handleFile}
        data={this.state}
        plan={this.state.plan}
        no_of_projects={this.state.no_of_projects}
        renderRedirect={this.renderRedirect}
        handleText={this.handleText}
        handleImage={this.handleImage}
        handleEndDate={this.handleEndDate}
        handlechipsDelete={this.handlechipsDelete}
        handleStartDate={this.handleStartDate}
        handleAddTag={this.handleAddTag}
        handleChange={this.handleChange}
        handleradiovalue={this.handleradiovalue}
        createProject={this.createProject}
        setProjectSize={this.setProjectSize}
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

export default connect(mapStateToProps)(CreateProject);
