import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import routes from './routes';
import theme from './theme';
import { userActions } from './store/user/actions';
import { prdouctActions } from './store/product/actions';
import { basketActions } from './store/basket/actions';
import { categoryActions } from './store/category/actions';

import jwt_decode from 'jwt-decode';
import { CircularProgress } from '@material-ui/core';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    // dispatch(userActions.setUser({ ...jwt_decode(data.token), token: data.token, isAuth: true }));
    const fetchData = async () => {
      const data = await userActions.authUser();
      if (data) {
        dispatch(userActions.setUser({ ...jwt_decode(data.token), token: data.token, isAuth: true }));
      }
      setLoad(false);
    };

    fetchData();

    // dispatch(userActions.authUser());
    dispatch(prdouctActions.getAllProducts());
    dispatch(categoryActions.getAllCategories());
  }, []);

  useEffect(() => {
    if (user.isAuth) {
      dispatch(basketActions.getProductsByUserId(user.id));
    }
  }, [user.isAuth]);

  if (load) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        {console.log('render main')}
        <Router>{routes(user.isAuth, user.role)}</Router>
      </ThemeProvider>
    );
  }
}
export default App;
