import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { categoryActions } from '../../store/category';
import { Typography, IconButton, Paper, Button, TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Check } from '@material-ui/icons';
import { prdouctActions } from '../../store/product';

const useStyles = makeStyles({
  root: {
    '& .cell-default': {
      cursor: 'pointer',
    },
    '& .cell-header': {
      display: 'none',
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
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'name', headerName: 'Название категории', width: 300, editable: true },
  {
    field: 'save',
    hide: false,
    width: 80,
    sortable: false,
    renderCell: () => (
      <IconButton>
        <Check />
      </IconButton>
    ),
    cellClassName: 'cell-default',
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

function AccountAdminCategories() {
  const { category, product } = useSelector((state) => state);

  const [nameCategory, setNameCategory] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.getAllCategories());
  }, []);

  const handleClickDelete = (categoryId) => {
    dispatch(categoryActions.deleteOneCategory({ categoryId }));
    dispatch(prdouctActions.getAllProducts());
  };

  const handleClcikSave = (categoryId, name) => {
    dispatch(categoryActions.updateCategory({ categoryId, name }));
  };
  const handleClcikAdd = () => {
    dispatch(categoryActions.createCategory({ name: nameCategory }));
  };

  const classes = useStyles();

  return (
    <>
      <Typography variant="h4">Категории</Typography>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          className={classes.root}
          rows={category.categories}
          columns={columns}
          pageSize={10}
          selectable={false}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableSelectionOnClick={true}
          onRowClick={(params, e) => {
            if (e.target.closest('.MuiDataGrid-cell')) {
              const targetCell = e.target.closest('.MuiDataGrid-cell');
              if (targetCell.dataset.field && targetCell.dataset.field === 'delete') {
                handleClickDelete(params.row.id);
              }
              if (targetCell.dataset.field && targetCell.dataset.field === 'save') {
                handleClcikSave(params.row.id, params.row.name);
              }
            }
          }}
        />
      </div>
      <Typography variant="h5" style={{ padding: 10 }}>
        Добаить категорию
      </Typography>
      <Paper style={{ width: 300, padding: '0px 10px 10px 10px' }}>
        <TextField
          id="name"
          label="Name"
          autoComplete="current-password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={nameCategory}
          onChange={(e) => {
            setNameCategory(e.target.value);
          }}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          style={{ padding: 10 }}
          onClick={() => {
            handleClcikAdd();
          }}
        >
          Добавить
        </Button>
      </Paper>
    </>
  );
}

export default AccountAdminCategories;
