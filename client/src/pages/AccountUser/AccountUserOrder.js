import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { basketActions } from '../../store/basket';
import { orderActions } from '../../store/order';
import moment from 'moment';

import {
  Typography,
  IconButton,
  Paper,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Modal,
} from '@material-ui/core';

// const useStyles = makeStyles (()=>{
//   root:
// })
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function AccountUserOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, basket, product } = useSelector((state) => state);
  const [form, setForm] = useState({
    name: user.name,
    address: user.address,
    phone: user.phone,
    comments: '',
    payment: 'Оплата по карте',
    basketId: basket.basketId,
    date: '',
  });
  console.log();
  const [open, setOpen] = useState(false);
  const totalBasketPrice = basket.products
    .map((item) => {
      return item.count_product * product.allProducts.filter((pr) => pr.id === item.productId)[0].price;
    })
    .reduce((prev, current) => prev + current, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    // setForm({ ...form, date: moment().format('DD/MM/YY hh:mm') });
    dispatch(orderActions.createOrder({ ...form, date: moment().format('DD/MM/YY HH:mm') }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Typography variant="h4"> Оформление заказа </Typography>
      <Modal className={classes.modal} open={open}>
        <div className={classes.paper}>
          <Typography variant="h4" style={{ textAlign: 'center', padding: 10 }}>
            Ваш заказ принят
          </Typography>
          <Typography variant="subtitle1" style={{ textAlign: 'center', padding: 10 }}>
            В течении нескольких минут с вами свяжется наш оператор для подтверждения заказа.
          </Typography>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Ок!
          </Button>
        </div>
      </Modal>
      {totalBasketPrice >= 35 ? (
        <>
          <Paper style={{ padding: 10, width: 600 }}>
            <form>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Имя"
                name="name"
                margin="normal"
                value={form.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Адрес доставки"
                name="address"
                margin="normal"
                value={form.address}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Номер телефона для подтверждения заказа"
                name="phone"
                margin="normal"
                value={form.phone}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <TextField
                id="comments"
                name="comments"
                label="Комментарии к заказу"
                placeholder="Комментарии к заказу"
                fullWidth
                margin="normal"
                multiline
                variant="outlined"
                value={form.comments}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <RadioGroup
                name="payment"
                value={form.payment}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <FormControlLabel
                  value="Оплата по карте"
                  control={<Radio color="primary" />}
                  label="Оплата по карте"
                />
                <FormControlLabel
                  value="Оплата наличными"
                  control={<Radio color="primary" />}
                  label="Оплата наличными"
                />
              </RadioGroup>
              <Typography variant="subtitle1" style={{ padding: '10px 0px' }}>
                Сумма корзины : {totalBasketPrice} б.р.
              </Typography>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Оформить заказ
              </Button>
            </form>
          </Paper>
        </>
      ) : (
        <Typography variant="subtitle1" style={{ padding: '10px 0px' }}>
          Сумма корзины для оформления заказа должна быть больше 35 рублей.
        </Typography>
      )}
    </>
  );
}

export default AccountUserOrder;
