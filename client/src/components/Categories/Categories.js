import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { prdouctActions } from '../../store/product';

const useStyles = makeStyles(() => ({
  root: {
    width: 300,
  },
}));

function Categories(props) {
  const { category } = useSelector((state) => state);
  // const [selectedIndex, setSelectedIndex] = useState('all');

  const handleListItemClick = (e, index) => {
    props.handleChangeCategory(e, index);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List>
        <ListItem
          button
          key={'all'}
          selected={props.selectedIndex === 'all'}
          onClick={(e) => {
            handleListItemClick(e, 'all');
            // dispatch(prdouctActions.('all'));
            // dispatch(prdouctActions.setCurrentProductsAll());
          }}
        >
          <ListItemText>
            <Typography>Все товары</Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          button
          key={'discount'}
          selected={props.selectedIndex === 'discount'}
          onClick={(e) => {
            handleListItemClick(e, 'discount');
            // dispatch(prdouctActions.setCurrentProductsDiscount());
          }}
        >
          <ListItemText>
            <Typography>Акции</Typography>
          </ListItemText>
        </ListItem>
        <Divider />

        {category.categories.map((category) => {
          return (
            <React.Fragment key={category.id}>
              <ListItem
                button
                key={category.id}
                selected={props.selectedIndex === category.id}
                onClick={(e) => {
                  handleListItemClick(e, category.id);
                  // dispatch(prdouctActions.setCurrentProductsByCategoryId(category.id));
                }}
              >
                <ListItemText>
                  <Typography>{category.name}</Typography>
                </ListItemText>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

export default Categories;
