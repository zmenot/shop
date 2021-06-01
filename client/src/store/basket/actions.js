export const basketActionsTypes = {
  SET_PRODUCTS: 'BASKET.SET_PRODUCT',
  ADD_PRODUCT: 'BASKET.ADD_PRODUCT',
  DELETE_PRODUCT: 'BASKET.DELETE_PRODUCT',
  SET_COUNT_PRODUCT: 'BASKET.SET_COUNT_PRODUCT',
};

const getProductsByUserId = (id) => {
  return async (dispatch) => {
    try {
      console.log(id);
      const response = await fetch('http://localhost:5000/basket/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      dispatch(basketActions.setProducts(data));
    } catch (e) {
      console.log(e);
    }
  };
};

const deleteBasketProductById = ({ basketId, productId }) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/basket/deleteProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ basketId, productId }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      dispatch(basketActions.deleteProduct(productId));
    } catch (e) {
      console.log(e);
    }
  };
};

const addBasketProductById = ({ basketId, productId }) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/basket/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ basketId, productId }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      dispatch(basketActions.addProduct({ ...data.productInBasket }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const updateCountProduct = ({ basketId, productId, count_product }) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/basket/updateCountProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ basketId, productId, count_product }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      dispatch(basketActions.setCountProduct({ basketId, productId, count_product }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const basketActions = {
  addProduct: (payload) => ({ type: basketActionsTypes.ADD_PRODUCT, payload }),
  deleteProduct: (payload) => ({ type: basketActionsTypes.DELETE_PRODUCT, payload }),
  setProducts: (payload) => ({ type: basketActionsTypes.SET_PRODUCTS, payload }),
  setCountProduct: (payload) => ({ type: basketActionsTypes.SET_COUNT_PRODUCT, payload }),
  updateCountProduct,
  getProductsByUserId,
  deleteBasketProductById,
  addBasketProductById,
};
