import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { Typography, List, ListItem, ListItemText, Button, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    '& li div ': {
      width: '50%',
    },
    '& li  ': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.54)',
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& button': {
      minWidth: 200,
      margin: 5,
    },
  },
}));

function AccountUserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({
    id: user.id,
    name: user.name,
    surname: user.surname,
    phone: user.phone,
    address: user.address,
    email: user.email,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClickSave = () => {
    dispatch(userActions.updateCurrentUser(data));
  };
  return (
    <>
      <Typography variant="h4"> Профиль</Typography>
      <div style={{ paddingTop: 20 }} className={classes.root}>
        <List>
          {!editing && (
            <>
              <ListItem>
                <ListItemText primary={'Имя'}> </ListItemText>
                <ListItemText primary={data.name}> </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Фамилия'}> </ListItemText>
                <ListItemText primary={data.surname}> </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Телефон'}> </ListItemText>
                <ListItemText primary={data.phone}> </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Адрес'}> </ListItemText>
                <ListItemText primary={data.address}> </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Почта'}> </ListItemText>
                <ListItemText primary={data.email}> </ListItemText>
              </ListItem>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                Изменить
              </Button>
            </>
          )}

          {editing && (
            <>
              <List>
                <ListItem>
                  <ListItemText primary="Имя" />
                  <ListItemText
                    primary={
                      <>
                        <Input
                          value={data.name}
                          id="name"
                          name="name"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={'Фамилия'}> </ListItemText>
                  <ListItemText
                    primary={
                      <>
                        <Input
                          value={data.surname}
                          id="surname"
                          name="surname"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={'Телефон'}> </ListItemText>
                  <ListItemText
                    primary={
                      <>
                        <Input
                          value={data.phone}
                          id="phone"
                          name="phone"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={'Адрес'}> </ListItemText>
                  <ListItemText
                    primary={
                      <>
                        <Input
                          value={data.address}
                          id="address"
                          name="address"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Button
                variant="contained"
                style={{ background: '#4caf50', color: 'white' }}
                onClick={(e) => {
                  setEditing(!editing);
                  handleClickSave(e);
                }}
              >
                Сохранить
              </Button>
              <Button
                variant="contained"
                style={{ background: '#f44336', color: 'white' }}
                onClick={() => {
                  setEditing(!editing);
                  setData({
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    phone: user.phone,
                    address: user.address,
                    email: user.email,
                  });
                }}
              >
                Отмена
              </Button>
            </>
          )}
        </List>
      </div>
    </>
  );
}

export default AccountUserProfile;
