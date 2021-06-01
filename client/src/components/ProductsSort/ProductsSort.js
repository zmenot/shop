import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

function ProductsSort(props) {
  return (
    <>
      <Select
        style={{ width: 200 }}
        value={props.selectedIndex}
        onChange={(e) => {
          props.handleChangeSort(e, e.target.value);
        }}
      >
        <MenuItem value={'price_low'}>Цены: по возрастанию</MenuItem>
        <MenuItem value={'price_high'}>Цены: по убыванию</MenuItem>
        {/* <MenuItem value={'none'}>Без сортировки</MenuItem> */}
      </Select>
    </>
  );
}

export default ProductsSort;
