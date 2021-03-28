import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// core components
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Loading from "../../../loading.js";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "../../css/CustomButtons/Button.js";
import GridItem from "../../css/Grid/GridItem.js";
import GridContainer from "../../css/Grid/GridContainer.js";
import Card from "../../css/Card/Card.js";
import CardHeader from "../../css/Card/CardHeader.js";
import CardBody from "../../css/Card/CardBody.js";
import CardFooter from "../../css/Card/CardFooter.js";
import axios from "axios";
import { primaryColor } from "../../as.js";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  padd: {
    paddingTop: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
    color: primaryColor,
  },

  input: {
    display: "none",
  },
  textarea: {
    height: "100%",
    padding: "10px",
    margin: "20px",
    width: "100%",
  },

  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
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

function DiarysUpdate(props) {
  const { title, text } = props.data;
  const classes = useStyles();
  return (
    <>
      <div className={classes.sectionDesktop}>
        <div className={classes.root}>
          {!props.data.loading ? (
            <>
              <CssBaseline />
              <form noValidate onSubmit={props.handleSubmit}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Diary</h4>
                        <p className={classes.cardCategoryWhite}>
                          Express your Feelings
                        </p>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={5}>
                            <TextField
                              className={classes.textarea}
                              name="title"
                              value={title}
                              label="Title"
                              onChange={props.handlecng}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <TextareaAutosize
                            rows={20}
                            className={classes.textarea}
                            rowsMax={50}
                            name="text"
                            value={text}
                            onChange={props.handlecng}
                          />
                        </GridContainer>
                      </CardBody>
                      <CardFooter>
                        <Button
                          color="primary"
                          type="submit"
                          style={{
                            margin: "0 15px 0 20px",
                            boxShadow:
                              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          href="/diarys"
                          color="primary"
                          variant="contained"
                          style={{
                            margin: "0 15px 0 20px",
                            background: "black",
                            color: "aliceblue",
                            boxShadow:
                              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                          }}
                        >
                          Cancel
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>
              </form>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className={classes.sectionMobile}>
        <div>
          {!props.data.loading ? (
            <>
              <CssBaseline />
              <form noValidate onSubmit={props.handleSubmit}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Diary</h4>
                        <p className={classes.cardCategoryWhite}>
                          Express your Feelings
                        </p>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={5}>
                            <TextField
                              className={classes.textarea}
                              name="title"
                              value={title}
                              label="Title"
                              onChange={props.handlecng}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <TextareaAutosize
                            rows={19}
                            className={classes.textarea}
                            rowsMax={50}
                            name="text"
                            value={text}
                            onChange={props.handlecng}
                          />
                        </GridContainer>
                      </CardBody>
                      <CardFooter>
                        <Button
                          color="primary"
                          type="submit"
                          style={{
                            margin: "0 15px 0 20px",
                            boxShadow:
                              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          href="/diarys"
                          color="primary"
                          variant="contained"
                          style={{
                            margin: "0 15px 0 20px",
                            background: "black",
                            color: "aliceblue",
                            boxShadow:
                              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                          }}
                        >
                          Cancel
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>
              </form>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}

class DiaryUpdate extends Component {
  state = {
    diary: {},
    title: "",
    text: "",
    loading: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("title", this.state.title);
    form_data.append("text", this.state.text);
    const diaryID = this.props.match.params.diaryID;
    const url_post = `https://${this.props.url}/diary/${diaryID}/`;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .put(url_post, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.setState({
          diary: res.data,
        });
        this.props.history.push("/diarys");
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      const diaryID = this.props.match.params.diaryID;
      axios.get(`https://${this.props.url}/diary/${diaryID}/`).then((res) => {
        this.setState({
          title: res.data.title,
          text: res.data.text,
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
      const diaryID = newProps.match.params.diaryID;
      axios.get(`https://${this.props.url}/diary/${diaryID}/`).then((res) => {
        this.setState({
          title: res.data.title,
          text: res.data.text,
          loading: false,
        });
      });
    }
  }

  handlecng = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <DiarysUpdate
          data={this.state}
          handleSubmit={this.handleSubmit}
          handlecng={this.handlecng}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(DiaryUpdate);
