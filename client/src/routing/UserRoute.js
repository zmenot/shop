import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user';
import { basketActions } from '../store/basket';

import { useHistory } from 'react-router-dom';
import { Header, Sidebar } from '../components';
import { Redirect, Route } from 'react-router-dom';
import { ROLES } from '../constans';
import { AssignmentInd, ExitToApp, ShoppingCart, PlaylistAddCheck } from '@material-ui/icons';

function UserRoute(props) {
  const dispatch = useDispatch();

  const handleClickExit = (e) => {
    e.preventDefault();
    dispatch(basketActions.setProducts({ products: [], basketId: null }));
    dispatch(userActions.logoutUser());
  };

  const data = [
    {
      text: 'Профиль',
      link: '/account/user/profile',
      icon: <AssignmentInd />,
    },
    {
      text: 'Корзина',
      link: '/account/user/basket',
      icon: <ShoppingCart />,
    },
    {
      text: 'Оформить заказ',
      link: '/account/user/order',
      icon: <PlaylistAddCheck />,
    },
    {
      text: 'Выход',
      link: '/shop',
      icon: <ExitToApp />,
      handler: handleClickExit,
    },
  ];

  const { isAuth, role, path, component } = props;
  if (isAuth && ROLES.user === role) {
    return (
      <Route path={path} exact>
        <>
          <Header></Header>
          <div style={{ display: 'flex' }}>
            <Sidebar data={data}></Sidebar>

            <main style={{ padding: 30, width: '100%' }}>{component}</main>
          </div>
        </>
      </Route>
    );
  } else {
    return (
      <Route path={path} exact>
        <Redirect to="/authorization"></Redirect>;
      </Route>
    );
  }
}

export default UserRoute;
