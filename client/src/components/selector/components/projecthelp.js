import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ProjectHelp(props) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {handleClose, open
  } = props;
  

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={(event)=>handleClose(event)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={(event)=>handleClose(event)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
