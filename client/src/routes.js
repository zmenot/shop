import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ROLES } from './constans';
import { AdminRoute, UserRoute } from './routing';
import {
  Shop,
  Authorization,
  Registration,
  Main,
  Info,
  Contacts,
  AccountUserProfile,
  AccountUserBasket,
  AccountAdminUsers,
  AccountUserOrder,
  AccountAdminCategories,
  AccountAdminOrders,
  AccountAdminProducts,
} from './pages';

function routes(isAuth, role) {
  console.log(role);
  return (
    <Switch>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/shop" component={Shop}></Route>

      <Route exact path="/account">
        {isAuth ? (
          role === ROLES.user ? (
            <Redirect to="/account/user/profile"></Redirect>
          ) : (
            <Redirect to="/account/admin/users"></Redirect>
          )
        ) : (
          <Redirect to="/authorization"></Redirect>
        )}
      </Route>

      <AdminRoute
        isAuth={isAuth}
        role={role}
        path="/account/admin/users"
        component={<AccountAdminUsers />}
      ></AdminRoute>

      <AdminRoute
        isAuth={isAuth}
        role={role}
        path="/account/admin/orders"
        component={<AccountAdminOrders />}
      ></AdminRoute>

      <AdminRoute
        isAuth={isAuth}
        role={role}
        path="/account/admin/products"
        component={<AccountAdminProducts />}
      ></AdminRoute>

      <AdminRoute
        isAuth={isAuth}
        role={role}
        path="/account/admin/categories"
        component={<AccountAdminCategories />}
      ></AdminRoute>

      <UserRoute
        isAuth={isAuth}
        role={role}
        path="/account/user/profile"
        component={<AccountUserProfile />}
      ></UserRoute>

      <UserRoute
        isAuth={isAuth}
        role={role}
        path="/account/user/basket"
        component={<AccountUserBasket />}
      ></UserRoute>

      <UserRoute
        isAuth={isAuth}
        role={role}
        path="/account/user/order"
        component={<AccountUserOrder />}
      ></UserRoute>

      <Route exact path="/authorization">
        {isAuth ? <Redirect to="/account"></Redirect> : <Authorization></Authorization>}
      </Route>
      <Route exact path="/registration">
        {isAuth ? <Redirect to="/account"></Redirect> : <Registration></Registration>}
      </Route>
      <Route exact path="/contacts" component={Contacts}></Route>
      <Route exact path="/info" component={Info}></Route>
      <Route exact path="*">
        Not found
      </Route>
    </Switch>
  );
}

export default routes;
