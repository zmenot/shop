import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user';
import { useHistory } from 'react-router-dom';
import { Header, Sidebar } from '../components';
import { Redirect, Route } from 'react-router-dom';
import { ROLES } from '../constans';

import {
  AssignmentInd,
  ExitToApp,
  Assignment,
  PlaylistAddCheck,
  FormatListBulleted,
  LocalOffer,
} from '@material-ui/icons';

function AdminRoute(props) {
  const dispatch = useDispatch();

  const handleClickExit = (e) => {
    e.preventDefault();
    dispatch(userActions.logoutUser());
  };

  const handleClickUsers = (e) => {
    e.preventDefault();
    dispatch(userActions.logoutUser());
  };

  const data = [
    {
      text: 'Пользователи',
      link: '/account/admin/users',
      icon: <AssignmentInd />,
    },
    {
      text: 'Товары',
      link: '/account/admin/products',
      icon: <Assignment />,
    },
    {
      text: 'Заказы',
      link: '/account/admin/orders',
      icon: <PlaylistAddCheck />,
    },
    {
      text: 'Категории',
      link: '/account/admin/categories',
      icon: <FormatListBulleted />,
    },
    // {
    //   text: 'Купоны',
    //   link: '/account/admin/users',
    //   icon: <LocalOffer />,
    // },
    {
      text: 'Выход',
      link: '/shop',
      icon: <ExitToApp />,
      handler: handleClickExit,
    },
  ];
  const { isAuth, role, path, component } = props;
  if (isAuth && ROLES.admin === role) {
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

export default AdminRoute;
