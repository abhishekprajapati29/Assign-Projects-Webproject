import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Typography, Toolbar } from '@material-ui/core';
import formatBytes from '../../../formatbytes';

export default function SubDetail(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Subscription Detail"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Toolbar>
              <Typography>Type:-</Typography>
              <Typography>{props.data.type}</Typography>
            </Toolbar>
            <Toolbar>
              <Typography>Time:-</Typography>
              <Typography>{props.data.time}</Typography>

            </Toolbar>
            <Toolbar>
              <Typography>Price:-</Typography>
              <Typography>{props.data.price}</Typography>
            </Toolbar>
            <Toolbar>
              <Typography>Team:-</Typography>
              <Typography>{props.data.No_team}</Typography>

            </Toolbar>
            <Toolbar>
              <Typography>Number of Projects:-</Typography>
              <Typography>{props.data.No_of_Projects}</Typography>

            </Toolbar>
            <Toolbar>
              <Typography>Number of Project Member:-</Typography>
              <Typography>{props.data.No_of_project_members}</Typography>

            </Toolbar>
            <Toolbar>
              <Typography>Cloud Storage:-</Typography>
              <Typography>{formatBytes(props.data.cloud_storage_value)}</Typography>

            </Toolbar>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
