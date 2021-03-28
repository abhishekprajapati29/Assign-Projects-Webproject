import * as actionType from "./actionsType";
import axios from "axios";
import moment from "moment";

export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authFail = (error) => {
  if (error.non_field_errors) {
    return {
      type: actionType.AUTH_FAIL,
      error: error.non_field_errors[0],
    };
  } else {
    if (error.username) {
      return {
        type: actionType.AUTH_FAIL,
        error: error.username[0],
      };
    } else {
      if (error.password) {
        return {
          type: actionType.AUTH_FAIL,
          error: error.password[0],
        };
      }
      if (error.password1) {
        return {
          type: actionType.AUTH_FAIL,
          error: error.password1[0],
        };
      } else {
        return {
          type: actionType.AUTH_FAIL,
          error: "Server Error",
        };
      }
    }
  }
};

export const authSuccess = (token) => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
    value: true,
  };
};

export const authLogout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("profile_id");
  localStorage.removeItem("profile_image_id");
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("https://abhishekpraja.pythonanywhere.com/api/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const teamName = res.data.user.profile.teamName;
        const token = res.data.token;
        const id = res.data.user.id;
        const username = res.data.user.username;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("teamName", teamName);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, username));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data));
      });
  };
};

export const authProfile = (token, username, data) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    };
    const url1 = "https://abhishekpraja.pythonanywhere.com/userprofile/";
    axios
      .post(url1, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const url2 =
          "https://abhishekpraja.pythonanywhere.com/userprofile_image/";
        axios
          .post(url2, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((r) => {
            var curDate = new Date();
            var date = moment(curDate).format("YYYY-MM-DD HH:MM:SS");
            let form_data = new FormData();
            form_data.append("username", data.username);
            form_data.append("status", "TXN_SUCCESS");
            form_data.append("order_id", data.id);
            form_data.append("amount", 0);
            form_data.append("bank_name", "Free");
            form_data.append("transaction_id", data.id);
            form_data.append("txn_date", date);
            const url_post = `https://abhishekpraja.pythonanywhere.com/Subs/`;
            axios
              .post(url_post, form_data, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res1) => {
                dispatch(authSuccess(token, username));
              })
              .catch((err) => console.log(err));
          });
      });
  };
};

export const authSignup = (username, email, password, password1) => {
  return (dispatch) => {
    dispatch(authStart());
    localStorage.setItem("loading", false);
    axios
      .post("https://abhishekpraja.pythonanywhere.com/api/auth/register", {
        username: username,
        email: email,
        password: password,
        password1: password1,
      })
      .then((res) => {
        const id = res.data.user.id;
        const token = res.data.token;
        const username = res.data.user.username;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authProfile(token, username, res.data.user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
