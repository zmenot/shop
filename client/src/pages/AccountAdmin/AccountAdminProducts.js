import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from '../../store/user';
// import { prdouctActions } from '../../store/product';

import { categoryActions } from '../../store/category';

import { Typography, IconButton, Select, MenuItem, Paper, TextField, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Check, Add, Remove } from '@material-ui/icons';
import { prdouctActions } from '../../store/product';

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

function AccountAdminProducts() {
  const { user, product, category } = useSelector((state) => state);

  

  const columns = [
    { field: 'id', hide: true, width: 60 },
    {
      field: 'img',
      headerName: 'Фото',
      width: 200,
      renderCell: (params) => {
        const isNewImage = params.row.pathNewImg === undefined ? false : true;
        return (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {isNewImage && <img src={`${params.row.pathNewImg}`} alt=""></img>}
            {!isNewImage && <img src={`http://localhost:5000/${params.formattedValue}`} alt=""></img>}

            <input
              type="file"
              style={{ opacity: 0, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              onChange={(e) => {
                const file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                  setProducts([
                    ...products.map((item) => {
                      if (item.id === params.row.id) {
                        item.pathNewImg = e.target.result;
                        item.img = file;
                        return item;
                      }
                      return item;
                    }),
                  ]);
                };
              }}
            ></input>
          </div>
        );
      },
      cellClassName: 'cell-img',
    },
    { field: 'name', headerName: 'Название', width: 300, editable: true },
    { field: 'price', headerName: 'Цена', width: 170, editable: true },
    { field: 'price_stock', headerName: 'По скидке', width: 170, editable: true },
    {
      field: 'categoryId',
      headerName: 'Категория',
      width: 170,
      renderCell: (params) => {
        return (
          <Select
            value={params.row.categoryId === null ? false : params.row.categoryId}
            onChange={(e) => {
              e.stopPropagation();
              setProducts([
                ...products.map((item) => {
                  if (item.id === params.row.id) {
                    item.categoryId = e.target.value === false ? null : e.target.value;
                    return item;
                  }
                  return item;
                }),
              ]);
            }}
            displayEmpty
            fullWidth
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={false}>
              <em>None</em>
            </MenuItem>
            {category.categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: 'save',
      width: 80,
      sortable: false,
      renderCell: () => (
        <IconButton>
          <Check />
        </IconButton>
      ),
      cellClassName: 'cell-default ',
      headerClassName: 'cell-header',
    },
    {
      field: 'delete',
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

  const dispatch = useDispatch();
  const [products, setProducts] = useState(JSON.parse(JSON.stringify(product.allProducts)));
  const [form, setForm] = useState({ name: '', price: '', price_stock: 0, categoryId: null, img: '' });

  useEffect(() => {
    dispatch(categoryActions.getAllCategories());
  }, []);
  useEffect(() => {
    setProducts(JSON.parse(JSON.stringify(product.allProducts)));
  }, [product]);

  const classes = useStyles();

  const handleClickDelete = (id) => {
    dispatch(prdouctActions.deleteOne({ id }));
  };
  const handleClickSave = (fields) => {
    var formData = new FormData();
    for (const field in fields) {
      formData.set(field, fields[field]);
    }
    dispatch(prdouctActions.update(formData));
  };

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value === false ? null : e.target.value });
    // console.log(form);
  };

  const handleAddProduct = () => {
    var formData = new FormData();
    for (const field in form) {
      formData.set(field, form[field]);
    }
    dispatch(prdouctActions.create(formData));
  };

  return (
    <>
      <Typography variant="h4">Товары</Typography>

      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          className={classes.root}
          rows={products}
          columns={columns}
          pageSize={10}
          selectable={false}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableSelectionOnClick={true}
          onEditCellChange={(params) =>
            setProducts([
              ...products.map((item) => {
                if (item.id === params.id) {
                  item[params.field] = params.props.value;
                  return item;
                }
                return item;
              }),
            ])
          }
          onRowClick={(params, e) => {
            if (e.target.closest('.MuiDataGrid-cell')) {
              const targetCell = e.target.closest('.MuiDataGrid-cell');
              if (targetCell.dataset.field && targetCell.dataset.field === 'delete') {
                handleClickDelete(params.row.id);
              }
              if (targetCell.dataset.field && targetCell.dataset.field === 'save') {
                handleClickSave({ ...params.row });
              }
            }
          }}
        />
      </div>
      <Typography variant="h4">Добавить товар</Typography>
      <Paper style={{ width: 300, padding: '0px 10px 10px 10px' }}>
        <TextField
          id="name"
          label="Название"
          name="name"
          autoComplete="current-password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={form.name}
          onChange={(e) => {
            handleChangeForm(e);
          }}
        />
        <TextField
          id="price"
          label="Цена"
          name="price"
          autoComplete="current-password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={form.price}
          onChange={(e) => {
            handleChangeForm(e);
          }}
        />
        <TextField
          id="price_stock"
          label="Цена по скидке"
          name="price_stock"
          autoComplete="current-password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={form.price_stock}
          onChange={(e) => {
            handleChangeForm(e);
          }}
        />
        <Typography variant="h6">Категория</Typography>
        <Select
          name="categoryId"
          value={form.categoryId === null ? false : form.categoryId}
          onChange={(e) => {
            e.stopPropagation();
            handleChangeForm(e);
          }}
          displayEmpty
          fullWidth
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={false}>
            <em>None</em>
          </MenuItem>
          {category.categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <input
          style={{ display: 'none' }}
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => {
            // const file = e.target.files[0];
            setForm({ ...form, img: e.target.files[0] });
          }}
        />
        <label htmlFor="contained-button-file" style={{ margin: '10px 0px' }}>
          <Button variant="contained" color="primary" component="span" fullWidth style={{ margin: '10px 0px' }}>
            Фото
          </Button>
        </label>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          style={{ margin: '10px 0px' }}
          onClick={() => {
            handleAddProduct();
          }}
        >
          Добавить
        </Button>
      </Paper>
    </>
  );
}

export default AccountAdminProducts;
