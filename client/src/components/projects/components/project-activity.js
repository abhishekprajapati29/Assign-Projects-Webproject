import React, { Component } from "react";
import "./project.css";
import { Typography, Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import moment from "moment";

function Activitys(props) {
  return (
    <div>
      {props.activity
        ? props.activity.map((data) => (
            <div
              key={data.id}
              style={{
                display: "flex",
                minHeight: "50px",
                width: "100%",
                margin: "30px 0",
              }}
            >
              {data.image_type === "create" ? (
                <Avatar
                  style={{
                    minHeight: "50px",
                    maxHeight: "80px",
                    minWidth: "50px",
                    maxWidth: "80px",
                    boxShadow:
                      "#1976d2 0px 4px 20px 0px, rgba(244, 67, 54, 0.4) 0px 7px 10px -5px",
                    background: "lightskyblue",
                  }}
                >
                  <CreateNewFolderIcon style={{ fontSize: "36px" }} />
                </Avatar>
              ) : data.image_type === "addmem" ? (
                <Avatar
                  style={{
                    minHeight: "50px",
                    maxHeight: "80px",
                    minWidth: "50px",
                    maxWidth: "80px",
                    boxShadow:
                      "darkgoldenrod 0px 4px 20px 0px, rgba(244, 67, 54, 0.4) 0px 7px 10px -5px",
                    background: "darkgoldenrod",
                  }}
                >
                  <PersonAddIcon style={{ fontSize: "36px" }} />
                </Avatar>
              ) : data.image_type === "upload" ? (
                <Avatar
                  style={{
                    minHeight: "50px",
                    maxHeight: "80px",
                    minWidth: "50px",
                    maxWidth: "80px",
                    boxShadow:
                      "blueviolet 0px 4px 20px 0px, rgba(244, 67, 54, 0.4) 0px 7px 10px -5px",
                    background: "blueviolet",
                  }}
                >
                  <CloudUploadIcon style={{ fontSize: "36px" }} />
                </Avatar>
              ) : null}
              <Paper
                elevation={3}
                style={{
                  width: "100%",
                  margin: "0 15px",
                  borderRadius: "10px",
                  display: "flex",
                  background: "lightgrey",
                }}
              >
                <Typography
                  style={{
                    margin: "28px",
                    textTransform: "capitalize",
                    flex: "auto",
                  }}
                >
                  {data.activity}
                </Typography>
                <Typography
                  style={{ margin: "28px", textTransform: "capitalize" }}
                >
                  {moment(data.timestamp).fromNow()}
                </Typography>
              </Paper>
            </div>
          ))
        : null}
    </div>
  );
}

class Activity extends Component {
  state = {};

  render() {
    return <Activitys activity={this.props.activity} />;
  }
}

export default Activity;
