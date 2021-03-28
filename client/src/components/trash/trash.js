import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import CardHeader from "../css/Card/CardHeader";
import Card from "../css/Card/Card";
import { blue } from "@material-ui/core/colors";
import Loading from '../../loading'
import {
  CardContent,
  CardActionArea,
  CardMedia,
  Divider,
  Typography,
  Button
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
    paddingTop: '10px'
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    textAlign: 'center'
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: blue,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  card: {
    width: "120px",
    marginRight: "15px",
  },
  media: {
    height: "120px",
  },
  heart: {
    marginLeft: "4px",
  },
}));

function Trashs(props){
  const { className } = props;
  const classes = useStyles();
  return (
    <div style={{padding: '25px'}}>
      <div style={{width: '100%', textAlign: 'right'}}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        href={`https://paytm-app.herokuapp.com/paywithpaytm?amount=30&name=${props.username}&token=${props.token}`}
        startIcon={<img alt="select" src="https://img.icons8.com/material/24/000000/checked--v1.png"/>}
      >
        Selecter Buy
      </Button>
      </div>
      {
        (props.album_data.length>0)?
        (
          <Card
      className={clsx(classes.root, className)}
      style={{
        boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
      }}
    >
      <form>
        <CardHeader
          color="info"
          style={{
            boxShadow:
              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
          }}
        >
          <h4 className={classes.cardTitleWhite}>Album</h4>
          <p className={classes.cardCategoryWhite}>Images</p>
        </CardHeader>
        <CardContent style={{display: 'flex'}}>
          
          {
            (props.album_data)?
            (
              props.album_data.map(data=>(
                <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={data.image}
                              title={data.title}
                            />
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.title.slice(0, 30)}...
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                    </Card>
              ))
            ):(null)
          }
        </CardContent>
        <Divider />
      </form>
    </Card>
        ):null
      }
    {
      (props.file_data.length>0)?
      (
        <Card
      className={clsx(classes.root, className)}
      style={{
        boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
      }}
    >
      <form>
        <CardHeader
          color="success"
          style={{
            boxShadow:
              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
          }}
        >
          <h4 className={classes.cardTitleWhite}>PDF</h4>
          <p className={classes.cardCategoryWhite}>FILES</p>
        </CardHeader>
        <CardContent style={{display: 'flex'}}>
          
          {
            (props.file_data)?
            (
              props.file_data.map(data=>(
                <Card className={classes.card}>
                        <CardActionArea>
                          {data.type === "application/pdf" ? (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/pdf-2--v1.png"
                              title={data.title}
                            />
                          ) : data.type === "application/x-ms-dos-executable" ||
                            data.type === "application/x-msdownload" ? (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/exe.png"
                              title={data.title}
                            />
                          ) : data.type === "application/x-zip-compressed" ? (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/zip.png"
                              title={data.title}
                            />
                          ) : (
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/file--v1.png"
                              title={data.title}
                            />
                          )}
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.title.slice(0, 30)}...
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                    </Card>
              ))
            ):(null)
          }
        </CardContent>
        <Divider />
      </form>
    </Card>
      ):null
    }
    {
      props.video_data.length>0?
      (
        <Card
      className={clsx(classes.root, className)}
      style={{
        boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
      }}
    >
      <form>
        <CardHeader
          color="danger"
          style={{
            boxShadow:
              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
          }}
        >
          <h4 className={classes.cardTitleWhite}>Videos</h4>
          <p className={classes.cardCategoryWhite}>Memories</p>
        </CardHeader>
        <CardContent style={{display: 'flex'}}>
          
          {
            (props.video_data)?
            (
              props.video_data.map(data=>(
                <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/vlc.png"
                              title={data.title}
                            />
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.title.slice(0, 30)}...
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                    </Card>
              ))
            ):(null)
          }
        </CardContent>
        <Divider />
      </form>
    </Card>
      ):null
    }
    {
      (props.project_data.length>0)?
      (
        <Card
      className={clsx(classes.root, className)}
      style={{
        boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
      }}
    >
      <form>
        <CardHeader
          color="warning"
          style={{
            boxShadow:
              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
          }}
        >
          <h4 className={classes.cardTitleWhite}>Project's</h4>
          <p className={classes.cardCategoryWhite}>Content's</p>
        </CardHeader>
        <CardContent style={{display: 'flex'}}>
          
          {
            (props.project_data)?
            (
              props.project_data.map(data=>(
                <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="https://img.icons8.com/material/100/000000/project.png"
                              title={data.project_name}
                            />
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.project_name.slice(0, 30)}...
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                    </Card>
              ))
            ):(null)
          }
        </CardContent>
        <Divider />
      </form>
    </Card>
      ):null
    }
    
    
    </div>
  )

}


class Trash extends Component{
  state={
    album_data: [],
    file_data: [],
    video_data: [],
    project_data: [],
    loading: false
  }

  componentDidMount(){
    const {token, url} = this.props;
    this.setState({
      loading: true
    })
    if(token){
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      axios.get(`https://${url}/imagesall/`).then(res=>{
        this.setState({
          album_data: res.data.filter(fil=>{return fil.selected === false})
        })
      })
      axios.get(`https://${url}/fileall/`).then(res=>{
        this.setState({
          file_data: res.data.filter(fil=>{return fil.selected === false})
        })
      })
      axios.get(`https://${url}/videoall/`).then(res=>{
        this.setState({
          video_data: res.data.filter(fil=>{return fil.selected === false})
        })
      })
      axios.get(`https://${url}/create-all/`).then(res=>{
        this.setState({
          project_data: res.data.filter(fil=>{return fil.selected === false})
        })
        
      })
      this.setState({
        loading: false
      })
    }
  }
  
  UNSAFE_componentWillReceiveProps(newProps){
    
    if(newProps.token){
      this.setState({
        loading: true
      })
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      axios.get(`https://${this.props.url}/imagesall/`).then(res=>{
        this.setState({
          album_data: res.data.filter(fil=>{return fil.selected === false})
        })
      })
      axios.get(`https://${this.props.url}/fileall/`).then(res=>{
        this.setState({
          file_data: res.data.filter(fil=>{return fil.selected === false})
        })
      })
      axios.get(`https://${this.props.url}/videoall/`).then(res=>{
        this.setState({
          video_data: res.data.filter(fil=>{return fil.selected === false})
        })
      })
      axios.get(`https://${this.props.url}/create-all/`).then(res=>{
        this.setState({
          project_data: res.data.filter(fil=>{return fil.selected === false})
        })
      })
      this.setState({
        loading: false
      })
    }
  }

  render(){
    return(
      <>
        {
          (!this.state.loading)?
          (
            <Trashs username={this.props.username} token={this.props.token} loading={this.state.loading} album_data={this.state.album_data} file_data={this.state.file_data} video_data={this.state.video_data} project_data={this.state.project_data} />
          ):<Loading  />
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(Trash);