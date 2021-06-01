import React from 'react';
import { Header } from '../../components';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import { Home, Email, Phone, QueryBuilder } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '.ymaps-2-1-78-controls__toolbar_right': {
      display: 'none',
    },
  },
});

const data = [
  {
    title: 'Адрес',
    description: '220113, г. Минск, Проспект Независимости 19',
    icon: <Home />,
  },
  {
    title: 'Телефон для справок',
    description: '+375 44 611 1149',
    icon: <Phone />,
  },
  {
    title: 'Email',
    description: 'info@freshfood.by',
    icon: <Email />,
  },

  {
    title: 'Время работы офиса',
    description: 'Работаем ежедневно с 9:00 до 20:00',
    icon: <QueryBuilder />,
  },
];
function Contacts() {
  const classes = useStyles();
  return (
    <>
      <Header></Header>
      <main style={{ maxWidth: 1920, padding: '30px 0' }}>
        <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Grid className={classes.root}>
            <iframe
              title="map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A987f36ddc70147e13414fc5d63c43b1735b8c5de75686eb6db6f772c8264f3d5&amp;source=constructor"
              width="500"
              height="500"
              frameborder="0"
            ></iframe>
          </Grid>

          <div>
            <Typography variant="h4">Контакты</Typography>
            <List style={{ display: 'flex', maxWidth: '600px', flexWrap: 'wrap' }}>
              {data.map((item) => {
                return (
                  <ListItem
                    style={{
                      dislay: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      maxWidth: '300px',
                    }}
                  >
                    <ListItemText>
                      <Typography variant="h5" align="left">
                        {item.title}
                      </Typography>
                    </ListItemText>
                    <ListItemText
                      style={{ height: '40px', flex: 'none' }}
                      primary={
                        <div style={{ display: 'flex', height: '40px' }}>
                          <ListItemIcon style={{ minWidth: 30 }} color="primary">
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText>
                            <Typography> {item.description}</Typography>
                          </ListItemText>
                        </div>
                      }
                    ></ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contacts;
