import React, { Component } from 'react'
import { connect } from 'react-redux';
import { makeStyles, useTheme  } from '@material-ui/styles';
import img from '../components/road_marking_cloudy_124093_1600x1200.jpg'
import '../../profile/profile.css'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "../../css/CustomButtons/Button"
import Typography from '@material-ui/core/Typography';
import GridItem from '../../css/Grid/GridItem';
import GridContainer from '../../css/Grid/GridContainer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles(() => ({
    root: {
      boxShadow: '0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)'
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
    title:{
      fontSize: '20px',
      fontFamily: 'initial',
      padding: '25px'
    },
  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

function Plans(props){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeIndex = index => {
      setValue(index);
    };
    

    return(
      <>
        <div key="container" className='container' style={{padding: '0' , marginTop: '-10px'}}>
        <div key="2" className='images' style={{backgroundImage: `url(${img})` , height: '560px'}} >
          <div style={{textAlignLast: 'center',width: '100%',margin: '0 340px', maxWidth: '720px',marginLeft: 'auto',marginRight: 'auto',paddingLeft: '15px',paddingRight: '15px'}}>
          <Typography style={{fontSize: '70px', color: 'aliceblue',fontFamily: 'auto',fontWeight: 600}}>Let's get started</Typography>
          <Typography style={{fontSize: '18px ', color: 'aliceblue'}}>To get started, you will need to choose a plan for your needs. You can opt in for the monthly of annual options and go with one fo the three listed below.</Typography>
          </div>
        </div>
        <div className='card'>
          <div>
          <div className='pagal1'>
            <div className='pagal2'>
              <div className='pagal3'>
                <div className='pagal4' style={{margin: '50px auto'}}>
                  <div>
                <div style={{marginTop: '80px'}}>
                    <AppBar position="static" color="default" style={{boxShadow: 'none', background: 'transparent', marginBottom: '30px'}}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="none"
                        style={{boxShadow: 'crimson'}}
                        variant="fullWidth"

                        aria-label="scrollable auto tabs example"
                      >
                        <Tab style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', fontWeight: 500,fontSize: '18px'}} label="Monthly" {...a11yProps(0)}/>
                        <Tab style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', fontWeight: 500,fontSize: '18px'}} label="Yearly" {...a11yProps(1)}/>
                      </Tabs>
                    </AppBar>
                </div>
                </div>
                </div>
              </div>
            </div>
            <div className='pagal7'>
              <div className='pagal8' style={{maxWidth: '100%'}}>
                <div>
                  <div className='pagal9'>
                    <div className='pagal10' style={{overflow: 'hidden'}}>
                      <div className='pagal11' style={{background: 'inherit'}} >
                      <div >
                      <SwipeableViews
                          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                          index={value}
                          onChangeIndex={handleChangeIndex}
                        >
                      <TabPanel value={value} index={0}>
                          <GridContainer style={{textTransform: 'Capitalize'}}>
                              <GridItem xs={12} sm={6} md={4} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Free
                                </Typography>
                                <Typography variant="h5" component="h2">
                                  <div style={{fontSize: '20px', textTransform: 'lowercase'}}><span style={{fontSize: '55px'}}><span style={{fontSize: '25px', marginRight: '5px', verticalAlign: 'text-top'}}>&#8377;</span>0</span> /month</div>
                                </Typography>
                                <br/>
                                <Typography variant="body2" component={'span'} >
                                  1 Team 
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  2 Team Member's
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  1 Project
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  2 Project Member
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                 200 MB Cloud Storage
                                </Typography>
                              </CardContent>
                              <CardActions>
                              <div style={{margin: 'auto', marginBottom: '20px'}}>
                                  <Button disabled value={props.value} size="small" style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', boxShadow: 'crimson', fontWeight: 500,fontSize: '18px'}}>Get Started</Button>
                                </div>
                              </CardActions>
                            </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Premium
                                </Typography>
                                <Typography variant="h5" component="h2">
                                  <div style={{fontSize: '20px', textTransform: 'lowercase'}}><span style={{fontSize: '55px'}}><span style={{fontSize: '25px', marginRight: '5px', verticalAlign: 'text-top'}}>&#8377;</span>89</span> /month</div>
                                </Typography>
                                <br/>
                                <Typography variant="body2" component={'span'} >
                                  1 Team 
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  5 Team Member's
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  5 Project
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  5 Project Member
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                 1 GB Cloud Storage
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <div style={{margin: 'auto', marginBottom: '20px'}}>
                                  <Button href={`https://paytm-app.herokuapp.com/paywithpaytm?amount=89&name=${props.username}&token=${props.token}`} size="small" style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', boxShadow: 'crimson', fontWeight: 500,fontSize: '18px'}}>Get Started</Button>
                                </div>
                              </CardActions>
                            </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Platinum
                                </Typography>
                                <Typography variant="h5" component="h2">
                                  <div style={{fontSize: '20px', textTransform: 'lowercase'}}><span style={{fontSize: '55px'}}><span style={{fontSize: '25px', marginRight: '5px', verticalAlign: 'text-top'}}>&#8377;</span>199</span> /month</div>
                                </Typography>
                                <br/>
                                <Typography variant="body2" component={'span'} >
                                  1 Team 
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  10+ Team Member's
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  10 Project
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  10+ Project Member
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                 2.5 GB Cloud Storage
                                </Typography>
                              </CardContent>
                              <CardActions>
                              <div style={{margin: 'auto', marginBottom: '20px'}}>
                                  <Button href={`https://paytm-app.herokuapp.com/paywithpaytm?amount=199&name=${props.username}&token=${props.token}`} size="small" style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', boxShadow: 'crimson', fontWeight: 500,fontSize: '18px'}}>Get Started</Button>
                                </div>
                              </CardActions>
                            </Card>
                            </GridItem>
                            </GridContainer>
                        </TabPanel>


                        <TabPanel value={value} index={1}>
                        <GridContainer >
                        <GridItem xs={12} sm={6} md={4} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Free
                                </Typography>
                                <Typography variant="h5" component="h2">
                                  <div style={{fontSize: '20px', textTransform: 'lowercase'}}><span style={{fontSize: '55px'}}><span style={{fontSize: '25px', marginRight: '5px', verticalAlign: 'text-top'}}>&#8377;</span>0</span> /year</div>
                                </Typography>
                                <br/>
                                <Typography variant="body2" component={'span'} >
                                  1 Team 
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  3 Team Member's
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  1 Project
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  3 Project Member
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                 200 MB Cloud Storage
                                </Typography>
                              </CardContent>
                              <CardActions>
                              <div style={{margin: 'auto', marginBottom: '20px'}}>
                                  <Button disabled size="small" style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', boxShadow: 'crimson', fontWeight: 500,fontSize: '18px'}}>Get Started</Button>
                                </div>
                              </CardActions>
                            </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Premium
                                </Typography>
                                <Typography variant="h5" component="h2">
                                  <div style={{fontSize: '20px', textTransform: 'lowercase'}}><span style={{fontSize: '55px'}}><span style={{fontSize: '25px', marginRight: '5px', verticalAlign: 'text-top'}}>&#8377;</span>748</span> /year</div>
                                </Typography>
                                <br/>
                                <Typography variant="body2" component={'span'} >
                                  1 Team 
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  6 Team Member's
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  5 Project
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  5 Project Member
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                 1 GB Cloud Storage
                                </Typography>
                              </CardContent>
                              <CardActions>
                              <div style={{margin: 'auto', marginBottom: '20px'}}>
                                  <Button href={`https://paytm-app.herokuapp.com/paywithpaytm?amount=748&name=${props.username}&token=${props.token}`} size="small" style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', boxShadow: 'crimson', fontWeight: 500,fontSize: '18px'}}>Get Started</Button>
                                </div>
                              </CardActions>
                            </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Platinum
                                </Typography>
                                <Typography variant="h5" component="h2">
                                  <div style={{fontSize: '20px', textTransform: 'lowercase'}}><span style={{fontSize: '55px'}}><span style={{fontSize: '25px', marginRight: '5px', verticalAlign: 'text-top'}}>&#8377;</span>1672</span> /year</div>
                                </Typography>
                                <br/>
                                <Typography variant="body2" component={'span'} >
                                  1 Team 
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  10+ Team Member's
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  10 Project
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                  10+ Project Member
                                </Typography>
                                <hr style={{width: '80%'}}/>
                                <Typography variant="body2" component={'span'} >
                                 2.5 GB Cloud Storage
                                </Typography>
                              </CardContent>
                              <CardActions>
                              <div style={{margin: 'auto', marginBottom: '20px'}}>
                                  <Button href={`https://paytm-app.herokuapp.com/paywithpaytm?amount=1672&name=${props.username}&token=${props.token}`} size="small" style={{margin: '0 10px', borderRadius: '30px', background: 'crimson', color: 'aliceblue', boxShadow: 'crimson', fontWeight: 500,fontSize: '18px'}}>Get Started</Button>
                                </div>
                              </CardActions>
                            </Card>
                            </GridItem>
                            </GridContainer>
                        </TabPanel>
                        </SwipeableViews>
                        
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <hr/>
                        <br/>
                        <br/>
                        <h1 style={{textTransform: 'capitalize', fontWeight: 600, fontSize: '46px', margin: '80px 0', fontFamily: 'serif'}}>Frequently Asked Questions</h1>
                        <div style={{margin: '0 135px'}}>
                        <GridContainer  >
                        <GridItem xs={12} sm={6} md={6}>
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography variant="h5" component="h2">
                                <CardMembershipIcon style={{fontSize: '2.25em', marginBottom: '-20px', color: 'lightskyblue'}}/> Can I cancel my subscription?
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Yes, you can cancel and perform other actions on your subscriptions via the My Account page.
                                </Typography>
                              </CardContent>
                            </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography variant="h5" component="h2">
                                <CardGiftcardIcon style={{fontSize: '2.25em', marginBottom: '-20px', color: 'lightgreen'}}/> Is there any discount for an annual subscription?
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Yes, we offer a 30% discount if you choose annual subscription for any plan.
                                </Typography>
                              </CardContent>
                            </Card>
                            </GridItem>
                            
                            </GridContainer>
                        </div>
                        <div style={{margin: '30px 135px'}}>
                        <GridContainer  >
                        <GridItem xs={12} sm={6} md={6} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography variant="h5" component="h2">
                                <PaymentIcon style={{fontSize: '2.25em', marginBottom: '-20px', color: 'gold'}}/> Which payment methods do you take?
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  WooCommerce comes bundled with PayPal (for accepting credit card and PayPal account payments), BACS, and cash on delivery for accepting payments.
                                </Typography>
                              </CardContent>
                            </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} >
                            <Card className={classes.root} style={{borderRadius: '10px'}}>
                              <CardContent >
                                <Typography variant="h5" component="h2"  >
                                <QuestionAnswerIcon style={{fontSize: '2.25em', marginBottom: '-20px', color: 'crimson'}}/> Any other questions we can answer?
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  We are happy to help you. <a href="/contact-us">Contact us</a>.
                                </Typography>
                              </CardContent>
                            </Card>
                            </GridItem>
                            </GridContainer>
                        </div>
                      </div>
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{float: 'right', fontSize: '30px', margin:'30px'}}>made by Abhishek Prajapati</div>
      </div>
      </>
        
    )
}


class Plan extends Component{
    state={
    }

    render(){
        return(
            <Plans username={this.props.username} token={this.props.token} />
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token,
      url: state.baseurl,
      username: state.username
    };
  };


export default connect(mapStateToProps)(Plan);