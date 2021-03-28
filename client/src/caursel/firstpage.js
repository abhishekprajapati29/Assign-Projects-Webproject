import React, { Component } from "react";
import Carousel from "./Carousel";
import "./style.css";
import upload from "./images/Untitled design.png";
import album from "./images/album.png";
import post from "./images/post.png";
import project from './images/PROJECT.png'
import { Typography, Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import logo from "../Asset 2.png";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',

  },
  paper: {
      backgroundColor: '#1b1e26',
    height: 200,
    width: 209,
  },
  control: {
    padding: 30,
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

const Page = (props) => {
  const [spacing] = React.useState(4);
  const classes = useStyles();
  return (
    <div style={{ height: "300px" , marginTop: '-64px'}}>
      <Carousel />
      <img style={{ width: "100%", height: "auto", boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px' }} src={upload} alt="img" />
      <img style={{ width: "100%", height: "auto", boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px' }} src={post} alt="img" />
      <img style={{ width: "100%", height: "auto", boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px' }} src={project} alt="img" />
      <img style={{ width: "100%", height: "auto", boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px' }} src={album} alt="img" />
      
      
      <div
        className={classes.sectionDesktop}
        style={{
          minHeight: "300px",
          backgroundColor: "#1b1e26",
          paddingTop: "40px",
          boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'
        }}
      >
        <div style={{width: '100%'}}>
          <Grid container className={classes.root} spacing={5}>
            <Grid item xs={12} sm={8}>
              <Grid container justify="center" spacing={spacing}>
                <Grid item style={{padding: '30px', textAlignLast: 'center'}}>
                  <Paper className={classes.paper} style={{boxShadow: 'none'}}>
                      <Typography style={{color: '#f2734c', fontSize: '24px'}}>About us</Typography>
                      <br/>
                      <a href="/why" style={{ textDecoration: "none" , color: 'white'}}><Typography >Why CPM</Typography></a>
                      <a href="/creator" style={{ textDecoration: "none", color: 'white' }}><Typography >Creator</Typography></a>
                      {/* <a href="/terms" style={{ textDecoration: "none" }}><Typography >Reviews</Typography></a> */}
                  </Paper>
                </Grid>
                <Grid item style={{padding: '30px', textAlignLast: 'center'}}>
                  <Paper className={classes.paper} style={{boxShadow: 'none'}}>
                  <Typography style={{color: '#f2734c', fontSize: '24px'}}>Services</Typography>
                      <br/>
                      <Typography style={{color: 'white'}}>Notes</Typography>
                      <Typography style={{color: 'white'}}>Diary</Typography>
                      <Typography style={{color: 'white'}}>Team</Typography>
                      <Typography style={{color: 'white'}}>Cloud Storage</Typography>
                      
                      <Typography style={{color: 'white'}}>Chat Communication</Typography>
                      <Typography style={{color: 'white'}}>Project's</Typography>
                      
                  </Paper>
                </Grid>
                <Grid item style={{padding: '30px', textAlignLast: 'center'}}>
                  <Paper className={classes.paper} style={{boxShadow: 'none'}}>
                  <Typography style={{color: '#f2734c', fontSize: '24px'}}>Project facilitie's</Typography>
                      <br/>
                      <Typography style={{color: 'white'}}>Overview</Typography>
                      <Typography style={{color: 'white'}}>Task Assigning</Typography>
                      <Typography style={{color: 'white'}}>Report</Typography>
                      <Typography style={{color: 'white'}}>Bug's Assign</Typography>
                      <Typography style={{color: 'white'}}>Upload File's</Typography>
                      <Typography style={{color: 'white'}}>Monitor Activity's</Typography>
                  </Paper>
                </Grid>
                <Grid item style={{padding: '30px', textAlignLast: 'center'}}>
                  <Paper className={classes.paper} style={{boxShadow: 'none'}}>
                  <Typography style={{color: '#f2734c', fontSize: '24px'}}>Contact us</Typography>
                      <br/>
                      <Typography style={{color: 'white'}}>teamcloudmanager@gmial.com</Typography>
                      <Typography style={{color: 'white'}}>123456789</Typography>
                      {/* <a href="/terms" style={{ textDecoration: "none" }}><Typography >Reviews</Typography></a> */}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4} style={{width: '100%'}}>
              <Grid container justify="center" spacing={spacing} style={{width: '100%'}}>
                <Grid item >
                  <div style={{ textAlignLast: "center", width: '100%' }}>
                    <img
                      alt="s"
                      src={logo}
                      style={{ height: "240px", width: "290px", marginTop: '-5px' }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div
        className={classes.sectionDesktop}
        style={{
          minHeight: "100px",
          backgroundColor: "#14161c",
          padding: "26px 90px",
        }}
      >
        <Grid container className={classes.root}>
          <Grid item xs={4}>
            <Typography style={{ color: "white" }}>
              Copyright 2020 - dummy Pvt. Ltd.
            </Typography>
            <a href="/policy">
              <Typography
                style={{ color: "white", float: "left", marginRight: "10px" }}
              >
                Policy{" "}
              </Typography>
            </a>
            <a href="/terms" style={{ textDecoration: "none" }}>
              <Typography style={{ color: "white" }}>
                {" "}
                | Terms of Service
              </Typography>
            </a>
          </Grid>
          <Grid item xs={8} style={{ textAlign: "end", marginTop: "-11px" }}>
            <IconButton aria-label="facebook" className={classes.margin}>
              <img alt="facebook" src="https://img.icons8.com/color/48/000000/facebook-new.png" />
            </IconButton>
            <IconButton aria-label="twitter" className={classes.margin}>
              <img alt="twitter" src="https://img.icons8.com/color/48/000000/twitter-circled.png" />
            </IconButton>
            <IconButton aria-label="insta" className={classes.margin}>
              <img alt="insta" src="https://img.icons8.com/color/48/000000/instagram-new.png" />
            </IconButton>
            <IconButton aria-label="github" className={classes.margin}>
              <img alt="github" src="https://img.icons8.com/color/48/000000/github.png" />
            </IconButton>
            <IconButton aria-label="linkedin" className={classes.margin}>
              <img alt="linkedin" src="https://img.icons8.com/color/48/000000/linkedin.png" />
            </IconButton>
          </Grid>
        </Grid>
      </div>




      <div
        className={classes.sectionMobile}
        style={{
          minHeight: "300px",
          backgroundColor: "#1b1e26",
          paddingTop: "40px",
          width: '100%',
          boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'
        }}
      ><Paper style={{width: '100%', padding: '20px', backgroundColor: '#1b1e26'}}>
        <Grid container >
          <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{boxShadow: 'none', textAlign: 'center', width:'100%'}}>
                      <Typography style={{color: '#f2734c', fontSize: '24px'}}>About us</Typography>
                      <br/>
                      <a href="/why" style={{ textDecoration: "none" , color: 'white'}}><Typography >Why CPM</Typography></a>
                      <a href="/creator" style={{ textDecoration: "none", color: 'white' }}><Typography >Creator</Typography></a>
                  </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{boxShadow: 'none', textAlign: 'center', width:'100%'}}>
                  <Typography style={{color: '#f2734c', fontSize: '24px'}}>Services</Typography>
                      <br/>
                      <Typography style={{color: 'white'}}>Notes</Typography>
                      <Typography style={{color: 'white'}}>Diary</Typography>
                      <Typography style={{color: 'white'}}>Team</Typography>
                      <Typography style={{color: 'white'}}>Cloud Storage</Typography>
                      
                      <Typography style={{color: 'white'}}>Chat Communication</Typography>
                      <Typography style={{color: 'white'}}>Project's</Typography>
                      
                  </Paper>
          </Grid>
        </Grid>
        <br/>
        <Grid container >
          <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{boxShadow: 'none', textAlign: 'center', width:'100%'}}>
          <Typography style={{color: '#f2734c', fontSize: '24px'}}>Project facilitie's</Typography>
                      <br/>
                      <Typography style={{color: 'white'}}>Overview</Typography>
                      <Typography style={{color: 'white'}}>Task Assigning</Typography>
                      <Typography style={{color: 'white'}}>Report</Typography>
                      <Typography style={{color: 'white'}}>Bug's Assign</Typography>
                      <Typography style={{color: 'white'}}>Upload File's</Typography>
                      <Typography style={{color: 'white'}}>Monitor Activity's</Typography>
                  </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{boxShadow: 'none',padding: '20px', textAlign: 'center', width:'100%'}}>
          <Typography style={{color: '#f2734c', fontSize: '24px'}}>Contact us</Typography>
                      <br/>
                      <Typography style={{color: 'white'}}>teamcloudmanager@gmial.com</Typography>
                      <Typography style={{color: 'white'}}>123456789</Typography>
                  </Paper>
          </Grid>
        </Grid>
        <div style={{width: '100%', textAlignLast: 'center'}}>
        <img
                      alt="s"
                      src={logo}
                      style={{ height: "150px", width: "150px", marginTop: '-5px' }}
                    />
        </div>
        </Paper>
        
      </div>
      <div
        className={classes.sectionMobile}
        style={{
          minHeight: "100px",
          backgroundColor: "#14161c",
          padding: "26px 0",
        }}
      >
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div style={{textAlign: 'center'}}>
            <Typography style={{ color: "white" }}>
              Copyright 2020 - dummy Pvt. Ltd.
            </Typography>
            </div>
            <div style={{width:'100%', textAlign: 'center'}}>
            <div >
            <a href="/policy" >
              <Typography
                style={{ color: "white", marginRight: "10px" }}
              >
                Policy
              </Typography>
            </a>
            <a href="/terms" style={{ textDecoration: "none" }}>
              <Typography style={{ color: "white" }}>
                
                Terms of Service
              </Typography>
            </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
            <IconButton  aria-label="facebook" className={classes.margin}>
              <img alt="facebook" src="https://img.icons8.com/color/48/000000/facebook-new.png" />
            </IconButton>
            <IconButton aria-label="twitter" className={classes.margin}>
              <img alt="twitter" src="https://img.icons8.com/color/48/000000/twitter-circled.png" />
            </IconButton>
            <IconButton aria-label="insta" className={classes.margin}>
              <img alt="insta" src="https://img.icons8.com/color/48/000000/instagram-new.png" />
            </IconButton>
            <IconButton aria-label="github" className={classes.margin}>
              <img alt="github" src="https://img.icons8.com/color/48/000000/github.png" />
            </IconButton>
            <IconButton aria-label="linkedin" className={classes.margin}>
              <img alt="linkedin" src="https://img.icons8.com/color/48/000000/linkedin.png" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

class FirstPage extends Component {
  state = {};

  render() {
    return <Page />;
  }
}

export default FirstPage;
