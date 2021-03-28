import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./profile.css";
import Menu from "@material-ui/core/Menu";
import Skeleton from "@material-ui/lab/Skeleton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearWithValueLabel from "../../progress.js";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, CardActionArea } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import Postcomment from "./postcomment.js";
import io from "socket.io-client";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    margin: theme.spacing(1),
    borderRadius: "10px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expand1: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#fdfbfd",
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
function Posts(props) {
  const classes = useStyles();
  const { posts, user_image } = props.data;

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handlepost(event) {
    props.handlepost(event);
    setOpen4(true);
  }

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    props.handleID(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open4, setOpen4] = React.useState(false);

  const handleClose4 = () => {
    setOpen4(false);
  };

  const isDisabled = () => {
    const content = props.data.post_content;
    const image = props.data.img;
    if (content || image) {
      return true;
    }
    return false;
  };

  let rows = [];
  for (let i = 0; i < 4; i++) {
    rows.push(
      <Card
        key={i}
        style={{ marginBottom: "32px", borderRadius: "10px" }}
        className="pagal21"
      >
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton animation="wave" variant="rect" className={classes.media} />

        <CardContent>
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardContent>
      </Card>
    );
  }

  function handleDelete() {
    handleClose3();
    props.handleDelete();
  }

  const [open3, setOpen3] = React.useState(false);

  function handleClickOpen3() {
    setOpen3(true);
    setAnchorEl(null);
  }

  function handleClose3() {
    setOpen3(false);
  }

  return (
    <>
      <Dialog
        open={open3}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose3}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to Delete todo{" "}
            <b style={{ fontSize: "18px" }}>
              {" "}
              {props.data.id.content ? <>{props.data.id.content}</> : null}{" "}
            </b>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleDelete()} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        key="write_post"
        className={classes.card}
        style={{ marginBottom: "32px" }}
      >
        <CardActionArea>
          <div className="textarea">
            <textarea
              placeholder="Write something.."
              name="post_content"
              value={props.data.post_content}
              onChange={(event) => props.handleCommentPost(event)}
              rows="6"
              className="textarea1"
            ></textarea>
          </div>
          <div>
            {props.data.img ? (
              <div style={{ maxWidth: "90px", maxHeight: "65px" }}>
                <a
                  href={URL.createObjectURL(props.data.img)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="..."
                    style={{ width: "64px", height: "64px" }}
                    src={URL.createObjectURL(props.data.img)}
                  />
                </a>
              </div>
            ) : null}
          </div>
        </CardActionArea>
        <CardActions
          disableSpacing
          style={{ padding: "10px", backgroundColor: "#d9dadf" }}
        >
          <IconButton aria-label="Image Upload">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="post-image"
              onChange={props.handleImageChange}
              type="file"
            />
            <label htmlFor="post-image">
              <img
                alt="images-upload"
                component="span"
                src="https://img.icons8.com/material/24/000000/image.png"
              />
            </label>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {isDisabled() ? (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => handlepost(event)}
              className={classes.expand1}
              style={{ backgroundColor: "#2e2e31" }}
            >
              POST
            </Button>
          ) : null}
        </CardActions>
      </Card>
      {!props.data.loading ? (
        <>
          {posts.slice(0, props.data.slice).map((data) => (
            <>
              <Card
                key={data.id}
                style={{ marginBottom: "32px", borderRadius: "10px" }}
                className="pagal21"
              >
                <CardHeader
                  avatar={
                    user_image.filter((res) => {
                      return res.user === data.user;
                    })[0] ? (
                      <Avatar
                        aria-label="recipe"
                        src={
                          user_image.filter((res) => {
                            return res.user === data.user;
                          })[0]["image"]
                        }
                        className={classes.avatar}
                      ></Avatar>
                    ) : (
                      <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                      ></Avatar>
                    )
                  }
                  action={
                    <>
                      <IconButton
                        aria-label="settings"
                        onClick={(event) => handleClick(event, data)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClickOpen3}>Delete</MenuItem>
                      </Menu>
                    </>
                  }
                  title={data.user}
                  subheader={new Date(data.timestamp).toString().slice(0, 24)}
                />
                {data.img !== null ? (
                  <CardMedia
                    className={classes.media}
                    image={data.img}
                    title="Paella dish"
                  />
                ) : (
                  <></>
                )}
                {data.content !== null ? (
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{
                        fontSize: "20px",
                        fontFamily: "cursive",
                        textTransform: "capitalize",
                      }}
                    >
                      {data.content}
                    </Typography>
                  </CardContent>
                ) : (
                  <></>
                )}
                <div style={{ textAlign: "left" }}>
                  <IconButton
                    aria-label="add to favorites"
                    style={{ borderRadius: "10px" }}
                  >
                    <FavoriteIcon /> Like
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    style={{ borderRadius: "10px" }}
                  >
                    <ShareIcon /> Share
                  </IconButton>
                </div>

                <CardActions disableSpacing>
                  <ExpansionPanel
                    style={{ backgroundColor: "#d9dadf", width: "100%" }}
                  >
                    <ExpansionPanelSummary
                      style={{ padding: "0 20px 0 10px" }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      label="comment"
                      id="panel1a-header"
                    >
                      Comments ({data.comment_count})
                    </ExpansionPanelSummary>
                    {data.post_comment.map((data1) => (
                      <Postcomment
                        key={data1.id}
                        data1={data1}
                        img={
                          user_image.filter((res) => {
                            return res.user === data1.commented_by;
                          })[0]
                        }
                      />
                    ))}
                    <Card
                      key="comment"
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        textAlign: "left",
                      }}
                    >
                      <CardHeader
                        avatar={
                          user_image.filter((res) => {
                            return res.user === posts[0].user;
                          })[0] ? (
                            <Avatar
                              aria-label="recipe"
                              src={
                                user_image.filter((res) => {
                                  return res.user === posts[0].user;
                                })[0]["image"]
                              }
                              style={{ marginBottom: "150px" }}
                              className={classes.avatar}
                            ></Avatar>
                          ) : (
                            <Avatar
                              aria-label="recipe"
                              style={{ marginBottom: "150px" }}
                              className={classes.avatar}
                            ></Avatar>
                          )
                        }
                        title={
                          <>
                            <div
                              className="textarea"
                              style={{ padding: 0, borderRadius: "10px" }}
                            >
                              <textarea
                                placeholder="Add a Comment"
                                name="comment"
                                value={props.data.comment}
                                rows="4"
                                onChange={props.handleCommentPost}
                                style={{ padding: "10px" }}
                                className="textarea1"
                              ></textarea>
                            </div>
                          </>
                        }
                        subheader={
                          <div style={{ marginTop: "5px" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={(event) =>
                                props.handlecomment(event, data.id, data.user)
                              }
                              style={{ backgroundColor: "#2e2e31" }}
                            >
                              Post Comment
                            </Button>
                          </div>
                        }
                      />
                    </Card>
                  </ExpansionPanel>
                </CardActions>
              </Card>
            </>
          ))}
        </>
      ) : (
        <>{rows}</>
      )}

      {props.data.posts.length > Number(4) ? (
        props.data.arrow ? (
          <IconButton
            aria-label="delete"
            size="large"
            style={{ color: "blue" }}
            onClick={() => props.handleSlice()}
          >
            <ArrowDownwardIcon fontSize="inherit" />
            See More
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete"
            size="large"
            style={{ color: "blue" }}
            onClick={() => props.handleArrow()}
          >
            <ArrowUpwardIcon fontSize="inherit" />
            See Less
          </IconButton>
        )
      ) : null}

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
                total={props.total}
                loaded={props.loaded}
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
    </>
  );
}

class Post extends React.Component {
  state = {
    posts: [],
    comment: "",
    img: null,
    post_content: "",
    user_image: [],
    user_image_chat: [],
    id: 0,
    loading: true,
    uploadPercentage: 0,
    total: 0,
    loaded: 0,
    slice: 4,
    noticount: 0,
    arrow: true,
  };

  handleSlice = () => {
    this.setState({
      slice: 100,
      arrow: false,
    });
  };

  handleArrow = () => {
    this.setState({
      slice: 4,
      arrow: true,
    });
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      var socket = io("https://live-data-manager.herokuapp.com");
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + this.props.token,
      };

      axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
        const prof = res.data[0];
        this.setState({
          name: prof.user,
          room: prof.teamName,
        });
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
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/post/`).then((res) => {
        this.setState({
          posts: res.data.reverse(),
        });
      });
      axios.get(`https://${this.props.url}/user_image`).then((res) => {
        this.setState({
          user_image: res.data,
          loading: false,
        });
      });
      axios.get(`https://${this.props.url}/notification/`).then((res) => {
        this.setState({
          noticount: res.data.reverse()[0],
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
      axios.get(`https://${this.props.url}/post/`).then((res) => {
        this.setState({
          posts: res.data.reverse(),
        });
      });
      axios.get(`https://${this.props.url}/user_image`).then((res) => {
        this.setState({
          user_image: res.data,
          loading: false,
        });
      });
      axios.get(`https://${this.props.url}/notification/`).then((res) => {
        this.setState({
          noticount: res.data.reverse()[0],
        });
      });
    }
  }

  handlecomment = (event, data, user) => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("comment_content", this.state.comment);
    form_data.append("commented_by", user);
    form_data.append("user", data);
    const url_post = `https://${this.props.url}/postcomment/`;
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
        this.setState({
          comment: "",
          loading: false,
        });
        this.handledata();
      })
      .catch((err) => console.log(err));
  };

  handleCommentPost = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleNotification = (event) => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
      const teamName = res.data[0];
      axios
        .get(
          `https://${this.props.url}/userprofileList/?profile__teamName=${teamName.teamName}`
        )
        .then((res) => {
          var data1 = res.data.filter((data) => {
            return data.username !== this.props.username;
          });
          data1.forEach((m) => {
            event.persist();
            let form_data = new FormData();
            form_data.append(
              "content",
              `${this.props.username} post a Post on Blog`
            );
            form_data.append("posted_by", this.props.username);
            form_data.append("user", m.id);
            const url_post = `https://${this.props.url}/notification/`;
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
                this.setState({
                  loading: false,
                });
              })
              .catch((err) => console.log(err));
          });
        });
    });
    var socket = io("https://live-data-manager.herokuapp.com");

    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };

    axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
      const prof = res.data[0];
      const name = prof.user;
      const room = prof.teamName;
      const message = {
        id: Number(-1),
        content: `${prof.user} post a Post on Blog`,
        posted_by: prof.user,
        user: Number(0),
      };
      const ENDPOINT = "https://live-data-manager.herokuapp.com/";
      socket = io(ENDPOINT);
      socket.emit("notificationSent", { name, room, message });
    });
  };

  handleImageChange = (event) => {
    this.setState({
      img: event.target.files[0],
    });
  };

  handlepost = (event) => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("content", this.state.post_content);
    form_data.append("posted_id", this.state.post_content);
    if (this.state.img !== null) {
      form_data.append("img", this.state.img);

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

      const url_post = `https://${this.props.url}/post/`;
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
          this.handleNotification(event);
          this.setState({
            post_content: "",
            img: null,
          });

          this.handledata(res.data);
          this.setState({ uploadPercentage: 100 }, () => {
            setTimeout(() => {
              this.setState({ uploadPercentage: 0 });
            }, 1000);
          });
        })
        .catch((err) => console.log(err));
    } else {
      const url_post = `https://${this.props.url}/post/`;
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
          this.handleNotification(event);
          this.setState({
            post_content: "",
            img: null,
          });

          this.handledata(res.data);
          this.setState({
            loading: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  handledata = (data) => {
    this.setState((previousState) => ({
      posts: [data, ...previousState.posts],
    }));
  };

  handleID = (data) => {
    this.setState({
      id: data,
    });
  };

  handleDelete = () => {
    this.setState({
      loading: true,
    });
    const postID = this.state.id.id;
    const data = [...this.state.posts];
    const removed = data.filter((post) => {
      return post.id !== postID;
    });
    axios.delete(`https://${this.props.url}/post/${postID}`);
    this.setState({
      posts: removed,
      loading: false,
    });
  };
  handlerequestCancel = () => {
    window.location.reload(false);
  };

  render() {
    return (
      <Posts
        data={this.state}
        handleArrow={this.handleArrow}
        token={this.props.token}
        handleSlice={this.handleSlice}
        url={this.props.url}
        handlerequestCancel={this.handlerequestCancel}
        total={this.state.total}
        loaded={this.state.loaded}
        uploadPercentage={this.state.uploadPercentage}
        handlecomment={this.handlecomment}
        handleID={this.handleID}
        handleDelete={this.handleDelete}
        handleCommentPost={this.handleCommentPost}
        handlepost={this.handlepost}
        handleImageChange={this.handleImageChange}
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

export default connect(mapStateToProps)(Post);
