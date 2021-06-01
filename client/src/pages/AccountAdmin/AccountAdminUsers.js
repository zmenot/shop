import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from '../../store/user';
import { Typography, IconButton } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Check } from '@material-ui/icons';

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
  { field: 'name', headerName: 'Firs name', width: 170, editable: true },
  { field: 'surname', headerName: 'Last name', width: 170, editable: true },
  {
    field: 'address',
    headerName: 'address',
    width: 170,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'phone',
    width: 170,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',
    width: 170,
    editable: true,
  },
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

function AccountAdminUsers() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, []);

  const handleClickDelete = (id) => {
    dispatch(userActions.deleteUserByIdService(id));
  };

  const handleClcikSave = (data) => {
    dispatch(userActions.updateUserByIdService(data));
  };

  const classes = useStyles();

  return (
    <>
      {console.log('render')}
      <Typography variant="h4">Пользователи</Typography>
      {user.allUsers && (
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            className={classes.root}
            rows={user.allUsers}
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
                  handleClickDelete(params.id);
                }
                if (targetCell.dataset.field && targetCell.dataset.field === 'save') {
                  handleClcikSave({ ...params.row });
                }
              }
            }}
          />
        </div>
      )}
    </>
  );
}

export default AccountAdminUsers;
