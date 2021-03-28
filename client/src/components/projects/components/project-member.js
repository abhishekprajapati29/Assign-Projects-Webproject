import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "../../../loading.js";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 240,
    borderRadius: "12px",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

function Members(props) {
  const classes = useStyles();
  return (
    <Grid container>
      {!props.loading ? (
        props.member ? (
          props.member.map((data) => (
            <Grid item xs={12} sm={4} key={data.id}>
              <Card className={classes.root}>
                <CardActionArea style={{ textAlign: "center" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.profile.background_image}
                    title={data.profile.teamName}
                  />
                  <CardContent>
                    <div style={{ width: "fit-content", margin: "auto" }}>
                      <Avatar
                        style={{
                          marginTop: "-63px",
                          boxShadow:
                            "0px 0px 13px 5px rgba(246, 242, 242, 0.75)",
                        }}
                        alt="Remy Sharp"
                        src={data.image.image}
                        className={classes.large}
                      />
                    </div>

                    <Typography gutterBottom variant="h5" component="h2">
                      {data.username}
                    </Typography>
                    {data.profile.about_me !== "" ? (
                      <>
                        <hr />
                        <div style={{ display: "inline-flex" }}>
                          <i className="fas fa-quote-left" />
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            component="p"
                          >
                            {data.profile.about_me}
                          </Typography>
                          <i className="fas fa-quote-right" />
                        </div>
                      </>
                    ) : null}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : null
      ) : (
        <Loading />
      )}
    </Grid>
  );
}

class Member extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    const { token, member } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/userprofileList/`).then((res) => {
        var data1 = [];
        member.forEach((data) => {
          data1 = data1.concat(
            res.data.filter((filt) => {
              return filt.username === data.member;
            })
          );
        });
        this.setState({
          data: data1,
          loading: false,
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { member } = this.props;
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/userprofileList/`).then((res) => {
        var data1 = [];
        member.forEach((data) => {
          data1 = data1.concat(
            res.data.filter((filt) => {
              return filt.username === data.member;
            })
          );
        });
        this.setState({
          data: data1,
          loading: false,
        });
      });
    }
  }

  render() {
    return <Members member={this.state.data} loading={this.state.loading} />;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(Member);
