import React from 'react';
import { Header } from '../../components/';
import { Link } from 'react-router-dom';
import { Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  CheckCircleOutline,
  BeachAccessRounded,
  ShoppingCartRounded,
  ThumbUpAltOutlined,
  AirplanemodeActiveOutlined,
} from '@material-ui/icons';

const dataSection = [
  {
    title: 'Проверенное качество',
    description: 'Все товары проходят обязательную сертификацию, подтверждающую их безопасность.',
    icon: <CheckCircleOutline />,
  },
  {
    title: 'Комфортный сервис',
    description:
      'Мы гарантируем своим клиентам не только исключительное качество продуктов и демократичные цены, но и обеспечиваем комфортный сервис для своих клиентов.',
    icon: <BeachAccessRounded />,
  },
  {
    title: 'Широкий ассортимент',
    description:
      'FreshFood – это широкий ассортимент свежих продуктов, напитков, свежей выпечки, бакалеи и сопутствующих товаров. Мы планируем постоянно добавлять новые позиции для того, чтобы делать покупки наших клиентов еще удобнее и безопаснее.',
    icon: <ShoppingCartRounded />,
  },
  {
    title: 'Удобный заказ и оплата',
    description:
      'Оформление заказа происходит в один клик. Оплату можно произвести наличными и картой при получении товара.',
    icon: <ThumbUpAltOutlined />,
  },
  {
    title: 'Быстрая доставка',
    description:
      'Доставка осуществляется день в день в удобное для вас время либо ближайшую доступную дату, выбранную при оформлении заказа.',
    icon: <AirplanemodeActiveOutlined />,
  },
  {
    title: 'Свежесть продуктов',
    description:
      'Мы заботимся о здоровье покупателей, поэтому тщательно следим за качеством поставщиков и свежестью продукции. Избегая долгого хранения, мы собираем заказ непосредственно перед выездом. Это позволяет привозить исключительно свежие продукты в ваш дом.',
    icon: <AirplanemodeActiveOutlined />,
  },
];

const rednerList = (list) => {
  return (
    <List>
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
                style={{}}
                primary={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon style={{ minWidth: 30 }} color="primary">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="h6"> {item.title}</Typography>
                    </ListItemText>
                  </div>
                }
              ></ListItemText>
              <ListItemText primary={item.description} style={{ paddingLeft: 30 }}></ListItemText>
            </ListItem>
          </>
        );
      })}
    </List>
  );
};

function Main() {
  return (
    <>
      <Header></Header>
      <main>
        <section style={{ maxWidth: 1920 }}>
          <Link to="/shop">
            <img src="img/img-main-1.png" alt="img-main" style={{ width: '100%' }} />
          </Link>
        </section>
        <section style={{ maxWidth: 1920, padding: '30px 0px' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src="img/img-main-2.png" alt="img-main" />
            <Typography variant="h6"> Доставка свежести в каждый дом</Typography>
          </div>
        </section>
        {/* <section style={{ maxWidth: 1920, padding: '30px 0px' }}>
          <Typography variant="h4"> здесь вкрутить свайпер по категориям (swiper react)</Typography>
        </section> */}
        <section style={{ maxWidth: 1920, padding: '30px 0px' }}>
          <Grid container justify="center" alignItems="center">
            <Grid item> {rednerList(dataSection.slice(0, 3))}</Grid>
            <Grid item>
              <img src="/img/img-main-3.jpg" alt="img-main" srcset="" />
            </Grid>
            <Grid item>{rednerList(dataSection.slice(3, 6))}</Grid>
          </Grid>
        </section>
      </main>
    </>
  );
}

export default Main;
