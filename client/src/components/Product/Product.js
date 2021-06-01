import React from 'react';
import { Card, CardMedia, CardContent, Typography, Paper, Button } from '@material-ui/core';
import { ShoppingCart, RemoveShoppingCart } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { basketActions } from '../../store/basket';
import { useHistory } from 'react-router-dom';

function Product({ id, name, price, price_stock, img }) {
  const { user } = useSelector((state) => state);
  const { basket } = useSelector((state) => state);
  const history = useHistory();

  const dispatch = useDispatch();
  const handleAddClick = () => {
    dispatch(basketActions.addBasketProductById({ basketId: basket.basketId, productId: id }));
  };

  const handleDeleteClick = () => {
    dispatch(basketActions.deleteBasketProductById({ basketId: basket.basketId, productId: id }));
  };
  return (
    <Paper
      style={{
        minWidth: 300,
        width: '100%',
        height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // flexGrow: 1,
      }}
    >
      <Card style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <CardMedia
          image={`http://localhost:5000/${img}`}
          style={{ width: 250, height: 250, margin: '0 auto' }}
        ></CardMedia>
        <CardContent>
          <Typography align="center" style={{ marginBottom: 10 }}>
            {name}
          </Typography>
          <Typography
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {price_stock > 0 ? (
              <>
                <span
                  style={{
                    color: '#c3c3c3',
                    textDecoration: 'line-through',
                    fontWeight: 'bolder',
                    paddingRight: 10,
                    fontSize: 12,
                  }}
                >
                  {price} BYN
                </span>
                <span style={{ color: 'red', fontWeight: 'bolder' }}>{price_stock} BYN за 1 шт.</span>
              </>
            ) : (
              <span style={{ color: '#78a206' }}>{price} BYN за 1 шт.</span>
            )}
          </Typography>
          {user.role !== 'ADMIN' &&
            (basket.products.some((item) => item.productId === id) ? (
              <Button
                style={{ background: '#f44336', color: 'white' }}
                variant="contained"
                startIcon={<RemoveShoppingCart />}
                size="small"
                fullWidth
                onClick={(e) => {
                  handleDeleteClick(e);
                }}
              >
                {console.log(user.role)}
                Удалить из корзины
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                startIcon={<ShoppingCart />}
                size="small"
                fullWidth
                onClick={(e) => {
                  if (user.isAuth) {
                    handleAddClick(e);
                  } else {
                    history.push('/authorization');
                  }
                }}
              >
                Добавить в корзину
              </Button>
            ))}
        </CardContent>
      </Card>
    </Paper>
  );
}

export default Product;
