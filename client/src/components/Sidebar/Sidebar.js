import React from 'react';
import { Grid, Drawer, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: 240,
    flexShrink: 0,
    display: 'block',
    position: 'relative',
  },
  drawerPaper: {
    paddingTop: 30,
    width: 240,
    position: 'relative',
    height: '95vh',
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  //   console.log(props);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {props.data.map((item) => {
        // console.log(item.handler);
        return (
          <ListItem button component={Link} to={item.link} key={item.text} onClick={item.handler}>
            <ListItemIcon> {item.icon} </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        );
      })}
    </Drawer>
  );
}

export default Sidebar;
