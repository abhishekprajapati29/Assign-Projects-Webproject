import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { DialogTitle } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
  {
    value: 1024,
    label: 'KB',
  },
  {
    value: 1048576,
    label: 'MB',
  },
  {
    value: 1073741824,
    label: "GB",
  },
  {
    value: 1099511628000,
    label: 'TB',
  },
];

export default function ProjectHelp(props) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {handleClose, open
  } = props;
  const [id, setId] = useState(0)
  const [size, setSize] = useState(0)
  const [type, setType] = useState(1024)

  useEffect(() => {
    setSize(props.size)
    setType(props.type)
    setId(props.id)
  }, [props.size, props.type, props.id])
  
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Update Project Size"}</DialogTitle>

        <DialogContent>
            <DialogContentText>
            <Grid container >
                <Grid item xs={12} sm={10}>
                <TextField
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={props.size < 0 ? true : false}
                  variant="outlined"
                  autoFocus
                  id="Allocate Storage"
                  label="Allocate Storage"
                  value={size}
                  style={{ minWidth: "300px" }}
                  onChange={(event) => setSize(event.target.value)}
                  fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Type"
                  value={type}
                  onChange={(event)=>props.handleChange(event)}
                  variant="outlined"
                  style={{textAlignLast: 'right'}}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Disagree
            </Button>
            {size >= 0 ? (
              <Button
                onClick={(event) => props.handleStorageText(event, id, parseInt(size*type))}
                color="primary"
                autoFocus
              >
                Agree
              </Button>
            ) : (
              <Button disabled color="primary" autoFocus>
                Agree
              </Button>
            )}
          </DialogActions>
      </Dialog>
    </div>
  );
}
