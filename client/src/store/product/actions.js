export const prdouctActionsTypes = {
  SET_ALL_PRODUCTS: 'PRODUCT.SET_ALL_PRODUCTS',
  SET_CURRENT_PRODUCTS: 'PRODUCT.SET_CURRENT_PRODUCTS',
  UPDATE_PRODUCT: 'PRODUCT.UPDATE_PRODUCT',
  DELETE_PRODUCT: 'PRODUCT.DELETE_PRODUCT',
  ADD_PRODUCT: 'PRODUCT.ADD_PRODUCT',
  SET_CURRENT_PRODUCTS_ALL: 'PRODUCT.SET_CURRENT_PRODUCTS_ALL',
  SET_CURRENT_PRODUCTS_BY_DISCOUNT: 'PRODUCT.SET_CURRENT_PRODUCTS_BY_DISCOUNT',
  SET_CURRENT_PRODUCTS_BY_CATEGORY_ID: 'PRODUCT.SET_CURRENT_PRODUCTS_BY_CATEGORY_ID',
  SET_SORT_PRODUCTS: 'PRODUCT.SET_SORT_PRODUCTS',
  // SET_CURRENT_PRODUCTS_DISCOUNT: 'PRODUCT.SET_CURRENT_PRODUCTS_DISCOUNT',
};

const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5000/product/getAll`, {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      dispatch(prdouctActions.setAllProducts(data.products));
      dispatch(prdouctActions.setCurrentProducts(data.products));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const update = (fields) => {
  return async (dispatch) => {
    try {
      console.log(fields);
      const response = await fetch(`http://localhost:5000/product/update`, {
        method: 'POST',
        body: fields,
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      dispatch(prdouctActions.updateProduct(data.product));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const create = (fields) => {
  return async (dispatch) => {
    try {
      console.log(fields);
      const response = await fetch(`http://localhost:5000/product/create`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: fields,
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      dispatch(prdouctActions.addProduct(data.product));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const deleteOne = (fields) => {
  return async (dispatch) => {
    try {
      console.log(fields);
      const response = await fetch(`http://localhost:5000/product/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      dispatch(prdouctActions.deleteProduct(fields));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const prdouctActions = {
  setAllProducts: (payload) => ({ type: prdouctActionsTypes.SET_ALL_PRODUCTS, payload }),
  setCurrentProducts: (payload) => ({ type: prdouctActionsTypes.SET_CURRENT_PRODUCTS, payload }),
  deleteProduct: (payload) => ({ type: prdouctActionsTypes.DELETE_PRODUCT, payload }),
  addProduct: (payload) => ({ type: prdouctActionsTypes.ADD_PRODUCT, payload }),
  updateProduct: (payload) => ({ type: prdouctActionsTypes.UPDATE_PRODUCT, payload }),
  setCurrentProductsAll: () => ({ type: prdouctActionsTypes.SET_CURRENT_PRODUCTS_ALL }),
  setCurrentProductsByCategoryId: (payload) => ({
    type: prdouctActionsTypes.SET_CURRENT_PRODUCTS_BY_CATEGORY_ID,
    payload,
  }),
  setCurrentProductsDiscount: () => ({
    type: prdouctActionsTypes.SET_CURRENT_PRODUCTS_BY_DISCOUNT,
  }),
  getAllProducts,
  update,
  deleteOne,
  create,
};
