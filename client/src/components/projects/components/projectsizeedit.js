import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { DialogTitle, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import formatBytes1 from './formatAllocate.js'

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
  const [type, setType] = React.useState(1024);
  const [button, setButton] = React.useState(true);

  const handleChange = (event) => {
    setType(event.target.value);
    if(parseInt(props.data)> parseInt(size*event.target.value)){
      setButton(false)
    }
    else
    {
      setButton(true)
    }
  };  

  const handleSize=(event)=>{
    setSize(event.target.value);
    if(parseInt(props.data)> parseInt(event.target.value*type)){
      setButton(false)
    }
    else
    {
      setButton(true)
    }
  }
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {handleClose, open
  } = props;
  const [sizes,types] = formatBytes1(props.data)


  const [size, setSize] = useState(0) 

  useEffect(() => {
    
    if(types && sizes){
      setSize(sizes);
      let type_data = 0;
      currencies.forEach(type=>{
        if(type.label === types){
          type_data = type.value
        }
      })
      setType(type_data)
    }
    
  }, [sizes,types])
  
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
                  error={size >= 0 && button ? false : true}
                  variant="outlined"
                  autoFocus
                  id="Allocate Storage"
                  label="Allocate Storage"
                  value={size}
                  style={{ minWidth: "300px" }}
                  onChange={(event) => handleSize(event)}
                  fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={2}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Type"
                  error={size >= 0 && button ? false : true}
                  value={type}
                  onChange={handleChange}
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
            {size >= 0 && button ? (
              <Button
                onClick={(event) => props.handleStorageUpdate1(event, props.datastate.project_update_id, parseInt(size*type))}
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
