import { categoryActionsTypes } from './actions';

const InitialState = {
  categories: [],
};

export const categoryReducer = (state = InitialState, action) => {
  switch (action.type) {
    case categoryActionsTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case categoryActionsTypes.SET_NAME_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.categoryId) {
            category.name = action.payload.name;
          }
          return category;
        }),
      };
    case categoryActionsTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload.categoryId),
      };
    case categoryActionsTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    default:
      return state;
  }
};
