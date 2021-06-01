import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { Container, Typography, Grid, Link as LinkStyled, TextField, Button, Snackbar } from '@material-ui/core';
import { userActions } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
// import jwt_decode from 'jwt-decode';

function Authorization() {
  const dispatch = useDispatch();
  const { messageError } = useSelector((state) => state.user);

  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userActions.loginUser(form));
    // console.log(form);
  };
  return (
    <>
      <Header></Header>
      <Container component="main" maxWidth="xs">
        {messageError && (
          <Snackbar
            open={!!messageError}
            // open={() => {
            //   dispatch(userActions.setMessageError(false));
            //   return true;
            // }}

            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{
              top: '15%',
              right: '10%',
            }}
            onClose={() => {
              dispatch(userActions.setMessageError(false));
            }}
            // on
          >
            <Alert severity="error">{messageError}</Alert>
          </Snackbar>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Почта"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={form.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={form.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0px 16px' }}
              onClick={handleSubmit}
            >
              Войти
            </Button>
            <Grid container justify="flex-end">
              {/* <Grid item xs>
                <LinkStyled variant="body2" component={Link} to="/registration">
                  Forgot password?
                </LinkStyled>
              </Grid> */}
              <Grid item>
                <LinkStyled variant="body2" component={Link} to="/registration">
                  Нету аккаунта? Зарегистрироваться
                </LinkStyled>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Authorization;
