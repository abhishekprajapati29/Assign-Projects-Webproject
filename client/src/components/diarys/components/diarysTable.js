import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import Loading from "../../../loading.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import MobileDiary from "./diarymobile";
import TableContainer from "@material-ui/core/TableContainer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Button,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const DiarysTable = (props) => {
  const { diarys } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }
  const [open, setOpen] = React.useState(false);

  function handleClickOpen(data) {
    setOpen(true);
    props.handleDeleteData(data);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete(data) {
    handleClose();
    props.handleDelete();
  }

  return (
    <>
      <div className={classes.sectionDesktop}>
        {!props.loading ? (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={classes.header}>
                  <TableRow
                    style={{
                      boxShadow:
                        "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                    }}
                  >
                    <TableCell
                      style={{
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "aliceblue",
                      }}
                    >
                      <Box fontWeight="fontWeightBold" fontSize="17px">
                        Date
                      </Box>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "aliceblue",
                      }}
                    >
                      <Box fontWeight="fontWeightBold" fontSize="17px">
                        Title
                      </Box>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "aliceblue",
                      }}
                    >
                      <Box fontWeight="fontWeightBold" fontSize="17px">
                        Content
                      </Box>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "aliceblue",
                      }}
                    >
                      <Box fontWeight="fontWeightBold" fontSize="17px">
                        Action
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {diarys
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((diary) => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={diary.id}
                      >
                        <TableCell
                          style={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          {moment(diary.posted_date).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {diary.title.length < 10
                            ? diary.title
                            : diary.title.slice(0, 10) + "...."}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {diary.text.length < 10
                            ? diary.text
                            : diary.text.slice(0, 10) + "...."}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Tooltip title="View">
                            <Button
                              size="medium"
                              aria-label="Edit"
                              className={classes.fab}
                              href={`/diaryview/${diary.id}`}
                            >
                              <VisibilityIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <Button
                              size="medium"
                              aria-label="Edit"
                              className={classes.fab}
                              href={`/diarys/${diary.id}`}
                            >
                              <EditIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Button
                              size="medium"
                              aria-label="delete"
                              className={classes.fab}
                              onClick={() => handleClickOpen(diary)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={diarys.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Loading />
        )}

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to Delete Diary{" "}
              <b style={{ fontSize: "18px" }}> {props.edit_diary.title} </b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={(event) => handleDelete()} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.sectionMobile}>
        <div style={{ width: "100%" }}>
          {diarys
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((diary) => (
              <MobileDiary data={diary} handleClickOpen={handleClickOpen} />
            ))}
        </div>
      </div>
    </>
  );
};

DiarysTable.propTypes = {
  className: PropTypes.string,
  diarys: PropTypes.array.isRequired,
};

export default DiarysTable;
