import React, { Component } from "react";
import Gallery from "react-grid-gallery";
import { connect } from "react-redux";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
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

function Photos(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.sectionDesktop}>
        {!props.loading ? (
          <Gallery
            images={props.data}
            enableLightbox={true}
            enableImageSelection={false}
            currentImageWillChange={props.onCurrentImageChange}
          />
        ) : (
          <>
            <Grid container wrap="nowrap">
              {Array.from(new Array(3)).map((item, index) => (
                <>
                  <Box key={index} width={331} marginRight={0.5} my={5}>
                    <Skeleton variant="rect" width={331} height={180} />
                  </Box>
                </>
              ))}
            </Grid>
          </>
        )}
      </div>
      <div className={classes.sectionMobile}>
        {!props.loading ? (
          <Gallery
            images={props.data}
            enableLightbox={true}
            enableImageSelection={false}
            currentImageWillChange={props.onCurrentImageChange}
          />
        ) : (
          <>
            <Grid container>
              {Array.from(new Array(2)).map((item, index) => (
                <>
                  <Box key={index} my={5}>
                    <Skeleton variant="rect" width="100px" height="100px" />
                  </Box>
                </>
              ))}
            </Grid>
          </>
        )}
      </div>
    </>
  );
}

class Photo extends Component {
  state = {
    photos: [],
    loading: true,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        const user = res.data.username;
        axios.get(`https://${this.props.url}/imagelist/`).then((res) => {
          this.setState({
            photos: res.data.filter((res1) => {
              return res1.user === user;
            }),
            loading: false,
          });
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
      axios.get(`https://${this.props.url}/api/auth/user`).then((res) => {
        const user = res.data.username;
        axios.get(`https://${this.props.url}/imagelist/`).then((res) => {
          this.setState({
            photos: res.data.filter((res1) => {
              return res1.user === user;
            }),
            loading: false,
          });
        });
      });
    }
  }

  render() {
    return <Photos data={this.state.photos} loading={this.state.loading} />;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(Photo);
