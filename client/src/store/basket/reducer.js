import { basketActionsTypes } from './actions';

const InitialState = {
  products: [],
  basketId: null,
};

export const basketReducer = (state = InitialState, action) => {
  switch (action.type) {
    case basketActionsTypes.SET_PRODUCTS:
      return { ...state, ...action.payload };
    case basketActionsTypes.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case basketActionsTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((item) => {
          return item.productId !== action.payload;
        }),
      };
    case basketActionsTypes.SET_COUNT_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) => {
          if (action.payload.productId === item.productId && action.payload.basketId === item.basketId) {
            item.count_product = action.payload.count_product;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
