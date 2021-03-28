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
import "../../../../profile/profile.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import Postcomment from "./postcomment.js";
import Skeleton from "@material-ui/lab/Skeleton";

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
  const { posts, user_image, current } = props.data;

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
  return (
    <>
      {!props.data.loading ? (
        <>
          {posts.map((data) => (
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
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
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
                            return res.user === current.username;
                          })[0] ? (
                            <Avatar
                              aria-label="recipe"
                              src={
                                user_image.filter((res) => {
                                  return res.user === current.username;
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
                                props.handlecomment(
                                  event,
                                  data.id,
                                  current.username
                                )
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
    current: {},
    loading: true,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      const user = this.props.user;
      axios
        .get(`https://${this.props.url}/postALL/?user=${user}`)
        .then((res) => {
          this.setState({
            posts: res.data,
          });
        });
      axios.get(`https://${this.props.url}/user_image`).then((res) => {
        this.setState({
          user_image: res.data,
        });
      });
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          current: res.data,
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
      const user = this.props.user;
      axios
        .get(`https://${this.props.url}/postALL/?user=${user}`)
        .then((res) => {
          this.setState({
            posts: res.data,
          });
        });
      axios.get(`https://${this.props.url}/user_image`).then((res) => {
        this.setState({
          user_image: res.data,
        });
      });
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        this.setState({
          current: res.data,
          loading: false,
        });
      });
    }
  }

  handlecomment = (event, data, user) => {
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
        });
        this.handledata(this.props.user);
      })
      .catch((err) => console.log(err));
  };

  handleCommentPost = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handledata = (user) => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios.get(`https://${this.props.url}/postALL/?user=${user}`).then((res) => {
      this.setState({
        posts: res.data,
      });
    });
  };

  handleImageChange = (event) => {
    this.setState({
      img: event.target.files[0],
    });
  };

  render() {
    return (
      <Posts
        current={this.state.current.id}
        loading={this.state.loading}
        data={this.state}
        handlecomment={this.handlecomment}
        handleCommentPost={this.handleCommentPost}
        handleImageChange={this.handleImageChange}
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

export default connect(mapStateToProps)(Post);
