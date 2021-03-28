import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import formatBytes from "../../../formatbytes";
import axios from "axios";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ProjectSizeEdit from "./projectsizeeditM";
import ProjectHelp from "./projecthelp";
import { Toolbar } from "@material-ui/core";
import formatBytes1 from "./format";
import SelecterLoader from './loader'

const currencies = [
  {
    value: 1024,
    label: "KB",
  },
  {
    value: 1048576,
    label: "MB",
  },
  {
    value: 1073741824,
    label: "GB",
  },
  {
    value: 1099511628000,
    label: "TB",
  },
];

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

export default function MobileProject(props) {
  // eslint-disable-next-line
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const classes1 = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [checkedFile, setCheckedFile] = React.useState([0]);
  const [checkedMember, setCheckedMember] = React.useState([0]);

  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = (event) => {
    event.stopPropagation();
    setOpen2(true);
  };

  const handleClose2 = (event) => {
    event.stopPropagation(event);
    setOpen2(false);
  };

  const [id, setId] = useState(0);
  const [size, setSize] = useState(0);

  const [type, setType] = React.useState(1024);
  const [error, setError] = React.useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [open3, setOpen3] = React.useState(false);
  const handleClickOpen3 = (event, id, size) => {
    event.stopPropagation();
    setOpen3(true);
    setId(id);

    const [sizes, types] = formatBytes1(size);
    setSize(sizes);
    let type_data = 0;
    currencies.forEach((type) => {
      if (type.label === types) {
        type_data = type.value;
      }
    });
    setType(type_data);
  };

  const handleClose3 = (event) => {
    event.stopPropagation();
    setOpen3(false);
  };

  const handleFile = (data) => {
    let newCheckedFile = [...checkedFile];
    data.forEach((da) => {
      da.file.forEach((file) => {
        if (file.selected) {
          newCheckedFile.push(file.id);
        }
      });
    });
    setCheckedFile(newCheckedFile);
  };

  const handleMember = (data) => {
    let newCheckedMember = [...checkedMember];
    data.forEach((da) => {
      da.promem.forEach((mem) => {
        if (mem.selected) {
          newCheckedMember.push(mem.id);
        }
      });
    });
    setCheckedMember(newCheckedMember);
  };

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + props.token,
    };
    axios.get(`https://${props.url}/create/`).then((res) => {
      const newChecked = [...checked];

      res.data.forEach((project) => {
        if (project.selected) {
          if (checked.indexOf(project.id) === -1) {
            newChecked.push(project.id);
          }
        }
      });
      setChecked(newChecked);
      handleFile(res.data);
      handleMember(res.data);
    });
    // eslint-disable-next-line
  }, [props.token, props.url, props.data]);

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

  const handleToggle = (value, selected) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }


    setChecked(newChecked);
    if (selected) {
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

  function handleCheckClick(event, id, selected) {
    event.stopPropagation();
    handleToggle(id, selected);
  }

  const handleStorageText = (event, id, size) => {
    event.stopPropagation();
    setOpen3(false);
    props.handleStorageText(event, id, size);
  };

  return (
    <div className={classes.root}>
      {props.data
        ? props.data.map((project) => (
            <Accordion key={project.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls={project.id}
                id={project.id}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) =>
                    handleCheckClick(event, project.id, project.selected)
                  }
                  onFocus={(event) => event.stopPropagation()}
                  control={(props.mobileProjectLoader.indexOf(project.id) !== -1)?<SelecterLoader/>:<Checkbox />}
                  checked={
                    checked.indexOf(project.id) !== -1 && project.selected
                  }
                  label={project.project_name}
                />
                <div style={{ alignContent: "right", flexGrow: "1" }}>
                  <Toolbar>
                    <IconButton
                      style={{ marginLeft: "auto" }}
                      onClick={(event) =>
                        handleClickOpen3(
                          event,
                          project.id,
                          project.project_size
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <Typography>{formatBytes(project.project_size)}</Typography>
                    <ProjectSizeEdit
                      id={id}
                      size={size}
                      type={type}
                      handleChange={handleChange}
                      project_size_edit={props.project_size_edit}
                      handleStorageText={handleStorageText}
                      handleClickOpen={handleClickOpen3}
                      open={open3}
                      handleClose={handleClose3}
                    />

                    <ProjectHelp
                      id={id}
                      error={error}
                      size={size}
                      handleClickOpen={(event) => handleClickOpen2(event)}
                      open={open2}
                      handleClose={(event) => handleClose2(event)}
                    />
                  </Toolbar>
                </div>
              </AccordionSummary>
              {project.selected ? (
                <AccordionDetails>
                  <Box
                    margin={1}
                    style={{
                      backgroundColor: "aliceblue",
                      padding: "0 15%",
                      width: "100%",
                    }}
                  >
                    {project.file_count > 0 ? (
                      <>
                        <hr />
                        <Typography
                          style={{ fontWeight: 500, textAlign: "center" }}
                        >
                          File's
                        </Typography>
                        <List
                          dense
                          key="1"
                          className={classes1.root}
                          style={{ backgroundColor: "aliceblue" }}
                        >
                          {project.file.map((file) => {
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
                                  project.selected_file_size,
                                  project.project_size
                                )}
                                style={{ backgroundColor: "aliceblue" }}
                              >
                                <ListItemIcon>
                                  {
                                    (props.mobileProjectFileLoader.indexOf(file.id) !== -1)?
                                    <SelecterLoader />
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
                                <ListItemText
                                  id={labelId}
                                  primary={file.title}
                                />
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
                    <Typography
                      style={{ fontWeight: 500, textAlign: "center" }}
                    >
                      Member's
                    </Typography>
                    <List
                      dense
                      key="2"
                      className={classes1.root}
                      style={{ backgroundColor: "aliceblue" }}
                    >
                      {project.promem.map((mem) => {
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
                                  project.promem
                                )}
                                style={{ backgroundColor: "aliceblue" }}
                              >
                                <ListItemIcon>
                                  {
                                    (props.mobileProjectMemberLoader.indexOf(mem.id) !== -1)?
                                    (
                                      <SelecterLoader />
                                    )
                                    :
                                    (
                                    <Checkbox
                                    edge="start"
                                    checked={
                                      checkedMember.indexOf(mem.id) !== -1 &&
                                      mem.selected
                                    }
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                      "aria-labelledby": labelIdMember,
                                    }}
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
                                    inputProps={{
                                      "aria-labelledby": labelIdMember,
                                    }}
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
                </AccordionDetails>
              ) : null}
            </Accordion>
          ))
        : null}
    </div>
  );
}
