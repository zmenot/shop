import React, { useState, useEffect } from 'react';
import { Header, Products, Categories, ProductsSort, ProductSearch } from '../../components';
import { Pagination } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

function Shop() {
  const { product } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [productsPage, setProductsPage] = useState([]);

  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSort, setCurrentSort] = useState('price_low');
  const [currentSearchBar, setCurrentSearchBar] = useState('');

  useEffect(() => {
    const filtred = [...product.allProducts.map((item) => ({ ...item }))]
      .filter((item) => {
        switch (currentCategory) {
          case 'all':
            return true;
          case 'discount':
            return Number(item.price_stock) > 0;
          default:
            return Number(item.categoryId) === Number(currentCategory);
        }
      })
      .sort((a, b) => {
        const first = Number(a.price_stock) > 0 ? Number(a.price_stock) : Number(a.price);
        const second = Number(b.price_stock) > 0 ? Number(b.price_stock) : Number(b.price);
        return currentSort === 'price_low' ? first - second : second - first;
      })
      .filter((element) => {
        console.log(currentSearchBar);
        return element.name.toLowerCase().includes(currentSearchBar.toLowerCase());
      });
    setProductsPage(filtred);
  }, [product, currentCategory, currentSort, currentSearchBar]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductsPage = productsPage.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <>
      <Header></Header>

      <Grid container justify="space-evenly" style={{ margin: '30px 0 ' }}>
        <Grid item>
          <ProductSearch
            handleChangeSearchBar={(e) => {
              setCurrentSearchBar(e.target.value);
            }}
            value={currentSearchBar}
          ></ProductSearch>
        </Grid>
        <Grid item>
          <ProductsSort
            handleChangeSort={(e, sort) => {
              setCurrentSort(sort);
            }}
            selectedIndex={currentSort}
          ></ProductsSort>
        </Grid>
      </Grid>

      <Grid container justify="space-around" style={{ margin: '30px 0 ' }}>
        <Grid item xs={3}>
          <Categories
            handleChangeCategory={(e, category) => {
              setCurrentCategory(category);
            }}
            selectedIndex={currentCategory}
          ></Categories>
        </Grid>

        <Grid item xs={8}>
          {productsPage.length > 0 && (
            <>
              <Products currentProductsPage={currentProductsPage}></Products>
              <Pagination
                count={Math.ceil(productsPage.length / productsPerPage)}
                onChange={(e, page) => {
                  setCurrentPage(page);
                }}
                shape="rounded"
                style={{ display: 'flex', justifyContent: 'center', padding: '30px 0 ' }}
              />
            </>
          )}
          {currentProductsPage.length === 0 && <Typography variant="h4">Продукты отсутсвуют</Typography>}
        </Grid>
      </Grid>
    </>
  );
}

export default Shop;
