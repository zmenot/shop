import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { basketActions } from '../../store/basket';

import { Typography, IconButton } from '@material-ui/core';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { Delete, Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    '& h6': {
      padding: 16,
    },
    '& .cell-default': {
      cursor: 'pointer',
    },
    '& .cell-header': {
      display: 'none',
    },
    '& .cell-img': {
      dispaly: 'flex',
      justifyContent: 'center',
    },
    '& .cell-img img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    '& .control-change': {
      display: 'none',
    },
    '& .MuiDataGrid-cellEditable': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});
const columns = [
  { field: 'id', hide: true },
  {
    field: 'img',
    headerName: 'Фото',
    width: 200,
    renderCell: (params) => {
      return <img src={`http://localhost:5000/${params.formattedValue}`} alt=""></img>;
    },
    cellClassName: 'cell-img',
  },
  { field: 'name', headerName: 'Название', width: 300 },
  { field: 'price', headerName: 'Цена', width: 170 },
  { field: 'count_product', headerName: 'Количество', width: 170 },
  {
    field: 'add',
    hide: false,
    width: 80,
    sortable: false,
    renderCell: () => (
      <IconButton>
        <Add />
      </IconButton>
    ),
    cellClassName: 'cell-default ',
    headerClassName: 'cell-header',
  },
  {
    field: 'remove',
    hide: false,
    width: 80,
    sortable: false,
    renderCell: () => (
      <IconButton>
        <Remove />
      </IconButton>
    ),
    cellClassName: 'cell-default ',
    headerClassName: 'cell-header',
  },
  {
    field: 'delete',
    hide: false,
    width: 80,
    sortable: false,
    renderCell: () => (
      <IconButton>
        <Delete />
      </IconButton>
    ),
    cellClassName: 'cell-default ',
    headerClassName: 'cell-header',
  },
];

function AccountUserBasket() {
  const dispatch = useDispatch();
  const { user, basket, product } = useSelector((state) => state);
  const classes = useStyles();
  const handleDeleteClick = (productId) => {
    dispatch(basketActions.deleteBasketProductById({ basketId: basket.basketId, productId }));
  };
  const handleAddClick = (productId, count_product) => {
    if (count_product > 0) {
      console.log(count_product);
      count_product += 1;
      dispatch(basketActions.updateCountProduct({ basketId: basket.basketId, productId, count_product }));
    }
  };
  const handleRemoveClick = (productId, count_product) => {
    if (count_product > 1) {
      count_product -= 1;
      dispatch(basketActions.updateCountProduct({ basketId: basket.basketId, productId, count_product }));
    }
  };

  return (
    <>
      <Typography variant="h4"> Корзина </Typography>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          className={classes.root}
          rows={basket.products.map((item) => {
            return {
              ...product.allProducts.filter((pr) => pr.id === item.productId)[0],
              count_product: item.count_product,
            };
          })}
          columns={columns}
          components={{
            NoRowsOverlay: () => <GridOverlay>Нет товаров в корзине</GridOverlay>,
            Panel: () => (
              <>
                {/* <Typography variant="h4"></Typography> */}
                <Typography variant="h6">
                  Сумма корзины :
                  {' ' +
                    basket.products
                      .map((item) => {
                        return (
                          item.count_product *
                          product.allProducts.filter((pr) => pr.id === item.productId)[0].price
                        );
                      })
                      .reduce((prev, current) => prev + current, 0) +
                    ' '}
                  б.р.
                </Typography>
              </>
            ),
          }}
          pageSize={10}
          selectable={false}
          autoHeight={true}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableSelectionOnClick={true}
          onRowClick={(params, e) => {
            const targetCell = e.target.closest('.MuiDataGrid-cell');
            if (targetCell.dataset.field && targetCell.dataset.field === 'delete') {
              handleDeleteClick(params.id);
            }
            if (targetCell.dataset.field && targetCell.dataset.field === 'add') {
              handleAddClick(params.id, params.row.count_product);
            }
            if (targetCell.dataset.field && targetCell.dataset.field === 'remove') {
              handleRemoveClick(params.id, params.row.count_product);
            }
          }}
        />
      </div>
    </>
  );
}

export default AccountUserBasket;
