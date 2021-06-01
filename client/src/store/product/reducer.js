import { prdouctActionsTypes } from './actions';
import { SORTS } from '../../constans';

const InitialState = {
  allProducts: [],
  currentProducts: [],
  productsPerPage: 9,
  sortProducts: SORTS.none,
};

export const productReducer = (state = InitialState, action) => {
  switch (action.type) {
    case prdouctActionsTypes.SET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case prdouctActionsTypes.SET_CURRENT_PRODUCTS:
      return { ...state, currentProducts: action.payload };
    case prdouctActionsTypes.SET_CURRENT_PRODUCTS_BY_DISCOUNT:
      return {
        ...state,
        currentProducts: JSON.parse(JSON.stringify(state.allProducts)).filter(
          (item) => Number(item.price_stock) > 0
        ),
      };
    case prdouctActionsTypes.SET_CURRENT_PRODUCTS_ALL:
      return { ...state, currentProducts: JSON.parse(JSON.stringify(state.allProducts)) };
    case prdouctActionsTypes.SET_CURRENT_PRODUCTS_BY_CATEGORY_ID:
      return {
        ...state,
        currentProducts: JSON.parse(JSON.stringify(state.allProducts)).filter(
          (item) => Number(item.categoryId) === action.payload
        ),
      };
    case prdouctActionsTypes.UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map((product) => {
          if (Number(product.id) === Number(action.payload.id)) {
            return action.payload;
          }
          return product;
        }),
        currentProducts: state.currentProducts.map((product) => {
          if (Number(product.id) === Number(action.payload.id)) {
            return action.payload;
          }
          return product;
        }),
      };
    case prdouctActionsTypes.ADD_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
        currentProducts: [...state.currentProducts, action.payload],
      };
    case prdouctActionsTypes.DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter((product) => Number(product.id) !== Number(action.payload.id)),
        currentProducts: state.currentProducts.filter(
          (product) => Number(product.id) !== Number(action.payload.id)
        ),
      };
    default:
      return state;
  }
};
