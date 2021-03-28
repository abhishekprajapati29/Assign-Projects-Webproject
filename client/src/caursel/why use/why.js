import React, { Component } from 'react'
import img1 from './images/1.png'
import img2 from './images/2.png'
import img3 from './images/3.png'
import img4 from './images/4.png'
import img5 from './images/5.png'
import img6 from './images/6.png'
import img7 from './images/7.png'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
// core components
import TextField from "@material-ui/core/TextField";
import Button from "../../components/css/CustomButtons/Button"
import CircularProgress from '@material-ui/core/CircularProgress';
import {  blue } from '@material-ui/core/colors';
import Card from "../../components/css/Card/Card.js";
import CardHeader from "../../components/css/Card/CardHeader.js";
import CardBody from "../../components/css/Card/CardBody.js";
import CardFooter from "../../components/css/Card/CardFooter.js";
import { primaryColor } from '../../components/as.js';
import axios from 'axios';


const useStyles = makeStyles(theme =>({
    root: {
        padding: theme.spacing(5)
    },
    root1: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    padd: {
      paddingTop: theme.spacing(4)
    },
    button: {
      margin: theme.spacing(1),
      color: primaryColor
    },
    create: {
      display: 'none',
      margin: theme.spacing(3),
      color: primaryColor
    },

    input: {
      display: 'none',
    },

  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: blue,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


function WhyUse(props){

  const isSubmitEnabled = () => {
    if (props.data.username && props.data.email && props.data.subject && props.data.message) {
      return true;
    }
    return false;
  };
    const classes = useStyles();
    return(
        <>
        <Paper style={{marginTop: '64px', boxShadow: 'none' }}>
            <div style={{width: '95%'}}>
                <img style={{width: '100%', margin: '0 2.5%', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'}} alt='img1' src={img1} />
            </div>
            <div style={{width: '95%'}}>
            <img style={{width: '100%', margin: '0 2.5%', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'}} alt='img1' src={img2} />

            </div>
            <div style={{width: '95%'}}>
            <img style={{width: '100%', margin: '0 2.5%', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'}} alt='img1' src={img3} />

            </div>
            <div style={{width: '95%'}}>
            <img style={{width: '100%', margin: '0 2.5%', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'}} alt='img1' src={img4} />

            </div>
            <div style={{width: '95%'}}>
            <img style={{width: '100%', margin: '0 2.5%', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'}} alt='img1' src={img5} />

            </div>
            <div style={{width: '95%'}}>
            <img style={{width: '100%', margin: '0 2.5%', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'}} alt='img1' src={img6} />

            </div>
            <div style={{width: '95%'}}>
            <img style={{width: '100%', margin: '0 2.5%', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.6) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px'}} alt='img1' src={img7} />

            </div>

        </Paper>
        <Paper>
            <>
        {
            (props.data.success)?
            (
                <div className={classes.root1} style={{marginTop: '20px'}}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>Message Sent.</strong>
                    </Alert>
                    </div>
            ):
            (null)
        }
        <Card style={{boxShadow: '0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)'}} >
                  <CardHeader color="primary" style={{boxShadow: '0 4px 20px 0 #64b5f6, 0 7px 10px -5px rgba(244, 67, 54,.4)', textAlignLast: 'center'}} >
                    <h4 className={classes.cardTitleWhite}>Send Message</h4>
                    <p className={classes.cardCategoryWhite}>Tell and Ask any Query.</p>
                  </CardHeader>
                  <br/>
                  {props.data.error && <div style={{color: 'red'}}> {props.data.error}</div>}
                  <CardBody style={{fontSize: '50px', margin: '10px', padding: '0 100px'}}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      value={props.data.username}
                        name="username"
                        autoFocus
                        required
                        fullWidth
                        
                        label="Name"
                        onChange={(event)=>props.handlecng(event)}
                      />
                      <TextField
                      variant="outlined"
                      margin="normal"
                      value={props.data.email}
                        name="email"
                        type='email'
                        required
                        fullWidth
                        id="emial"
                        
                        label="Email"
                        
                        onChange={(event)=>props.handlecng(event)}
                      />
                      <TextField
                      variant="outlined"
                      margin="normal"
                      value={props.data.subject}
                        name="subject"
                        
                        required
                        fullWidth
                        
                        label="Subject"
                        
                        onChange={(event)=>props.handlecng(event)}
                      />
                        
                        <TextField
                        variant="outlined"
                        margin="normal"
                        value={props.data.message}
                        name="message"
                        
                        required
                        fullWidth
                        multiline
                        rows={8}
                        label="Message"
                        
                        onChange={(event)=>props.handlecng(event)}
                      />
                  </CardBody>
                  <CardFooter>
                    <div className={classes.wrapper} style={{marginLeft: '92px'}}>
                        <Button disabled={!isSubmitEnabled()} onClick={(event)=>props.createData(event)} style={{ boxShadow: '0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)'}} color="primary" type='submit' >submit</Button>
                      {props.data.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                  </CardFooter>
                </Card>
                </>
        </Paper>
        </>
    )
}


class Why extends Component{
    state={
        email: '',
        username: '',
        subject: '',
        message: '',
        success: false,
        error: ''

    }

    handlecng=(event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    createData= (event)=>{
        event.preventDefault();
        this.setState({
          loading: true
        })
        const headers = {
             'Content-Type': 'multipart/form-data',
             'Access-Control-Allow-Origin': '*',
          };
        let form_data = new FormData();
        form_data.append("email", this.state.email);
        form_data.append("username", this.state.username);
        form_data.append("subject", this.state.subject);
        form_data.append("message", this.state.message);
        axios.post('https://contact-us-mail.herokuapp.com/api/form',form_data, {headers}).then(res1=>{
            console.log(res1.data)
          this.setState({
            email: '',
            username: '',
            subject: '',
            message: '',
            success: true,
            loading: false
          })
          setTimeout(() => {
              this.setState({
                success: false
              })
          }, 3000);
        })
    }

    render(){
        console.log(this.state)
        return(
            <WhyUse data={this.state} handlecng={this.handlecng}  createData={this.createData}/>
        )
    }
}

export default Why;