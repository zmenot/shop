import React from 'react';
import { AppBar, Toolbar, List, ListItem, ListItemText, Badge } from '@material-ui/core';
import { ShoppingCart, AccountBox } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../logo.png';

function Header() {
  const { basket } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  return (
    <AppBar position="static" color="primary" style={{ padding: 10 }}>
      <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <List component="nav" style={{ display: 'flex', flexDirection: 'row', width: '20%' }}>
          <ListItem button component={Link} to="/shop">
            <ListItemText primary="Каталог" />
          </ListItem>
          <ListItem button component={Link} to="/info">
            <ListItemText primary="Информация" />
          </ListItem>
          <ListItem button component={Link} to="/contacts">
            <ListItemText primary="Контакты" />
          </ListItem>
        </List>
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <List
          component="nav"
          style={{ display: 'flex', flexDirection: 'row', width: '20%', justifyContent: 'center' }}
        >
          <ListItem button component={Link} to="/account" style={{ width: 'fit-content' }}>
            <AccountBox></AccountBox>
          </ListItem>
          <ListItem button component={Link} to="/account/user/basket" style={{ width: 'fit-content' }}>
            <Badge badgeContent={basket.products.length} color="primary">
              <ShoppingCart></ShoppingCart>
            </Badge>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
