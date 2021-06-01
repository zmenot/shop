import React from 'react';
import { Header } from '../../components/';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { LocalShipping, AlarmOn, LocalMall } from '@material-ui/icons';

const data = [
  {
    title: 'Бесплатная доставка на дом ',
    description: 'Доставим в удобное для вас время',
    icon: <LocalShipping />,
  },
  {
    title: 'Экономия времени',
    description: 'Вместо долгих поездок в супермаркет вы получаете свежие продукты на дом по ценам магазина',
    icon: <AlarmOn />,
  },
  {
    title: 'Ассортимент на каждый день',
    description:
      'Мы тщательно следим за качеством и свежестью товаров, а также за ассортиментом, где каждый найдет то, что любит. Если вы хотите добавить позицию – просто напишите нам',
    icon: <LocalMall />,
  },
];

const rednerList = (list) => {
  return (
    <List style={{ display: 'flex', flexDirection: 'row' }}>
      {list.map((item, index) => {
        return (
          <>
            <ListItem
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                maxWidth: 400,
              }}
            >
              <ListItemText
                style={{ height: '40px', flex: 'none' }}
                primary={
                  <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                    <ListItemIcon style={{ minWidth: 30 }} color="primary">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="h6"> {item.title}</Typography>
                    </ListItemText>
                  </div>
                }
              ></ListItemText>
              <ListItemText primary={item.description} style={{ textAlign: 'justify' }}></ListItemText>
            </ListItem>
          </>
        );
      })}
    </List>
  );
};
function Info() {
  return (
    <>
      <Header></Header>
      <main style={{ maxWidth: 1920 }}>
        <section>
          <Typography variant="h4" align="center" style={{ padding: '30px 0px' }}>
            Попробуйте, это удобно!
          </Typography>
          <Typography style={{ padding: '15px 15px ' }}>
            История создания FreshFood началась с пользовательского опыта. То, что доставка продуктов – это удобно,
            сомнений не было. Но зачастую был ряд проблем: ограниченный ассортимент, высокие цены, некачественные
            товары – все это не позволяло остановиться на каком-то одном сервисе.
          </Typography>

          <Typography style={{ padding: '15px 15px ' }}>
            Мы продолжали испытывать потребность в качественных продуктах по доступным ценам пока не нашли решение
            в том, чтобы создать собственный проект по доставке FreshFood.
          </Typography>

          <Typography style={{ padding: '15px 15px ' }}>
            Главная ценность того, что мы можем дать людям – это возможность не ходить по магазинам и заняться тем,
            что действительно по душе. В нынешней ситуации актуальность услуги возрастает, так как это еще и
            безопасно.
          </Typography>

          <Typography style={{ padding: '15px 15px ' }}>
            Мы собрали ассортимент свежих овощей и фруктов, мяса и рыбы, выпечки, бакалейных изделий и молочных
            продуктов для того, чтобы вы могли питаться правильно, не лишая при этом вас возможности готовить всей
            семьей и воплощать любые кулинарные фантазии.
          </Typography>
        </section>

        <section style={{ padding: '30px 0px', display: 'flex', justifyContent: 'center' }}>
          {rednerList(data)}
        </section>
      </main>
    </>
  );
}

export default Info;
