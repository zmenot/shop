import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Delete, Check, KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import {
  Typography,
  IconButton,
  TableRow,
  TableCell,
  Collapse,
  Box,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
  Table,
  TablePagination,
} from '@material-ui/core';
import { orderActions } from '../../store/order/actions';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function AccountAdminOrders() {
  const { order } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(orderActions.getAllOders());
  }, []);

  return (
    <>
      <Typography variant="h4">Заказы</Typography>
      <div style={{ padding: '10px 0px ', width: '100%' }}>
        <Typography variant="h5">Ожидание подверждения</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Имя</TableCell>
                <TableCell align="center">Телефон</TableCell>
                <TableCell align="center">Адрес</TableCell>
                <TableCell align="center">Дата</TableCell>
                <TableCell align="center">Способ оплаты</TableCell>
                <TableCell align="center">Комментарии к заказу</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => !row.isConfirmed && <Row key={index} row={row} />)}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={order.orders.filter((item) => !item.isConfirmed).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      <div style={{ padding: '10px 0px ', width: '100%' }}>
        <Typography variant="h5">Подтвержденные</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Имя</TableCell>
                <TableCell align="center">Телефон</TableCell>
                <TableCell align="center">Адрес</TableCell>
                <TableCell align="center">Дата</TableCell>
                <TableCell align="center">Способ оплаты</TableCell>
                <TableCell align="center">Комментарии к заказу</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((row) => row.isConfirmed)
                .map((row, index) => (
                  <Row key={index} row={row} />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={order.orders.filter((item) => item.isConfirmed).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickSave = (e, orderId) => {
    dispatch(orderActions.updateOrder({ orderId, isConfirmed: true }));
  };

  const handleClickDelete = (e, orderId) => {
    console.log(orderId);
    dispatch(orderActions.deleteOneOrder({ orderId }));
  };

  const totalBasketPrice = row.products
    .map((item) => {
      return item.count_product * item.price;
    })
    .reduce((prev, current) => prev + current, 0);

  const classes = useRowStyles();
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.phone}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.payment}</TableCell>
        <TableCell align="center">{row.comments}</TableCell>
        {!row.isConfirmed && (
          <TableCell
            align="center"
            onClick={(e) => {
              const orderId = row.id;
              handleClickSave(e, orderId);
            }}
          >
            <IconButton>
              <Check></Check>
            </IconButton>
          </TableCell>
        )}
        <TableCell
          align="center"
          onClick={(e) => {
            const orderId = row.id;
            handleClickDelete(e, orderId);
          }}
        >
          <IconButton>
            <Delete></Delete>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Корзина , к оплате : {totalBasketPrice} б.р.
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Название</TableCell>
                    <TableCell align="center">Цена</TableCell>
                    <TableCell align="center">Количество</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productsRow) => (
                    <TableRow key={productsRow.id}>
                      <TableCell align="center">{productsRow.name}</TableCell>
                      <TableCell align="center">{productsRow.price}</TableCell>
                      <TableCell align="center">{productsRow.count_product}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default AccountAdminOrders;
