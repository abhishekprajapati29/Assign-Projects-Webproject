import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import formatBytes from '../../../formatbytes';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    height: '100%',
    width: '100%'
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function Album(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([])
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    if(props.data){
      setLeft(props.data.filter(FL=>{return FL.selected === false}))
      setRight(props.data.filter(FL=>{return FL.selected === true}))
    }
  }, [props.data])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setChecked(not(checked, leftChecked));
    props.handleCheckedRightAlbum(checked);
  };

  const handleCheckedLeft = () => {
    setChecked(not(checked, rightChecked));
    props.handleCheckedLeftAlbum(checked)
  };

  const customList = (title, items) => (
    <Card style={{height: '400px'}}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)} >
              <ListItemIcon>
              <img alt='images' src="https://img.icons8.com/color/24/000000/image.png"/>
              </ListItemIcon>
              {
                (value.imagelistsize!==null)?
                (
                  <ListItemText id={labelId} primary={`${value.title}(${formatBytes(value.imagelistsize)})`} />
                ):
                (<ListItemText id={labelId} primary={`${value.title}(0)`} />)
              }
              
              <ListItemIcon>
                
                    <Checkbox
                      checked={checked.indexOf(value) !== -1 }
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
              </ListItemIcon>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item style={{height: '100%', width: '40%'}}>{customList('Unselected', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item style={{height: '100%', width: '40%'}}>{customList('Selected', right)}</Grid>
    </Grid>
  );
}
