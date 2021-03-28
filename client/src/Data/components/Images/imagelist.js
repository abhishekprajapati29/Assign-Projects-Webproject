import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Gallery from "react-grid-gallery";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import axios from "axios";
import { DropzoneDialog } from "material-ui-dropzone";
import CardHeader from "../../../components/css/Card/CardHeader";
import Card from "../../../components/css/Card/Card";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import { CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import Loading from "../../../loading.js";
import LinearWithValueLabel from "../../../progress.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  root1: {
    padding: "60px 20px 0 20px",
  },
  gridList: {
    width: "100%",
    minHeight: 710,
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
    marginRight: theme.spacing(0.5),
  },
  fab: {
    color: "white",
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(5),
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
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
}));

function Images(props) {
  const classes = useStyles();

  const handleDownloadButton = (data) => {
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + props.token,
    };
    axios.get(`https://${props.url}/imagelist/${data.id}`).then((res) => {
      axios({
        url: res.data.src,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${res.data.caption}.jpg`);
        document.body.appendChild(link);
        link.click();
      });
    });
  };

  const [open4, setOpen4] = React.useState(false);

  const handleClose4 = () => {
    setOpen4(false);
  };

  function handleSave(event) {
    props.handleSave(event);
    setOpen4(true);
  }

  return (
    <div className={classes.root1}>
      <div>
        <Button
          href="/data"
          color="primary"
          variant="contained"
          style={{
            margin: "0 15px 0 20px",
            background: "black",
            color: "aliceblue",
            boxShadow:
              "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)",
          }}
        >
          <Icon
            className={clsx(classes.icon, "fas fa-arrow-left")}
            variant="outlined"
          />
          Back to Albums
        </Button>
      </div>
      <Card className={clsx(classes.root)}>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Images</h4>
          <p className={classes.cardCategoryWhite}>Lists of Memories</p>
        </CardHeader>
        <CardContent>
          {props.loadingCreate && (
            <CircularProgress size={48} className={classes.buttonProgress} />
          )}

          <div spacing={1} className={classes.gridList}>
            {!props.loading ? (
              <Gallery
                images={props.data}
                enableLightbox={true}
                enableImageSelection={false}
                currentImageWillChange={props.onCurrentImageChange}
                customControls={[
                  <ButtonGroup
                    key={props.data}
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    <Button
                      key="deleteImage"
                      onClick={(event) =>
                        props.handleDeleteButton(
                          props.data[props.datastate.currentImage]
                        )
                      }
                    >
                      Delete Image
                    </Button>
                    <Button
                      key="Download"
                      onClick={(event) =>
                        handleDownloadButton(
                          props.data[props.datastate.currentImage]
                        )
                      }
                    >
                      Download
                    </Button>
                  </ButtonGroup>,
                ]}
              />
            ) : (
              <Loading />
            )}
          </div>
          {props.uploadPercentage !== 0 ? (
            <Dialog
              open={open4}
              aria-labelledby="alert-dialog-title"
              style={{ minWidth: "600px" }}
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                style={{ minWidth: "600px" }}
              >
                {"UPLOADING"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <LinearWithValueLabel
                    loaded={props.loaded}
                    total={props.total}
                    progress={props.uploadPercentage}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => props.handlerequestCancel()}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            () => handleClose4()
          )}

          <DropzoneDialog
            open={props.datastate.open}
            onSave={(event) => handleSave(event)}
            acceptedFiles={["image/*"]}
            showPreviews={true}
            maxFileSize={5000000}
            filesLimit={1}
            dropzoneText="Drag and drop an Image file here or click"
            onClose={(event) => props.handleClose(event)}
          />
        </CardContent>
      </Card>
      <Tooltip
        title="Add Images"
        aria-label="add"
        onClick={props.handleOpen}
        style={{ position: "fixed", right: "99px", bottom: "36px", zIndex: 1 }}
      >
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

class Imagelist extends Component {
  state = {
    caption: "",
    image: null,
    currentImage: 0,
    imagelist: [],
    token: null,
    open: false,
    loading: true,
    loadingCreate: false,
    uploadPercentage: 0,
    loaded: 0,
    total: 0,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handlerequestCancel = () => {
    window.location.reload(false);
  };

  handleSave = (event) => {
    this.setState({
      open: false,
    });
    const file = event[0];
    this.handleSubmit(file);
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  onCurrentImageChange = (index) => {
    this.setState({ currentImage: index });
  };
  componentDidMount() {
    const { token } = this.props;
    if (token) {
      axios.defaults.headers = {
        "Content-Type": "application.json",
        Authorization: "Token " + token,
      };
      const imageID = this.props.match.params.imageID;
      axios.get(`https://${this.props.url}/images/${imageID}`).then((res) => {
        this.setState({
          imagelist: res.data.imagelist,
          token: this.props.token,
          loading: false,
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
      const imageID = this.props.match.params.imageID;
      axios.get(`https://${this.props.url}/images/${imageID}`).then((res) => {
        this.setState({
          imagelist: res.data.imagelist,
          token: this.props.token,
          loading: false,
        });
      });
    }
  }
  handleSubmit = (data) => {
    let form_data = new FormData();
    form_data.append("album_id", this.props.match.params.imageID);
    form_data.append("src", data);
    form_data.append("thumbnail", data);
    form_data.append("caption", data.name);
    form_data.append("size", data.size);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        this.setState({
          total: total,
        });
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent, loaded: loaded });
        }
      },
    };
    const url_post = `https://${this.props.url}/imagelist/`;
    axios.defaults.headers = {
      "Content-Type": "application.json",
      Authorization: "Token " + this.props.token,
    };
    axios
      .post(url_post, form_data, options, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.handledata(res.data);
        this.setState({ uploadPercentage: 100 }, () => {
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 });
          }, 1000);
        });
        this.setState({
          caption: "",
          image: null,
          loadingCreate: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handledata = (data) => {
    this.setState((previousState) => ({
      imagelist: [...previousState.imagelist, data],
    }));
  };

  handleDeleteButton = (data) => {
    if (
      window.confirm(
        `Are you sure you want to delete image number ${
          this.state.currentImage + 1
        }?`
      )
    ) {
      var images = this.state.imagelist.slice();
      images.splice(this.state.currentImage, 1);
      this.setState({
        imagelist: images,
      });
      axios.delete(`https://${this.props.url}/imagelist/${data.id}`);
    }
  };

  render() {
    return (
      <Images
        handleSave={this.handleSave}
        loaded={this.state.loaded}
        total={this.state.total}
        handlerequestCancel={this.handlerequestCancel}
        uploadPercentage={this.state.uploadPercentage}
        loadingCreate={this.state.loadingCreate}
        loading={this.state.loading}
        url={this.props.url}
        data={this.state.imagelist}
        token={this.state.token}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        onCurrentImageChange={this.onCurrentImageChange}
        handleDeleteButton={this.handleDeleteButton}
        handleSubmit={this.handleSubmit}
        datastate={this.state}
        handleCreateData={this.handleCreateData}
        handleImageCreate={this.handleImageCreate}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    url: state.baseurl,
  };
};
export default connect(mapStateToProps)(Imagelist);
