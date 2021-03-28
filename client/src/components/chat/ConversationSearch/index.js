import React from "react";
import { connect } from "react-redux";
import "./ConversationSearch.css";
import axios from "axios";

function ConversationSearchs(props) {
  return (
    <div
      className="conversation-search"
      style={{
        boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
        borderRadius: "35px",
        margin: "0 10px 10px 10px",
        background: "linear-gradient(45deg, #3c4858, #e0e0e0)",
      }}
    >
      <input
        type="search"
        className="conversation-search-input"
        placeholder="Search Messages"
        onChange={props.handleChange}
      />
    </div>
  );
}

class ConversationSearch extends React.Component {
  handleChange = (event) => {
    const { token } = this.props;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + token,
    };
    const searchID = event.target.value;
    axios.get(`https://${this.props.url}/userprofile/`).then((res) => {
      const prof = res.data[0];
      if (prof.teamName !== "default_team_name") {
        axios
          .get(
            `https://${this.props.url}/userprofileList/?profile__teamName=${prof.teamName}&search=${searchID}`
          )
          .then((res) => {
            this.props.handleDataChange(res.data);
          });
      }
    });
  };
  render() {
    return <ConversationSearchs handleChange={this.handleChange} />;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};

export default connect(mapStateToProps)(ConversationSearch);
