import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TablePagination from "@material-ui/core/TablePagination";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import formatBytes from "../../../formatbytes";
import axios from "axios";
import ProjectHelp from "./projecthelp";
import EditIcon from "@material-ui/icons/Edit";
import ProjectSizeEdit from "./projectsizeedit";
import SelecterLoader from './loader'

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    maxHeight: 440,
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const classes1 = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [checkedFile, setCheckedFile] = React.useState([0]);
  const [checkedMember, setCheckedMember] = React.useState([0]);
  const [error, setError] = React.useState("");

  // loader 

  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = React.useState(false);
  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleFile = async (data) => {
    let newCheckedFile = [...checkedFile];
    await data.file.forEach((file) => {
      if (file.selected) {
        newCheckedFile.push(file.id);

        setCheckedFile(newCheckedFile);
      }
    });
  };

  const handleMember = (data) => {
    let newCheckedMember = [...checkedMember];
    data.promem.forEach((Member) => {
      if (Member.selected) {
        newCheckedMember.push(Member.id);

        setCheckedMember(newCheckedMember);
      }
    });
  };

  // useEffect(() => {
  //   axios.defaults.headers = {
  //     "Content-Type": "application.json",
  //     Authorization: "Token " + props.token,
  //   };
  //   axios.get(`https://${props.url}/create/${row.id}/`).then((res) => {
  //     if (res.data.selected) {
  //       const currentIndex = checked.indexOf(row.id);
  //       const newChecked = [...checked];

  //       if (currentIndex === -1) {
  //         newChecked.push(row.id);
  //       }

  //       setChecked(newChecked);
  //       handleFile(res.data);
  //       handleMember(res.data);
  //     }
  //   });
  //   // eslint-disable-next-line
  // }, [props.token, props.url, row]);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + props.token,
    };
    axios.get(`https://${props.url}/create-all/${row.id}/`).then((res) => {
      if (res.data.selected) {
        const currentIndex = checked.indexOf(row.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(row.id);
        }

        setChecked(newChecked);
        handleFile(res.data);
        handleMember(res.data);
      }
    });
    // eslint-disable-next-line
  }, [props.token, props.url, row]);

  const handleToggleFile = (
    value,
    selected,
    file_size,
    selected_file_size,
    total_file_size
  ) => () => {
    const total = Number(file_size) + Number(selected_file_size);
    if (Number(total <= total_file_size)) {
      const currentIndex = checkedFile.indexOf(value);
      const newCheckedFile = [...checkedFile];

      if (currentIndex === -1) {
        newCheckedFile.push(value);
      } else {
        newCheckedFile.splice(currentIndex, 1);
      }

      setCheckedFile(newCheckedFile);
      props.handleToggleFile(value, selected);
    } else {
      setError("Cannot store More file due to storage is not enough.");
      setOpen2(true);
    }
  };

  const handleToggle = (value, selected) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }


    setChecked(newChecked);
    if (!selected) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + props.token,
      };
      axios.get(`https://${props.url}/create/${value}/`).then((res) => {
        handleFile(res.data);
      });
    } else {
      setOpen(false);
    }
    props.handleProjectSelect(value, selected);
  };

  const handleToggleMember = (value, selected, max_mem, member) => () => {
    const members = member.filter((fil) => {
      return fil.selected === true;
    }).length;
    if (Number(members) <= Number(max_mem)) {
      const currentIndex = checkedMember.indexOf(value);
      const newChecked = [...checkedMember];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedMember(newChecked);
      props.handleToggleMember(value, selected);
    } else {
      setError("Cannot Accept More Member due to your Subscription Type.");
      setOpen2(true);
    }
  };

  const handleStorageText = (event, id, size) => {
    setOpen3(false);
    props.handleStorageText(event, id, size);
  };

  const labelId1 = `checkbox-list-primary-label-${row.id}`;
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row.selected ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
          {
            (props.loader.indexOf(row.id) !== -1)?
            (
              <SelecterLoader />
            ):
            (
              <Checkbox
                style={{ margin: "auto" }}
                edge="start"
                checked={checked.indexOf(row.id) !== -1 && row.selected}
                tabIndex={-1}
                disableRipple
                onClick={handleToggle(row.id, row.selected)}
                inputProps={{ "aria-labelledby": labelId1 }}
              />
            )
          }
          

          <ProjectHelp
            data={row}
            handleClickOpen={handleClickOpen2}
            error={error}
            open={open2}
            handleClose={handleClose2}
          />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          style={{ textTransform: "capitalize", fontWeight: 600 }}
        >
          {row.project_name}
        </TableCell>
        <TableCell align="right">{row.preferenece}</TableCell>
        <TableCell align="right">{row.promem_count}</TableCell>
        <TableCell align="right">
          {row.selected_file_size !== null
            ? formatBytes(row.selected_file_size)
            : 0}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClickOpen3}
          >
            <EditIcon />
          </IconButton>
          <ProjectSizeEdit
            data={row}
            project_size_edit={props.project_size_edit}
            handleStorageText={handleStorageText}
            handleClickOpen={handleClickOpen3}
            open={open3}
            handleClose={handleClose3}
          />
          {formatBytes(row.project_size)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              margin={1}
              style={{ backgroundColor: "aliceblue", padding: "0 15%" }}
            >
              {row.file_count > 0 ? (
                <>
                  <hr />
                  <Typography style={{ fontWeight: 500, textAlign: "center" }}>
                    File's
                  </Typography>
                  <List
                    dense
                    key="1"
                    className={classes1.root}
                    style={{ backgroundColor: "aliceblue" }}
                  >
                    {row.file.map((file) => {
                      const labelId = `checkbox-list-secondary-label-${file.id}`;
                      return (
                        <ListItem
                          key={file.id}
                          role={file.id}
                          dense
                          button
                          onClick={handleToggleFile(
                            file.id,
                            file.selected,
                            file.size,
                            row.selected_file_size,
                            row.project_size
                          )}
                          style={{ backgroundColor: "aliceblue" }}
                        >
                          <ListItemIcon>
                          {
                            (props.fileloader.indexOf(file.id) !== -1)?
                            (
                              <SelecterLoader />
                            )
                            :
                            (
                              <Checkbox
                                edge="start"
                                checked={
                                  checkedFile.indexOf(file.id) !== -1 &&
                                  file.selected
                                }
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            )
                          }
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={file.title} />
                          <ListItemSecondaryAction>
                            <Typography style={{ fontWeight: 500 }}>
                              {formatBytes(file.size)}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </>
              ) : null}

              <hr />
              <Typography style={{ fontWeight: 500, textAlign: "center" }}>
                Member's
              </Typography>
              <List
                dense
                key="2"
                className={classes1.root}
                style={{ backgroundColor: "aliceblue" }}
              >
                {row.promem.map((mem) => {
                  const labelIdMember = `checkbox-list-member-label-${mem.id}`;
                  return (
                    <div key={mem.id}>
                      {props.username !== mem.member ? (
                        <ListItem
                          key={mem.id}
                          role={mem.id}
                          dense
                          button
                          onClick={handleToggleMember(
                            mem.id,
                            mem.selected,
                            props.subs_detail.No_of_project_members,
                            row.promem
                          )}
                          style={{ backgroundColor: "aliceblue" }}
                        >
                          <ListItemIcon>
                          {
                            (props.memberloader.indexOf(mem.id) !== -1)?
                            (
                              <SelecterLoader />
                            ):
                            (
                              <Checkbox
                                edge="start"
                                checked={
                                  checkedMember.indexOf(mem.id) !== -1 &&
                                  mem.selected
                                }
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelIdMember }}
                              />
                            )
                          }
                          </ListItemIcon>
                          <ListItemText
                            id={labelIdMember}
                            primary={mem.member}
                          />
                        </ListItem>
                      ) : (
                        <ListItem
                          key={mem.id}
                          role={mem.id}
                          dense
                          button
                          disabled
                          style={{ backgroundColor: "aliceblue" }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={true}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelIdMember }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            style={{ textTransform: "capitalize" }}
                            id={labelIdMember}
                            primary={`${mem.member} (Owner)`}
                          />
                        </ListItem>
                      )}
                    </div>
                  );
                })}
              </List>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              <TableCell style={{ color: "aliceblue" }}>Action</TableCell>
              <TableCell style={{ color: "aliceblue" }}>Project Name</TableCell>
              <TableCell style={{ color: "aliceblue" }} align="right">
                Type
              </TableCell>
              <TableCell style={{ color: "aliceblue" }} align="right">
                Members
              </TableCell>
              <TableCell style={{ color: "aliceblue" }} align="right">
                Used Storage
              </TableCell>
              <TableCell style={{ color: "aliceblue" }} align="right">
                Total Storage
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  key={row.id}
                  loader={props.loader}
                  fileloader={props.fileloader}
                  memberloader={props.memberloader}
                  row={row}
                  url={props.url}
                  handleToggleMember={props.handleToggleMember}
                  username={props.username}
                  token={props.token}
                  handleToggleFile={props.handleToggleFile}
                  handleProjectSelect={props.handleProjectSelect}
                  handleStorageText={props.handleStorageText}
                  subs_detail={props.subs_detail}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[-1]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
