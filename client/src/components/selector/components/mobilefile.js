import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import SelecterLoader from './loader'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FileMobile(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value, selected) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleToggleFile(value,selected)
  };

  useEffect(() => {
    if(props.data){
      let file_data = []
      props.data.forEach(data => {
        if(data.selected){
          file_data.push(data.id)
        }
      });
      setChecked(file_data)
    }
  }, [props.data])

  return (
    <List dense className={classes.root} style={{padding: '5px 0', backgroundColor: 'aliceblue'}}>
      {props.data.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem key={value.id} button style={{backgroundColor: 'white', margin: '6px 0'}}>
            <ListItemAvatar>
              <img alt="doc" src="https://img.icons8.com/color/48/000000/documents.png"/>
            </ListItemAvatar>
            <ListItemText id={labelId} primary={value.title} />
            <ListItemSecondaryAction>
            {
                (props.mobileFileLoader.indexOf(value.id) !== -1)?
                (
                    <SelecterLoader />
                  
                ):(
              <Checkbox
                edge="end"
                onChange={handleToggle(value.id, value.selected)}
                checked={checked.indexOf(value.id) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
                )
      }
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
