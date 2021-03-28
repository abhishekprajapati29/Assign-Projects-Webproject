import React, { Component } from "react";
import "./project.css";
import { Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import selectimage from "./add-file.png";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import { connect } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearWithValueLabel from "../../../progress.js";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "231px",
    height: "263px",
    minWidth: "200px",
    margin: "7px",
  },
  media: {
    height: 165,
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

function ProFiless(props) {
  const classes = useStyles();

  const [open4, setOpen4] = React.useState(false);

  const handleClose4 = () => {
    setOpen4(false);
  };

  function handleSave(event) {
    const selected_file_size = Number(props.data.selected_file_size) + Number(event.size);
    if(selected_file_size < props.data.project_size){
      props.handleData(event);
      setOpen4(true);
    }
  }
  return (
    <div>
      <div className={classes.sectionDesktop}>
        <Paper
          style={{
            display: "flex",
            margin: "20px 52px",
            padding: "10px",
            borderRadius: "12px",
            flexGrow: "1",
          }}
          elevation={3}
        >
          <div style={{ width: "100%", height: "200px", borderRadius: "11px" }}>
            <input
              accept="image/*,.pdf,.exe"
              // className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) => handleSave(e.target.files[0])}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                style={{ width: "100%", height: "100%" }}
              >
                <img alt="p" src={selectimage} style={{ width: "134px" }} />
                <div>
                  <Typography variant="h5">Upload File</Typography>
                  <Typography
                    style={{ textTransform: "capitalize", marginTop: "5px" }}
                  >
                    Choose a File
                  </Typography>
                </div>
              </Button>
            </label>
          </div>
        </Paper>
      </div>
      <div className={classes.sectionMobile}>
        <Paper
          style={{ display: "flex", padding: "10px", borderRadius: "12px" }}
          elevation={3}
        >
          <div style={{ width: "100%", height: "200px", borderRadius: "11px" }}>
            <input
              accept="image/*,.pdf,.exe"
              // className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) => handleSave(e.target.files[0])}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                style={{ width: "100%", height: "100%" }}
              >
                <img alt="p" src={selectimage} style={{ width: "134px" }} />
                <div>
                  <Typography variant="h5">Upload File</Typography>
                  <Typography
                    style={{ textTransform: "capitalize", marginTop: "5px" }}
                  >
                    Choose a File
                  </Typography>
                </div>
              </Button>
            </label>
          </div>
        </Paper>
      </div>

      <Paper
        style={{
          display: "flex",
          flexFlow: "wrap",
          padding: "10px",
          borderRadius: "12px",
          backgroundColor: "transparent",
          boxShadow: "unset",
        }}
        elevation={3}
      >
        {props.data.file.map((file) => (
          <Card className={classes.root} key={file.id}>
            <CardActionArea>
              <a target="_blank" href={file.files} rel="noopener noreferrer">
                {file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png" ? (
                  <CardMedia
                    className={classes.media}
                    image={file.files}
                    title={file.name}
                  />
                ) : (
                  <CardMedia
                    className={classes.media}
                    image="https://img.icons8.com/material/100/000000/pdf-2--v1.png"
                    title={file.name}
                  />
                )}
              </a>
              <hr />
              <Paper style={{ height: "16px" }} elevation={0}>
                <Typography style={{ margin: "0 12px" }}>
                  {file.title.length > 15
                    ? file.title.slice(0, 15) + "..."
                    : file.title}
                </Typography>
              </Paper>
            </CardActionArea>
            <hr />
            <CardActions style={{ flexDirection: "column" }}>
              <Button
                size="small"
                color="primary"
                onClick={(event) => props.handleFileDownload(event, file.files)}
              >
                <GetAppIcon />
                Download
              </Button>
              {/* <Button size="small" color="primary">
                            Learn More
                            </Button> */}
            </CardActions>
          </Card>
        ))}
      </Paper>
      {props.uploadPercentage !== 0 ? (
        <Dialog
          open={open4}
          aria-labelledby="alert-dialog-title"
          style={{ minWidth: "600px" }}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ minWidth: "600px" }}>
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
            <Button onClick={() => props.handlerequestCancel()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        () => handleClose4()
      )}
    </div>
  );
}

class ProFiles extends Component {
  state = {
    uploadPercentage: 0,
    loaded: 0,
    total: 0,
  };

  handleData = (data) => {
    let form_data = new FormData();
    form_data.append("uploaded_by", this.props.data.username);
    form_data.append("title", data.name);
    form_data.append("type", data.type);
    form_data.append("files", data);
    form_data.append("size", data.size);
    form_data.append("project_id", this.props.data.id);

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
    const url_post = `https://${this.props.url}/project-file/`;
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
        this.handleFile(res.data);

        this.setState({ uploadPercentage: 100 }, () => {
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 });
          }, 1000);
        });
      })
      .catch((err) => console.log(err));
  };

  handlerequestCancel = () => {
    window.location.reload(false);
  };

  handleFile = (data) => {
    let title = data.title;
    if (title.length > 30) {
      title = title.slice(0, 30) + "...";
    }
    let form_data = new FormData();
    form_data.append(
      "activity",
      `${this.props.username} has Uploaded a file (" ${title} ")`
    );
    form_data.append("image_type", "upload");
    form_data.append("name", this.props.username);
    form_data.append("project_id", data.project_id);
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
        this.props.handleFiles();
      });
  };

  handleFileDownload = (event, file) => {
    axios({
      url: file,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file}`);
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    return (
      <ProFiless
        data={this.props.data}
        loaded={this.state.loaded}
        total={this.state.total}
        handlerequestCancel={this.handlerequestCancel}
        uploadPercentage={this.state.uploadPercentage}
        handleFile={this.handleFile}
        handleData={this.handleData}
        handleFileDownload={this.handleFileDownload}
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

export default connect(mapStateToProps)(ProFiles);
