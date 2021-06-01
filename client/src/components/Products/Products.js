import React from 'react';
import { Product } from '../';
import { Grid } from '@material-ui/core';

function Products(props) {
  return (
    <>
      <Grid container spacing={3} style={{ maxWidth: 1000 }}>
        {props.currentProductsPage.map((item) => (
          <Grid item xs={4} key={item.id}>
            <Product {...item}></Product>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Products;
