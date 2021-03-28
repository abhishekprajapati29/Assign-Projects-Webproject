import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// core components
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import TextField from "@material-ui/core/TextField";
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
}));

function CreatesDiary(props) {
  const { title, text } = props.data;
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
                  <GridItem xs={12} sm={12} md={12}>
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
                <Button color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}

class CreateDiary extends Component {
  state = {
    diarydata: {},
    title: "",
    text: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("title", this.state.title);
    form_data.append("text", this.state.text);
    const url_post = `https://${this.props.url}/diary/`;
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
          diarydata: res.data,
        });
        this.props.history.push("/diarys");
      })
      .catch((err) => console.log(err));
  };

  handlecng = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <CreatesDiary
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

export default connect(mapStateToProps)(CreateDiary);
