import React from "react";
import "./Compose.css";
import { Smile } from "react-feather";
import Fab from "@material-ui/core/Fab";
import "emoji-mart/css/emoji-mart.css";
import Menu from "@material-ui/core/Menu";
import Emojis from "./emoji.js";
import { Send } from "react-feather";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Loading from "../../../loading";


const useStyles = makeStyles((theme) => ({
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

const Compose = ({
  props,
  handleLike,
  handleEmogi,
  setMessage,
  handleImageUploadFile,
  sendMessage,
  message,
  handleLoadingSend,
  open,
  loadingSend,
  handleClearImage,
  uploadImageName,
  uploadImage,
  handleOpenUploadFile,
  handleCloseUploadFile,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = React.useState('');


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoadingSends = () => {
    props.handleLoadingSend();
  };

  const handleCloseUploadFiles = () => {
    props.handleCloseUploadFile();
  };

  const handleOpenUploadFiles = () => {
    props.handleOpenUploadFile();
  };

  const handleImageUploadFiles = (data) =>{
    props.handleImageUploadFile(data);
    const val = data[0];
    setShow(val.name);
  }

  const handleClearImages=()=>{
    props.handleClearImage();
    setShow("");
  }

  const handletext = (data) => {
    handleEmogi(data);
  };
  console.log()
  return (
    <>
      <div >
      <DropzoneDialog
            open={open}
            onSave={(event) => handleImageUploadFiles(event)}
            acceptedFiles={["image/*"]}
            showPreviews={true}
            maxFileSize={6000000}
            filesLimit={1}
            dropzoneText="Drag and drop an Album Image here or click"
            onClose={handleCloseUploadFiles}
          />
          <div style={{padding: '10px'}}>
          {(show != '')?<Card style={{width: '100%',boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)"}}>
             <CardHeader style={{padding: '0',marginRight: '0'}} title={show} action={<Fab
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "unset",
                }}
                className="toggle-emoji"
                onClick={handleClearImages}
              >
                <img
                  alt="delete"
                  src="https://img.icons8.com/metro/26/000000/cancel.png"
                />
              </Fab>} />
           </Card>:null}
           </div>
          <Card style={{width: '100%',boxShadow: "0 4px 20px 0 #9e9e9e, 0 7px 10px -5px rgba(244, 67, 54,.4)"}}>
           
          <CardHeader style={{padding: '0',marginRight: '0'}}
        avatar={
          <Fab
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "unset",
                }}
                className="toggle-emoji"
                onClick={handleOpenUploadFiles}
              >
                <img
                  alt="like"
                  src="https://img.icons8.com/material-outlined/24/000000/image.png"
                />
              </Fab>
        }
        action={
          <div style={{padding: '5px'}}>
          <Fab
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "unset",
                }}
                className="toggle-emoji"
                onClick={handleClick}
              >
                <img
                  alt="s"
                  src="https://img.icons8.com/fluent-systems-regular/24/000000/happy.png"
                />
              </Fab>
              <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Emojis
                toggleEmojiPicker={props.toggleEmojiPicker}
                handletext={handletext}
              />
            </Menu>
            {
              (props.loadingSend)?(
                <Loading />
              ):(<Fab
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "unset",
                }}
                className="toggle-emoji"
                onClick={(e) => {
                  setShow('');
                  sendMessage(e)}}
              >
                <img
                  alt="send"
                  src="https://img.icons8.com/material-sharp/24/000000/filled-sent.png"
                />
              </Fab>)
            }
            
            </div>
        }
        title={<input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        /> }/></Card >
      </div>
      {/* <div className={classes.sectionMobile}>
        <form
          // onSubmit={props.handleSubmit}
          style={{ margin: "0 auto" }}
        >
          <input
            type="text"
            className="compose-input1"
            placeholder="Type a message"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
          <Fab
            style={{
              backgroundColor: "transparent",
              boxShadow: "unset",
              margin: "-5px",
            }}
            className="toggle-emoji"
            onClick={handleClick}
          >
            <Smile style={{ color: "darkgrey" }} />
          </Fab>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Emojis
              toggleEmojiPicker={props.toggleEmojiPicker}
              handletext={handletext}
            />
          </Menu>
          <Fab
            style={{
              backgroundColor: "transparent",
              boxShadow: "unset",
              margin: "-5px",
            }}
            className="toggle-emoji"
            onClick={(e) => sendMessage(e)}
          >
            <Send style={{ transform: "rotate(45deg)" }} />
          </Fab>
        </form>
      </div> */}
    </>
  );
};

export default Compose;
