import React, { Component } from "react";
import { Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import axios from "axios";

const SearchInputs = (props) => {
  return (
    <Input
      style={{ float: "right" }}
      id="standard-adornment-weight"
      value={props.search}
      onClick={() => props.handleInsertData()}
      onChange={props.handleChange}
      endAdornment={<SearchIcon position="end" />}
      aria-describedby="standard-weight-helper-text"
      inputProps={{
        "aria-label": "search",
      }}
    />
  );
};

class SearchInput extends Component {
  state = {
    seach_data: [],
    search: "",
    team_search: [],
    data: [],
  };

  handleInsertData = () => {
    const { token } = this.props;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + token,
    };
    axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
      const prof = res.data[0];
      if (prof.teamName !== "default_team_name") {
        axios
          .get(
            `https://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}`
          )
          .then((res1) => {
            this.setState({
              team_search: res1.data,
            });
          });
      } else {
        axios.get(`https://${this.props.url}/userprofileList/`).then((res1) => {
          this.setState({
            team_search: res1.data.filter((data) => {
              return data.profile.teamName !== "default_team_name";
            }),
          });
        });
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
    this.props.handleDataChange(
      this.state.team_search.filter((res) => {
        return (
          res.username
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
        );
      })
    );
  };

  render() {
    return (
      <div>
        <SearchInputs
          handleChange={this.handleChange}
          handleInsertData={this.handleInsertData}
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

export default connect(mapStateToProps)(SearchInput);
