import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, TextField, Button, Link as LinkStyled, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import { userActions } from '../../store/user';

function Registration() {
  const dispatch = useDispatch();
  const { messageError } = useSelector((state) => state.user);
  // const
  const [form, setForm] = useState({ name: '', surname: '', phone: '', email: '', password: '', address: '' });
  // const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userActions.registrationUser(form));
  };

  // useEffect(() => {
  // });

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
            Регистрация
          </Typography>

          <form noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Имя"
                  onChange={handleChange}
                  value={form.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  label="Фамилия"
                  name="surname"
                  autoComplete="lname"
                  onChange={handleChange}
                  value={form.surname}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  //   margin="normal"
                  fullWidth
                  name="address"
                  label="Адрес"
                  type="address"
                  id="address"
                  autoComplete="current-address"
                  onChange={handleChange}
                  value={form.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  //   margin="normal"
                  fullWidth
                  name="phone"
                  label="Номер телефона"
                  type="phone"
                  id="phone"
                  autoComplete="current-phone"
                  onChange={handleChange}
                  value={form.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Почта"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={form.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  //   margin="normal"
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={form.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0px 16px' }}
              onClick={handleSubmit}
            >
              Зарегистрироваться
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <LinkStyled variant="body2" component={Link} to={'/authorization'}>
                  Уже есть аккаунт? Вход
                </LinkStyled>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Registration;
