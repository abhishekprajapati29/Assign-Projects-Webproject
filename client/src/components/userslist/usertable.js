import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import helpers from "../diarys/components/helpers.js";
import { makeStyles } from "@material-ui/styles";
import io from "socket.io-client";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import UserlistMobile from "./userlistMobile.js";

import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
} from "@material-ui/core";
import Loading from "../../loading.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const UsersTable = (props) => {
  const classes = useStyles();

  const [selectedUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInvoice = (event, id) => {
    const userid = id;
    event.preventDefault();
    const username = localStorage.getItem("username");
    const currentuserid = localStorage.getItem("id");
    let form_data = new FormData();
    form_data.append("user", userid);
    form_data.append("invoice", `this invoice is given by ${username}`);
    form_data.append("requested_by", currentuserid);
    const url_post = `https://${props.url}/invoice/`;
    axios
      .post(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        props.handlerequestdata(res.data);
        var socket = io("https://live-data-manager.herokuapp.com");
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + props.token,
        };

        axios.get(`https://${props.url}/userprofile/`).then((res) => {
          const prof = res.data[0];
          socket.emit(
            "join",
            { name: prof.user, room: prof.teamName },
            (error) => {
              if (error) {
                alert(error);
              }
            }
          );

          return () => {
            if (!prof.user & !prof.teamName) {
              socket.emit("disconnect");

              socket.off();
            }
          };
        });
        const data = res.data;
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + props.token,
        };
        axios.get(`https://${props.url}/userprofile/`).then((res1) => {
          const prof = res1.data[0];
          const name = prof.user;
          const room = prof.teamName;
          const message = res.data;
          axios
            .get(`https://${props.url}/userprofileList/?id=${data.user}`)
            .then((res2) => {
              const prod = res2.data[0];
              const sendTo = prod.username;
              socket.emit("addUser", { name, room, sendTo, message });
            });
        });
      })
      .catch((err) => console.log(err));
  };

  const { teamName } = props;
  return (
    <>
      {/* {props.renderRedirect()} */}
      <div className={classes.sectionDesktop}>
        {!props.loading ? (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead
                  style={{
                    boxShadow:
                      "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                  }}
                >
                  <TableRow
                    style={{
                      boxShadow:
                        "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                    }}
                  >
                    <TableCell
                      style={{ color: "aliceblue", backgroundColor: "black" }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      style={{
                        color: "aliceblue",
                        backgroundColor: "black",
                        textAlign: "center",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{
                        color: "aliceblue",
                        backgroundColor: "black",
                        textAlign: "center",
                      }}
                    >
                      Location
                    </TableCell>
                    <TableCell
                      style={{
                        color: "aliceblue",
                        backgroundColor: "black",
                        textAlign: "center",
                      }}
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      style={{
                        color: "aliceblue",
                        backgroundColor: "black",
                        textAlign: "center",
                      }}
                    >
                      About Me
                    </TableCell>
                    {teamName === "default_team_name" ? (
                      <TableCell
                        style={{
                          color: "aliceblue",
                          backgroundColor: "black",
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.users.length > 0 ? (
                    <>
                      {props.users.slice(0, rowsPerPage).map((user) => (
                        <TableRow
                          className={classes.tableRow}
                          hover
                          onClick={() => props.setRedirect(user.id)}
                          key={user.id}
                          selected={selectedUsers.indexOf(user.id) !== -1}
                        >
                          <TableCell style={{ background: "#f5f5f5" }}>
                            <div className={classes.nameContainer}>
                              <Avatar
                                className={classes.avatar}
                                src={user.image.image}
                              >
                                {helpers(user.username)}
                              </Avatar>
                              <Typography variant="body1">
                                {user.username ? user.username : "-"}
                              </Typography>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {user.email ? user.email : "-"}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              background: "#f5f5f5",
                            }}
                          >
                            {user.profile.loaction
                              ? user.profile.loaction
                              : "-"}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {user.phone_number ? user.phone_number : "-"}
                          </TableCell>

                          {user.profile.teamName !== "default_team_name" &&
                          teamName === "default_team_name" ? (
                            <>
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                {user.profile.about_me
                                  ? user.profile.about_me
                                  : "-"}
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                {props.invoice_data.filter((fil) => {
                                  return (
                                    fil.requested_by ===
                                      props.fulluserdata.id &&
                                    fil.user === user.id
                                  );
                                }).length > 0 ? (
                                  <Button color="primary" disabled>
                                    Requested
                                  </Button>
                                ) : (
                                  <Button
                                    color="primary"
                                    onClick={(event) => {
                                      handleInvoice(event, user.id);
                                    }}
                                  >
                                    ADD
                                  </Button>
                                )}
                              </TableCell>
                            </>
                          ) : (
                            <TableCell
                              style={{
                                textAlign: "center",
                                background: "#f5f5f5",
                              }}
                            >
                              {user.profile.about_me
                                ? user.profile.about_me
                                : "-"}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={props.users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Loading />
        )}
      </div>
      <div className={classes.sectionMobile}>
        {props.users.length > 0 ? (
          <>
            {props.users.map((user) => (
              <UserlistMobile
                data={user}
                teamName={props.teamName}
                invoice_data={props.invoice_data}
                handleInvoice={handleInvoice}
                fulluserdata={props.fulluserdata}
              />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
};

export default UsersTable;
