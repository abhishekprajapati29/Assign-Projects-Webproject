import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// core components
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Fab } from "@material-ui/core";
import GridItem from "../../css/Grid/GridItem.js";
import GridContainer from "../../css/Grid/GridContainer.js";
import Card from "../../css/Card/Card.js";
import CardHeader from "../../css/Card/CardHeader.js";
import CardBody from "../../css/Card/CardBody.js";
import axios from "axios";
import { primaryColor } from "../../as.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Loading from "../../../loading.js";

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

function DiarysRead(props) {
  const { title, text } = props.data;
  const classes = useStyles();
  return (
    <>
      <div className={classes.sectionDesktop}>
        <div className={classes.root}>
          {!props.data.loading ? (
            <>
              <Fab
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
                <ArrowBackIcon />
              </Fab>
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
                          <GridItem xs={12}>
                            <div
                              style={{
                                textAlign: "center",
                                fontWeight: 700,
                                fontSize: "30px",
                                textTransform: "capitalize",
                              }}
                            >
                              {title}
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer style={{ minHeight: "475px" }}>
                          <TextareaAutosize
                            rows={30}
                            className={classes.textarea}
                            rowsMax={50}
                            disabled
                            name="text"
                            value={text}
                            onChange={props.handlecng}
                          />
                        </GridContainer>
                      </CardBody>
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
              <Fab
                href="/diarys"
                color="primary"
                variant="contained"
                style={{
                  padding: "5px ",
                  marginLeft: "10px",
                  background: "black",
                  color: "aliceblue",
                  boxShadow:
                    "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
                }}
              >
                <ArrowBackIcon />
              </Fab>
              <CssBaseline />
              <form noValidate onSubmit={props.handleSubmit}>
                <GridContainer style={{ minHeight: "475px" }}>
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
                          <GridItem xs={12}>
                            <div
                              style={{
                                textAlign: "center",
                                fontWeight: 700,
                                fontSize: "30px",
                                textTransform: "capitalize",
                              }}
                            >
                              {title}
                            </div>
                          </GridItem>
                        </GridContainer>
                        <GridContainer style={{ minHeight: "475px" }}>
                          <TextareaAutosize
                            rows={30}
                            className={classes.textarea}
                            rowsMax={50}
                            disabled
                            name="text"
                            value={text}
                            onChange={props.handlecng}
                          />
                        </GridContainer>
                      </CardBody>
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

class DiaryRead extends Component {
  state = {
    diary: {},
    loading: true,
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

  render() {
    return (
      <div>
        <DiarysRead data={this.state} />
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

export default connect(mapStateToProps)(DiaryRead);
