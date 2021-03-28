import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "../../../../css/Card/CardHeader";
import Card from "../../../../css/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import "../../../../profile/profile.css";
import { connect } from "react-redux";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transform: "translateZ(0)",
  },
  titleBar: {
    backgroundColor: "transparent",
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
    fontWeight: "700",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "30px",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "700",
    fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
    display: "block",
    marginBlockStart: "1em",
    marginBlockEnd: "0.5em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  },
  content: {
    fontSize: "1.4rem",
    fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
    fontWeight: "400",
    marginBlockStart: "1em",
    marginBlockEnd: "0.5em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  },
  heading1: {
    color: "black",
    fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
    fontWeight: 700,
  },
  content1: {
    fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
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

function FileAdds(props) {
  const classes = useStyles();
  const { profile } = props.data;

  return profile ? (
    <>
      {profile.gender ||
      profile.birthdate ||
      profile.location ||
      profile.about_me ? (
        <Card
          style={{
            textTransform: "capitalize",
            backgroundColor: "#f0f0f5",
            marginBottom: "72px",
          }}
        >
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>General Informantion</h4>
          </CardHeader>
          <CardContent style={{ textAlign: "center" }} class="pagal21">
            <>
              <div className={classes.sectionDesktop}>
                <div
                  style={{
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {profile.gender ? (
                    <div>
                      <p className={classes.heading}>Gender</p>
                      <p className={classes.content}>{profile.gender}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.birthdate ? (
                    <div>
                      <p className={classes.heading}>Birthday</p>
                      <p className={classes.content}>{profile.birthdate}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.location ? (
                    <div>
                      <p className={classes.heading}>Location</p>
                      <p className={classes.content}>{profile.location}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.about_me ? (
                    <div>
                      <p className={classes.heading}>About Me</p>
                      <p className={classes.content}>{profile.about_me}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                </div>
              </div>
              <div className={classes.sectionMobile}>
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {profile.gender ? (
                    <div>
                      <p className={classes.heading1}>Gender</p>
                      <p className={classes.content1}>{profile.gender}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.birthdate ? (
                    <div>
                      <p className={classes.heading1}>Birthday</p>
                      <p className={classes.content1}>{profile.birthdate}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.location ? (
                    <div>
                      <p className={classes.heading1}>Location</p>
                      <p className={classes.content1}>{profile.location}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.about_me ? (
                    <div>
                      <p className={classes.heading1}>About Me</p>
                      <p className={classes.content1}>{profile.about_me}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                </div>
              </div>
            </>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
      {profile.occupation || profile.skills || profile.jobs ? (
        <Card
          style={{
            textTransform: "capitalize",
            backgroundColor: "#f0f0f5",
            marginBottom: "72px",
          }}
        >
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Work</h4>
          </CardHeader>
          <CardContent style={{ textAlign: "center" }} class="pagal21">
            <>
              <div className={classes.sectionDesktop}>
                <div
                  style={{
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {profile.occupation ? (
                    <div>
                      <p className={classes.heading}>Occupation</p>
                      <p className={classes.content}>{profile.occupation}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.skills ? (
                    <div>
                      <p className={classes.heading}>Skills</p>
                      <p className={classes.content}>{profile.skills}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.jobs ? (
                    <div>
                      <p className={classes.heading}>Jobs</p>
                      <p className={classes.content}>{profile.jobs}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                </div>
              </div>
              <div className={classes.sectionMobile}>
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {profile.occupation ? (
                    <div>
                      <p className={classes.heading1}>Occupation</p>
                      <p className={classes.content1}>{profile.occupation}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.skills ? (
                    <div>
                      <p className={classes.heading1}>Skills</p>
                      <p className={classes.content1}>{profile.skills}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.jobs ? (
                    <div>
                      <p className={classes.heading1}>Jobs</p>
                      <p className={classes.content1}>{profile.jobs}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                </div>
              </div>
            </>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
      {profile.address || profile.phone_number || profile.email ? (
        <Card
          style={{ textTransform: "capitalize", backgroundColor: "#f0f0f5" }}
        >
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Conatct</h4>
          </CardHeader>
          <CardContent style={{ textAlign: "center" }} class="pagal21">
            <>
              <div className={classes.sectionDesktop}>
                <div
                  style={{
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {profile.address ? (
                    <div>
                      <p className={classes.heading}>Address</p>
                      <p className={classes.content}>{profile.address}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.phone_number ? (
                    <div>
                      <p className={classes.heading}>Mobile No.</p>
                      <p className={classes.content}>{profile.phone_number}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.email ? (
                    <div>
                      <p className={classes.heading}>Email</p>
                      <p className={classes.content}>{profile.email}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                </div>
              </div>
              <div className={classes.sectionMobile}>
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingBottom: "16px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {profile.address ? (
                    <div>
                      <p className={classes.heading1}>Address</p>
                      <p className={classes.content1}>{profile.address}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.phone_number ? (
                    <div>
                      <p className={classes.heading1}>Mobile No.</p>
                      <p className={classes.content1}>{profile.phone_number}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                  {profile.email ? (
                    <div>
                      <p className={classes.heading1}>Email</p>
                      <p className={classes.content1}>{profile.email}</p>
                    </div>
                  ) : (
                    <>{props.loading ? <Skeleton animation="wave" /> : null}</>
                  )}
                </div>
              </div>
            </>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
}

class FileAdd extends Component {
  state = {
    data: {},
    loading: false,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios
        .get(`https://${this.props.url}/userprofileList/?id=${this.props.user}`)
        .then((res) => {
          this.setState({
            data: res.data[0],
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
      axios
        .get(`https://${this.props.url}/userprofileList/?id=${this.props.user}`)
        .then((res) => {
          this.setState({
            data: res.data[0],
            loading: false,
          });
        });
    }
  }

  render() {
    return <FileAdds data={this.state.data} loading={this.state.loading} />;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(FileAdd);
