import React, { Component } from 'react'
import "./project.css";
import Card from '@material-ui/core/Card';
import { CardContent, Typography, Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PorjectDash from './project-dashboard.js';
import Task from './task.js';
import ProFiles from './project-files.js'
import OverView from './project-overview.js'
import Activity from './project-activity.js'
import PorjectDashOwner from './projectOwnerDash.js';
import Bug from './project-bugs.js'
import Member from './project-member.js'
import MemberMessage from './memberForum/Messenger/index.js'
import Report from './project-report.js'
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment'
import TaskOwner from './projectOwnerTask.js';
import BugOwner from './projectOwnerBug.js'
import ReportOwner from './ReportOwner.js'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Loading from "../../../loading.js";
import {makeStyles} from '@material-ui/styles';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));


function MainPs(props){
  const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };
    return (
        <div>
          {
            (!props.loading)?
            (
              <>
              <>
              <div className={classes.sectionDesktop}>
              <Card className='back' style={{boxShadow: 'unset', width: '100%'}}>
                <CardContent className='card2'>
                <Toolbar>
                <Toolbar style={{flexGrow: '1'}}>
                    <img alt='Tasks' src="https://img.icons8.com/material/48/000000/tasks--v1.png" className="card1" style={{fontSize: '45px'}}/>
                    <div className='text' style={{float: 'right'}} >
                        {props.project_data.project_name}
                    </div>
                    </Toolbar>
                    <div style={{float: 'right'}}>
                      <Tooltip title='Back'>
                    <Fab color="primary" aria-label="add" style={{margin: '25px'}} href='/project'>
                        <ArrowBackIcon  />
                    </Fab>
                    </Tooltip>
                    </div>
                    </Toolbar>
                </CardContent>
            </Card>
              </div>
              <div className={classes.sectionMobile}>
              <Card className='back' style={{boxShadow: 'unset', width: '100%'}}>
                <CardContent className='card2' style={{padding: '16px 0'}}>
                <Toolbar>
                <Toolbar style={{flexGrow: '1'}}>
                    <img alt='Tasks' src="https://img.icons8.com/material/48/000000/tasks--v1.png" style={{fontSize: '45px'}}/>
                    <div className='text' style={{float: 'right'}} >
                        {props.project_data.project_name}
                    </div>
                    </Toolbar>
                    <div style={{float: 'right'}}>
                      <Tooltip title='Back'>
                    <Fab color="primary" aria-label="add" style={{margin: '25px'}} href='/project'>
                        <ArrowBackIcon  />
                    </Fab>
                    </Tooltip>
                    </div>
                    </Toolbar>
                </CardContent>
            </Card>
              </div>
            </>
            <div >
            {
                  (props.project_data.username === props.username)?
                  (
                    <>
                    <Card style={{width: 'auto', margin: '0 10px'}}>
                    <div className={classes.sectionDesktop}>
                    <AppBar position="static" color="default" style={{borderRadius: '10px', overflow: 'hidden'}} >
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="fullWidth"
                    scrollButtons="auto"
                    aria-label="full width tabs example"
                    style={{background: 'black', boxShadow: '0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)', color: 'aliceblue'}}

                    >
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt='dashboard' src="https://img.icons8.com/color/24/000000/dashboard--v1.png"/>} label="Dashboard" {...a11yProps(0)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="overview" src="https://img.icons8.com/color/24/000000/overview-pages-2.png"/>} label="Overview" {...a11yProps(1)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="Task" src="https://img.icons8.com/cute-clipart/24/000000/task.png"/>} label="Tasks" {...a11yProps(2)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="Bug"  style={{background:'aqua', borderRadius: '12px'}} src="https://img.icons8.com/material/24/000000/bug.png"/> } label="Bugs" {...a11yProps(3)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="Report" src="https://img.icons8.com/color/24/000000/report-card.png"/>} label="Report" {...a11yProps(4)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="Upload" src="https://img.icons8.com/plasticine/24/000000/upload-to-cloud--v1.png"/>} label="Uploaded Files" {...a11yProps(5)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="Forum" src="https://img.icons8.com/ultraviolet/24/000000/comment-discussion.png"/>} label="Member Forum" {...a11yProps(6)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="Activity" src="https://img.icons8.com/color/24/000000/activity-history.png"/>} label="Activity's" {...a11yProps(7)} />
                    <Tab style={{ color: 'aliceblue'}} icon={<img alt="Member's" src="https://img.icons8.com/color/24/000000/group-background-selected.png"/>} label="Members" {...a11yProps(8)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                  
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <PorjectDashOwner data={props.project_data} handleChange={handleChange}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <OverView data={props.project_data} owner_image={props.owner_image} task={props.task} bugs={props.bugs} />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TaskOwner data={props.project_data} handleAssignElement={props.handleAssignElement} handleRefreshTasksFull={props.handleRefreshTasksFull} handleCreateTasksOwner={props.handleCreateTasksOwner} handleRefreshTasksOwner={props.handleRefreshTasksOwner} taskFull={props.taskFull} handleSearchOwner={props.handleSearchOwner} handleWeekFilterOwner={props.handleWeekFilterOwner} handleMonthFilterOwner={props.handleMonthFilterOwner} handleTodayFilterOwner={props.handleTodayFilterOwner}  />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <BugOwner data={props.project_data} handleDeleteBugsOwner={props.handleDeleteBugsOwner} handleUpdateBugsOwner={props.handleUpdateBugsOwner} handleCreateBugsOwner={props.handleCreateBugsOwner} bugFull={props.bugFull}  handleRefreshBugsOwnerFull={props.handleRefreshBugsOwnerFull}  handleSearchBugsOwner={props.handleSearchBugsOwner}  handleWeekFilterBugsOwner={props.handleWeekFilterBugsOwner} handleMonthFilterBugsOwner={props.handleMonthFilterBugsOwner} handleTodayFilterBugsOwner={props.handleTodayFilterBugsOwner}/>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <ReportOwner data={props.project_data} />
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                        <ProFiles data={props.project_data} handleFiles={props.handleFiles}/>    
                    </TabPanel>
                    <TabPanel value={value} index={6} dir={theme.direction}>
                        <MemberMessage data={props.project_data} message={props.message}/>
                    </TabPanel>
                    <TabPanel value={value} index={7} dir={theme.direction}>
                        <Activity data={props.project_data} activity={props.activity}/>
                    </TabPanel>
                    <TabPanel value={value} index={8} dir={theme.direction}>
                        <Member data={props.project_data} member={props.member}/>
                    </TabPanel>
                </SwipeableViews>
                </div>
                </Card>
                <Card style={{width: '350px', margin: '0 auto'}}>
                <div className={classes.sectionMobile}>
                  
                <AppBar position="static" color="default" style={{borderRadius: '10px', overflow: 'hidden'}} >
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    style={{background: 'black', boxShadow: '0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)', color: 'aliceblue'}}

                    >
                    <Tab icon={<img alt='dashboard' src="https://img.icons8.com/color/24/000000/dashboard--v1.png"/>} {...a11yProps(0)} />
                    <Tab icon={<img alt="overview" src="https://img.icons8.com/color/24/000000/overview-pages-2.png"/>} {...a11yProps(1)} />
                    <Tab icon={<img alt="Task" src="https://img.icons8.com/cute-clipart/24/000000/task.png"/>} {...a11yProps(2)} />
                    <Tab icon={<img alt="Bug" style={{background:'aqua', borderRadius: '12px'}} src="https://img.icons8.com/material/24/000000/bug.png"/> } {...a11yProps(3)} />
                    <Tab icon={<img alt="Report" src="https://img.icons8.com/color/24/000000/report-card.png"/>} {...a11yProps(4)} />
                    <Tab icon={<img alt="Upload" src="https://img.icons8.com/plasticine/24/000000/upload-to-cloud--v1.png"/>} {...a11yProps(5)} />
                    <Tab icon={<img alt="Forum" src="https://img.icons8.com/ultraviolet/24/000000/comment-discussion.png"/>} {...a11yProps(6)} />
                    <Tab icon={<img alt="Activity" src="https://img.icons8.com/color/24/000000/activity-history.png"/>} {...a11yProps(7)} />
                    <Tab icon={<img alt="Member's" src="https://img.icons8.com/color/24/000000/group-background-selected.png"/>} {...a11yProps(8)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                  
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <PorjectDashOwner data={props.project_data} handleChange={handleChange}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <OverView data={props.project_data} owner_image={props.owner_image} task={props.task} bugs={props.bugs} />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TaskOwner data={props.project_data} handleAssignElement={props.handleAssignElement} handleRefreshTasksFull={props.handleRefreshTasksFull} handleCreateTasksOwner={props.handleCreateTasksOwner} handleRefreshTasksOwner={props.handleRefreshTasksOwner} taskFull={props.taskFull} handleSearchOwner={props.handleSearchOwner} handleWeekFilterOwner={props.handleWeekFilterOwner} handleMonthFilterOwner={props.handleMonthFilterOwner} handleTodayFilterOwner={props.handleTodayFilterOwner}  />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <BugOwner data={props.project_data} handleDeleteBugsOwner={props.handleDeleteBugsOwner} handleUpdateBugsOwner={props.handleUpdateBugsOwner} handleCreateBugsOwner={props.handleCreateBugsOwner} bugFull={props.bugFull}  handleRefreshBugsOwnerFull={props.handleRefreshBugsOwnerFull}  handleSearchBugsOwner={props.handleSearchBugsOwner}  handleWeekFilterBugsOwner={props.handleWeekFilterBugsOwner} handleMonthFilterBugsOwner={props.handleMonthFilterBugsOwner} handleTodayFilterBugsOwner={props.handleTodayFilterBugsOwner}/>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <ReportOwner data={props.project_data} />
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                        <ProFiles data={props.project_data} handleFiles={props.handleFiles}/>    
                    </TabPanel>
                    <TabPanel value={value} index={6} dir={theme.direction}>
                        <MemberMessage data={props.project_data} message={props.message}/>
                    </TabPanel>
                    <TabPanel value={value} index={7} dir={theme.direction}>
                        <Activity data={props.project_data} activity={props.activity}/>
                    </TabPanel>
                    <TabPanel value={value} index={8} dir={theme.direction}>
                        <Member data={props.project_data} member={props.member}/>
                    </TabPanel>
                </SwipeableViews>
                </div>
                </Card>
                </>

                  )
                  :
                  (
                    <>
                    <Card style={{width: 'auto', margin: '0 10px'}}>
                    <div className={classes.sectionDesktop}>
                    <AppBar position="static" color="default" style={{borderRadius: '10px', overflow: 'hidden'}} >
                      <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      textColor="primary"
                      variant="fullWidth"
                      scrollButtons="auto"
                      aria-label="full width tabs example"
                      style={{background: 'black', boxShadow: '0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)', color: 'aliceblue'}}

                      >
                      <Tab icon={<img alt='dashboard' src="https://img.icons8.com/color/24/000000/dashboard--v1.png"/>} style={{ color: 'aliceblue'}} label="Dashboard" {...a11yProps(0)} />
                      <Tab icon={<img alt="overview" src="https://img.icons8.com/color/24/000000/overview-pages-2.png"/>} style={{ color: 'aliceblue'}} label="Overview" {...a11yProps(1)} />
                      <Tab icon={<img alt="Task" src="https://img.icons8.com/cute-clipart/24/000000/task.png"/>} style={{ color: 'aliceblue'}} label="Tasks" {...a11yProps(2)} />
                      <Tab icon={<img alt="Bug" style={{background:'aqua', borderRadius: '12px'}} src="https://img.icons8.com/material/24/000000/bug.png"/> } style={{ color: 'aliceblue'}} label="Bugs" {...a11yProps(3)} />
                      <Tab icon={<img alt="Report" src="https://img.icons8.com/color/24/000000/report-card.png"/>} style={{ color: 'aliceblue'}} label="Report" {...a11yProps(4)} />
                      <Tab icon={<img alt="Upload" src="https://img.icons8.com/plasticine/24/000000/upload-to-cloud--v1.png"/>} style={{ color: 'aliceblue'}} label="Uploaded Files" {...a11yProps(5)} />
                      <Tab icon={<img alt="Forum" src="https://img.icons8.com/ultraviolet/24/000000/comment-discussion.png"/>} label="Member Forum" {...a11yProps(6)} />
                      <Tab icon={<img alt="Member's" src="https://img.icons8.com/color/24/000000/group-background-selected.png"/>} style={{ color: 'aliceblue'}} label="Members" {...a11yProps(7)} />
                      </Tabs>
                  </AppBar>
                  <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                  >
                    
                      <TabPanel value={value} index={0} dir={theme.direction}>
                          <PorjectDash data={props.project_data} reportExistsUpdate={props.reportExistsUpdate} handleUpdateReport={props.handleUpdateReport} handleChange={handleChange} task={props.task} bugs={props.bugs} reportExists={props.reportExists} handleReportExists={props.handleReportExists} report={props.report} />
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                          <OverView data={props.project_data} owner_image={props.owner_image} task={props.task} bugs={props.bugs} />
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                          <Task data={props.project_data} handleEditstatustask={props.handleEditstatustask} handleRefreshTasksFilter={props.handleRefreshTasksFilter} handleSearch={props.handleSearch} handleRefreshTasks={props.handleRefreshTasks} handleTaskDelete={props.handleTaskDelete} task={props.task} handleWeekFilter={props.handleWeekFilter} handleMonthFilter={props.handleMonthFilter} handleTodayFilter={props.handleTodayFilter} />
                      </TabPanel>
                      <TabPanel value={value} index={3} dir={theme.direction}>
                          <Bug data={props.project_data} handleUpdateBugs={props.handleUpdateBugs} bugs={props.bugs} handleSearchBugs={props.handleSearchBugs} handleRefreshbugss={props.handleRefreshbugss} handlebugsDelete={props.handlebugsDelete} handleWeekFilterBugs={props.handleWeekFilterBugs} handleMonthFilterBugs={props.handleMonthFilterBugs} handleTodayFilterBugs={props.handleTodayFilterBugs}/>
                      </TabPanel>
                      <TabPanel value={value} index={4} dir={theme.direction}>
                          <Report data={props.project_data} report={props.report}/>
                      </TabPanel>
                      <TabPanel value={value} index={5} dir={theme.direction}>
                          <ProFiles data={props.project_data} handleFiles={props.handleFiles}/>    
                      </TabPanel>
                      <TabPanel value={value} index={6} dir={theme.direction}>
                        <MemberMessage data={props.project_data} message={props.message}/>
                    </TabPanel>
                      <TabPanel value={value} index={7} dir={theme.direction}>
                          <Member data={props.project_data} member={props.member}/>
                      </TabPanel>
                  </SwipeableViews>
                  </div>
                </Card>
                <Card style={{width: '420px', margin: '0 auto'}}>
                <div className={classes.sectionMobile}>
                <AppBar position="static" color="default" style={{borderRadius: '10px', overflow: 'hidden'}} >
                      <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="full width tabs example"
                      style={{background: 'black', boxShadow: '0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)', color: 'aliceblue'}}

                      >
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt='dashboard' src="https://img.icons8.com/color/24/000000/dashboard--v1.png"/>} {...a11yProps(0)} />
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt="overview" src="https://img.icons8.com/color/24/000000/overview-pages-2.png"/>} {...a11yProps(1)} />
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt="Task" src="https://img.icons8.com/cute-clipart/24/000000/task.png"/>} {...a11yProps(2)} />
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt="Bug" style={{background:'aqua', borderRadius: '12px'}} src="https://img.icons8.com/material/24/000000/bug.png"/> } {...a11yProps(3)} />
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt="Report" src="https://img.icons8.com/color/24/000000/report-card.png"/>} {...a11yProps(4)} />
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt="Upload" src="https://img.icons8.com/plasticine/24/000000/upload-to-cloud--v1.png"/>} {...a11yProps(5)} />
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt="Forum" src="https://img.icons8.com/ultraviolet/24/000000/comment-discussion.png"/>} label="Member Forum" {...a11yProps(6)} />
                      <Tab style={{ color: 'aliceblue'}} icon={<img alt="Member's" src="https://img.icons8.com/color/24/000000/group-background-selected.png"/>} {...a11yProps(7)} />
                      </Tabs>
                  </AppBar>
                  <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                  >
                    
                      <TabPanel value={value} index={0} dir={theme.direction}>
                          <PorjectDash data={props.project_data} reportExistsUpdate={props.reportExistsUpdate} handleUpdateReport={props.handleUpdateReport} handleChange={handleChange} task={props.task} bugs={props.bugs} reportExists={props.reportExists} handleReportExists={props.handleReportExists} report={props.report} />
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                          <OverView data={props.project_data} owner_image={props.owner_image} task={props.task} bugs={props.bugs} />
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                          <Task data={props.project_data} handleEditstatustask={props.handleEditstatustask} handleRefreshTasksFilter={props.handleRefreshTasksFilter} handleSearch={props.handleSearch} handleRefreshTasks={props.handleRefreshTasks} handleTaskDelete={props.handleTaskDelete} task={props.task} handleWeekFilter={props.handleWeekFilter} handleMonthFilter={props.handleMonthFilter} handleTodayFilter={props.handleTodayFilter} />
                      </TabPanel>
                      <TabPanel value={value} index={3} dir={theme.direction}>
                          <Bug data={props.project_data} handleUpdateBugs={props.handleUpdateBugs} bugs={props.bugs} handleSearchBugs={props.handleSearchBugs} handleRefreshbugss={props.handleRefreshbugss} handlebugsDelete={props.handlebugsDelete} handleWeekFilterBugs={props.handleWeekFilterBugs} handleMonthFilterBugs={props.handleMonthFilterBugs} handleTodayFilterBugs={props.handleTodayFilterBugs}/>
                      </TabPanel>
                      <TabPanel value={value} index={4} dir={theme.direction}>
                          <Report data={props.project_data} report={props.report}/>
                      </TabPanel>
                      <TabPanel value={value} index={5} dir={theme.direction}>
                          <ProFiles data={props.project_data} handleFiles={props.handleFiles}/>    
                      </TabPanel>
                      <TabPanel value={value} index={6} dir={theme.direction}>
                        <MemberMessage data={props.project_data} message={props.message}/>
                    </TabPanel>
                      <TabPanel value={value} index={7} dir={theme.direction}>
                          <Member data={props.project_data} member={props.member}/>
                      </TabPanel>
                  </SwipeableViews>
                  </div>
                  </Card>
                  </>

                  )
            }             
            </div>
            </>
            )
            :
            (<Loading/>)

          }
        </div>
    )
}


class MainP extends Component{
    state={
        project_data: {},
        task: [],
        bugs: [],
        report: [],
        activity: [],
        message: [],
        search: '',
        member: [],
        reportExists: [],
        reportExistsUpdate: [],
        taskFull: [],
        taskFull_search:[],
        bugFull: [],
        loading: true,
        task_search: [],
        bugs_search: [],
        bugFull_search: [],
        owner_image: {}

    }

    componentDidMount() {
        const { token } = this.props;
        if (token) {
          axios.defaults.headers = {
            "Content-Type": "application.json",
            Authorization: "Token " + token
          };
          const projectID = this.props.match.params.projectID;
          axios.get(`https://${this.props.url}/create/${projectID}`).then(res => {
            var today = new Date();
            const todayDate = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
            
            this.setState({
              project_data: res.data,
              taskFull: res.data.task,
              taskFull_search: res.data.task,
              bugFull: res.data.bugs,
              bugFull_search: res.data.bugs,
              task: res.data.task.filter(data=>{return data.requested_to === this.props.username }),
              task_search: res.data.task.filter(data=>{return data.requested_to === this.props.username }),
              bugs: res.data.bugs.filter(data=>{return data.requested_to === this.props.username }),
              bugs_search: res.data.bugs.filter(data=>{return data.requested_to === this.props.username }),
              activity: res.data.activity.reverse(),
              member: res.data.promem,
              message: res.data.forums,
              report: res.data.report.filter(data=>{return data.posted_by === this.props.username }).reverse(),
              reportExists : res.data.report.filter(data=>{return data.posted_by === this.props.username && moment(data.timestamp).format('YYYY-MM-DD') === todayDate }),
              loading: false
            });
            axios.get(`https://${this.props.url}/user_image/`).then(res1=>{
              this.setState({
                owner_image: res1.data.filter(r=>{ return r.user === res.data.username})[0]
              })
            })
          });
        }
      }
    
      UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token) {
          axios.defaults.headers = {
            "Content-Type": "application.json",
            Authorization: "Token " + newProps.token
          };
          const projectID = this.props.match.params.projectID;
          axios.get(`https://${this.props.url}/create/${projectID}`).then(res => {
            var today = new Date();
            const todayDate = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
            
            this.setState({
              project_data: res.data,
              taskFull: res.data.task,
              taskFull_search: res.data.task,
              bugFull: res.data.bugs,
              bugFull_search: res.data.bugs,
              task: res.data.task.filter(data=>{return data.requested_to === this.props.username }),
              task_search: res.data.task.filter(data=>{return data.requested_to === this.props.username }),
              bugs: res.data.bugs.filter(data=>{return data.requested_to === this.props.username }),
              bugs_search: res.data.bugs.filter(data=>{return data.requested_to === this.props.username }),
              activity: res.data.activity.reverse(),
              member: res.data.promem,
              message: res.data.forums,
              report: res.data.report.filter(data=>{return data.posted_by === this.props.username }).reverse(),
              reportExists : (res.data.report.filter(data=>{return data.posted_by === this.props.username && moment(data.timestamp).format('YYYY-MM-DD') === todayDate })),
              loading: false
            });
            axios.get(`https://${this.props.url}/user_image/`).then(res1=>{
              this.setState({
                owner_image: res1.data.filter(r=>{ return r.user === res.data.username})[0]
              })
            })

          });
        }
      }

      
    handleReportExists=()=>{
      const { token } = this.props;
        if (token) {
          axios.defaults.headers = {
            "Content-Type": "application.json",
            Authorization: "Token " + token
          };
          const projectID = this.props.match.params.projectID;
          axios.get(`https://${this.props.url}/create/${projectID}`).then(res => {
            var today = new Date();
            const todayDate = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
            
            this.setState({
              project_data: res.data,
              report: res.data.report.filter(data=>{return data.posted_by === this.props.username }).reverse(),
              reportExists : res.data.report.filter(data=>{return data.posted_by === this.props.username && moment(data.timestamp).format('YYYY-MM-DD') === todayDate }),
              reportExistsUpdate: []
            });
          });
        }
    }

      handleFiles=()=>{
        this.handleRefreshTasks();
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token
        };
        const projectID = this.props.match.params.projectID;
        axios.get(`https://${this.props.url}/create/${projectID}`).then(res => {
            this.setState({
              project_data: res.data,
              task: res.data.task.filter(data=>{return data.requested_to === this.props.username }),
              bugs: res.data.bugs.filter(data=>{return data.requested_to === this.props.username }),
              activity: res.data.activity.reverse()
            });
          });
      }

      handleTaskDelete=()=>{
        this.handleRefreshTasks();
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token
        };
        const projectID = this.props.match.params.projectID;
        axios.get(`https://${this.props.url}/create/${projectID}`).then(res => {
            this.setState({
              task: res.data.task.filter(data=>{return data.requested_to === this.props.username }),
              task_search: res.data.task.filter(data=>{return data.requested_to === this.props.username }),
            });
          });
      }


      handleTodayFilter=()=>{
        var today = new Date();
          var date = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
            this.setState({
              task: this.state.task_search.filter(data11=>{
                return moment(data11.timestamp).format('YYYY-MM-DD') >= date && data11.requested_to === this.props.username ;
              })
          });
      }
  
      handleWeekFilter=()=>{
        var today = new Date();
        var dateTo = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateFrom = moment(dateTo).subtract(7,'days').format('YYYY-MM-DD');

            this.setState({
              task: this.state.task_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom && data.requested_to === this.props.username;
              })
            });
      }
  
      handleMonthFilter=()=>{
        var today = new Date();
          var dateTo = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
          var dateFrom = moment(dateTo).subtract(1,'months').format('YYYY-MM-DD');
            this.setState({
              task: this.state.task_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom && data.requested_to === this.props.username;
              })
            });
      }

      handleSearch=(data1)=>{
          this.setState({
            search: data1,
            task: this.state.task_search.filter(
              data=>{
                return data.tasks.toLowerCase().indexOf(data1.toLowerCase()) !== -1 && data.requested_to === this.props.username;
              }
            )
          });
      }

      handleEditstatustask=(data,data1)=>{
        this.setState({
          task: [...data, data1],
          task_search: [...data, data1]
        })
      }

      handleRefreshTasks=()=>{
            this.setState({
              task: this.state.task_search
            });
      }

      handleSearchBugs=(data1)=>{

        this.setState({
          search: data1
        })
          this.setState({
            bugs: this.state.bugs_search.filter(
              data=>{
                return data.bugs.toLowerCase().indexOf(data1.toLowerCase()) !== -1 && data.requested_to === this.props.username;
              }
            )
          });
        
      }

      handleRefreshbugss=()=>{
            this.setState({
              bugs: this.state.bugs_search
            });;
      }

      handlebugsDelete=()=>{
        this.handleRefreshbugss();
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token
        };
        const projectID = this.props.match.params.projectID;
        axios.get(`https://${this.props.url}/create/${projectID}`).then(res => {
            this.setState({
              bugs: res.data.bugs.filter(data=>{return data.requested_to === this.props.username }),
            });
          });
      }

      handleWeekFilterBugs=()=>{
        var today = new Date();
        var dateTo = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateFrom = moment(dateTo).subtract(7,'days').format('YYYY-MM-DD');
            this.setState({
              bugs: this.state.bugs_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom && data.requested_to === this.props.username;
              })
            });
      }

      handleMonthFilterBugs=()=>{
        var today = new Date();
          var dateTo = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
          var dateFrom = moment(dateTo).subtract(1,'months').format('YYYY-MM-DD');
            this.setState({
              bugs: this.state.bugs_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom && data.requested_to === this.props.username;
              })
            });
      }

      handleTodayFilterBugs=()=>{
        var today = new Date();
          var date = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
            this.setState({
              bugs: this.state.bugs_search.filter(data=>{
                return moment(data.timestamp).format('YYYY-MM-DD') >= date && data.requested_to === this.props.username;
              })
            });
      }

      handleRefreshTasksOwner=(id)=>{
            this.setState({
              taskFull: this.state.taskFull_search.filter(res=>{ return res.id !== id}) ,
              taskFull_search: this.state.taskFull_search.filter(res=>{ return res.id !== id}) 
            });
      }

      handleCreateTasksOwner=(data)=>{
        this.setState(previousState=>({
          taskFull: [...previousState.taskFull, data],
          taskFull_search: [...previousState.taskFull, data],
        }))
      }

      handleRefreshTasksFull=()=>{
        this.setState({
          taskFull: this.state.taskFull_search
        })
      }

      handleRefreshTasksFilter=()=>{
        this.setState({
          task: this.state.task_search
        })
      }


      handleRefreshBugsOwnerFull=()=>{
            this.setState({
              bugFull: this.state.bugFull_search
            });
      }

      handleCreateBugsOwner=(data)=>{
        this.setState(previousState=>({
          bugFull: [...previousState.bugFull, data],
          bugFull_search: [...previousState.bugFull, data],
        }))
      }

      handleUpdateBugsOwner=(data)=>{
        let da = this.state.bugFull_search.filter(res=>{return res.id !== data.id});
        this.setState({
          bugFull: [...da, data],
          bugFull_search: [...da, data],
        })
      }

      handleUpdateBugs=(data)=>{
        let da = this.state.bugs_search.filter(res=>{return res.id !== data.id});
        this.setState({
          bugs: [...da, data],
          bugs_search: [...da, data],
        })
      }

      handleDeleteBugsOwner=(id)=>{
        this.setState({
          bugFull: this.state.bugFull_search.filter(res=>{return res.id !== id}),
          bugFull_search: this.state.bugFull_search.filter(res=>{return res.id !== id})
        })
      }

      handleSearchOwner=(data1)=>{
        this.setState({
          search: data1,
            taskFull: this.state.taskFull_search.filter(
              data=>{
                return data.tasks.toLowerCase().indexOf(data1.toLowerCase()) !== -1 ;
              }
            )
          });
      }

      handleSearchBugsOwner=(data1)=>{
        this.setState({
              search: data1,
              bugFull: this.state.bugFull_search.filter(
              data=>{
                return data.bugs.toLowerCase().indexOf(data1.toLowerCase()) !== -1 ;
              }
            )
          });
      }

      handleTodayFilterOwner=()=>{
        var today = new Date();
          var date = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
            this.setState({
              taskFull: this.state.taskFull_search.filter(data11=>{
                return moment(data11.timestamp).format('YYYY-MM-DD') >= date;
              })
            });
      }
  
      handleWeekFilterOwner=()=>{
        var today = new Date();
        var dateTo = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateFrom = moment(dateTo).subtract(7,'days').format('YYYY-MM-DD');
            this.setState({
              taskFull: this.state.taskFull_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom;
              })
            });
      }
  
      handleMonthFilterOwner=()=>{
        var today = new Date();
          var dateTo = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
          var dateFrom = moment(dateTo).subtract(1,'months').format('YYYY-MM-DD');
            this.setState({
              taskFull: this.state.taskFull_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom;
              })
            });
      }


      handleWeekFilterBugsOwner=()=>{
        var today = new Date();
        var dateTo = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateFrom = moment(dateTo).subtract(7,'days').format('YYYY-MM-DD');
            this.setState({
              bugFull: this.state.bugFull_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom;
              })
            });
      }

      handleMonthFilterBugsOwner=()=>{
        var today = new Date();
          var dateTo = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
          var dateFrom = moment(dateTo).subtract(1,'months').format('YYYY-MM-DD');
            this.setState({
              bugFull: this.state.bugFull_search.filter(data=>{
                return dateTo>= moment(data.timestamp).format('YYYY-MM-DD') && moment(data.timestamp).format('YYYY-MM-DD') >=dateFrom;
              })
            });
      }

      handleTodayFilterBugsOwner=()=>{
        var today = new Date();
          var date = moment((today.getFullYear()) + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('YYYY-MM-DD');
            this.setState({
              bugFull: this.state.bugFull_search.filter(data=>{
                return moment(data.timestamp).format('YYYY-MM-DD') >= date;
              })
            });
      }

      handleUpdateReport=()=>{
        this.setState({
          reportExistsUpdate: this.state.reportExists[0],
          
          
        },)
        setTimeout(() => {
          this.setState({
            reportExists: []
          })
        }, 2000)
        
      }




    render(){
        return(
          <div style={{maxWidth: '100%'}}>
            <MainPs project_data={this.state.project_data} message={this.state.message} owner_image={this.state.owner_image} handleUpdateBugs={this.handleUpdateBugs} handleDeleteBugsOwner={this.handleDeleteBugsOwner} handleUpdateBugsOwner={this.handleUpdateBugsOwner} handleCreateBugsOwner={this.handleCreateBugsOwner} handleEditstatustask={this.handleEditstatustask} handleRefreshTasksFilter={this.handleRefreshTasksFilter} handleAssignElement={this.handleAssignElement} handleRefreshTasksFull={this.handleRefreshTasksFull} handleCreateTasksOwner={this.handleCreateTasksOwner} reportExistsUpdate={this.state.reportExistsUpdate} handleUpdateReport={this.handleUpdateReport} loading={this.state.loading} taskFull={this.state.taskFull} bugFull={this.state.bugFull} report={this.state.report} username={this.props.username} handleRefreshTasksOwner={this.handleRefreshTasksOwner} handleRefreshBugsOwnerFull={this.handleRefreshBugsOwnerFull}  handleSearchBugsOwner={this.handleSearchBugsOwner} handleSearchOwner={this.handleSearchOwner} reportExists={this.state.reportExists} member={this.state.member} handleReportExists={this.handleReportExists} activity={this.state.activity} handleSearchBugs={this.handleSearchBugs} handleRefreshbugss={this.handleRefreshbugss} handlebugsDelete={this.handlebugsDelete} handleWeekFilterBugs={this.handleWeekFilterBugs} handleMonthFilterBugs={this.handleMonthFilterBugs} handleTodayFilterBugs={this.handleTodayFilterBugs} bugs={this.state.bugs} handleRefreshTasks={this.handleRefreshTasks} handleSearch={this.handleSearch} handleWeekFilter={this.handleWeekFilter} handleMonthFilter={this.handleMonthFilter} handleTodayFilter={this.handleTodayFilter} task={this.state.task} handleFiles={this.handleFiles} handleTaskDelete={this.handleTaskDelete} handleWeekFilterOwner={this.handleWeekFilterOwner} handleMonthFilterOwner={this.handleMonthFilterOwner} handleTodayFilterOwner={this.handleTodayFilterOwner} handleWeekFilterBugsOwner={this.handleWeekFilterBugsOwner} handleMonthFilterBugsOwner={this.handleMonthFilterBugsOwner} handleTodayFilterBugsOwner={this.handleTodayFilterBugsOwner}/>
          </div>
        )
    }

}

const mapStateToProps = state => {
    return {
      token: state.token,
      username: state.username,
      url: state.baseurl
    };
  };
  
export default connect(mapStateToProps)(MainP);