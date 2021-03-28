import React, { Component } from "react";
import "./project.css";
import { Typography, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Card from "./css/Card/Card.js";
import CardAvatar from "./css/Card/CardAvatar.js";
import CardBody from "./css/Card/CardBody.js";
import img from "./add-file.png";
import ReactHtmlParser from "react-html-parser";

function OverViews(props) {
  return (
    <div style={{ margin: "10px" }}>
      <Grid container spacing={3}>
        <Grid item xs={8} style={{ maxWidth: "100%", flexGrow: "1" }}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <Typography component={"span"}>
              {ReactHtmlParser(props.data.project_description)}
            </Typography>
          </Paper>
        </Grid>
        <div style={{ float: "right", width: "auto", flex: "auto" }}>
          <Paper elevation={3}>
            <Card profile style={{ marginTop: "55px" }}>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  {props.owner_image ? (
                    <img
                      src={props.owner_image.image}
                      alt={props.owner_image.user}
                    />
                  ) : (
                    <img src={img} alt="..." />
                  )}
                </a>
              </CardAvatar>

              {/* { profile === null? <></>:  */}
              <CardBody>
                <Typography>Owner</Typography>
                <Typography
                  variant="h2"
                  style={{ textTransform: "capitalize" }}
                >
                  {props.data.username}
                </Typography>
                <Table aria-label="sticky table">
                  <TableBody>
                    <TableRow key="1">
                      <TableCell component="th" scope="row">
                        Start Date
                      </TableCell>
                      <TableCell align="right">
                        {props.data.start_date}
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell component="th" scope="row">
                        DeadLine
                      </TableCell>
                      <TableCell align="right">{props.data.end_date}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell component="th" scope="row">
                        Main Application
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ textTransform: "capitalize" }}
                      >
                        {props.data.main_application}
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell component="th" scope="row">
                        Project Type
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ textTransform: "capitalize" }}
                      >
                        {props.data.preferenece}
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell component="th" scope="row">
                        Status
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ textTransform: "capitalize" }}
                      >
                        {props.data.Status}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Paper>
          <Paper elevation={3} style={{ padding: "15px" }}>
            <Typography variant="h3" style={{ padding: "10px" }}>
              {" "}
              Project Member
            </Typography>
            <Table aria-label="sticky table" style={{ padding: "10px" }}>
              <TableBody>
                {props.data.promem.map((mem) => (
                  <TableRow key={mem.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ textTransform: "capitalize" }}
                    >
                      {mem.member}
                    </TableCell>
                    {/* <TableCell align="right">1</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </Grid>
    </div>
  );
}

class OverView extends Component {
  state = {};

  render() {
    return (
      <OverViews data={this.props.data} owner_image={this.props.owner_image} />
    );
  }
}

export default OverView;
