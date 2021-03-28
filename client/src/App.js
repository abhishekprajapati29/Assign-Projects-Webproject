import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import CustomLayout from "./components/CustomLayout";
import { authCheckState } from "./store/actions/auth";
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from "./auth/signup";
import Forgot from "./auth/Forget";
import ForgotValidateConfirm from "./auth/ForgotValidate";
import FirstPage from './caursel/firstpage';
import Why from "./caursel/why use/why.js";
import axios from 'axios'
import Selecter from './components/selector/selecter.js'
import Trash from './components/trash/trash'
import Dashboard from './components/dashboard/dashboard'
import Plan_detail from './plan-detail';

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F4F6F8",
    },
  },
});

class App extends Component {

  state={
    data:{},
    sub: {},
    album: 0,
    file: 0,
    video: 0,
    project: 0
  }

  componentDidMount() {
      this.props.onTryAutoSignup(this.props.token);
      if(this.props.token){
        axios.defaults.headers = {
          "Content-Type": "application.json",
          Authorization: "Token " + this.props.token,
        };
        axios.get(`https://${this.props.url}/api/auth/user`).then(re=>{
          axios.get(`https://${this.props.url}/userprofile/?user=${re.data.id}`).then(re1=>{
            const data = re1.data[0];
            this.setState({
              data: data
            })
          })
          axios.get(`https://${this.props.url}/Subs/?username=${re.data.username}`).then(subs=>{
            const data = subs.data[0]
            const sub = Plan_detail.filter(fil=>{return parseInt(fil.price) === parseInt(data.amount)})
          })
        })
      }
  }

  UNSAFE_componentWillReceiveProps= async (newProps)=>{
    if(newProps.token){
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + newProps.token,
      };
      await axios.get(`https://${this.props.url}/images/`).then(re1=>{
          var sum = 0;
          re1.data.forEach(da=>{
            if(da.imagelistsize){
              sum = sum + da.imagelistsize
            }
          })
          this.setState({
            album: sum
          })
        })
        await axios.get(`https://${this.props.url}/file/`).then(re1=>{
          var sum = 0;
          re1.data.forEach(da=>{
            sum = sum + da.size
          })
          this.setState({
            file: sum
          })
        })
        await axios.get(`https://${this.props.url}/video/`).then(re1=>{
          var sum = 0;
          re1.data.forEach(da=>{
            sum = sum + da.size
          })
          this.setState({
            video: sum
          })
        })
        await axios.get(`https://${this.props.url}/create/`).then(re1=>{
          var sum = 0;
          re1.data.forEach(da=>{
            sum = sum + da.project_size
          })
          this.setState({
            project: sum
          })
        })
      await axios.get(`https://${this.props.url}/api/auth/user`).then(re=>{
        axios.get(`https://${this.props.url}/userprofile/?user=${re.data.id}`).then(re1=>{
          const data = re1.data[0];
          this.setState({
            data: data
          })
        })
        axios.get(`https://${this.props.url}/Subs/?username=${re.data.username}`).then(subs=>{
            const data = subs.data[0]
            const sub = Plan_detail.filter(fil=>{return parseInt(fil.price) === parseInt(data.amount)})[0]
            const final_total = Number(this.state.album)+Number(this.state.file)+Number(this.state.video)+Number(this.state.project)
            if(Number(final_total) > Number(sub.cloud_storage_value)){
              let form_data = new FormData();
              form_data.append('selected', true);
              axios.patch(`https://${this.props.url}/userprofile/${re.data.profile.id}/`, form_data).then(res=>{
              })
            }
          })
      })
    }
    
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <CustomLayout {...this.props}>
              
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/forgot_password" component={Forgot} />
              <Route
                exact
                path="/forgot_password_confirm/:validateID"
                component={ForgotValidateConfirm}
              />
              <Route exact path="/why" component={Why} />
              {
                
                ((this.props.isAuthenticated || !this.props.isAuthenticated) && (this.state.data.selected || !this.state.data.selected))?
                (
                  <>
                  {this.props.isAuthenticated && !this.state.data.selected ? <Route exact path="/" component={Dashboard} /> : null}
                  {!this.props.isAuthenticated && !this.state.data.selected ? <Route exact path="/" component={FirstPage} /> : null}
                  {(this.props.isAuthenticated && !this.state.data.selected) ? <BaseRouter data={this.state.data} /> : null}
                  {(this.state.data.selected && this.props.isAuthenticated)? <Route exact path="/selecter" component={Selecter} /> :null}
                  {(this.state.data.selected && this.props.isAuthenticated)? <Route exact path="/" component={Selecter} /> :null}
                  {(!this.state.data.selected && this.props.isAuthenticated)? <Route exact path="/selecter" component={Trash} /> :null}
                  </>    
                ):
                (null)
              }
              </CustomLayout>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token,
    url: state.baseurl
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    onTryAutoSignup: (token) => dispatch(authCheckState(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
