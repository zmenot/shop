import { orderActionsTypes } from './actions';

const InitialState = {
  orders: [],
};

export const orderReducer = (state = InitialState, action) => {
  switch (action.type) {
    case orderActionsTypes.SET_ORDERS:
      return { ...state, orders: action.payload };
    case orderActionsTypes.DELETE_ORDER:
      return { ...state, orders: state.orders.filter((order) => order.id !== action.payload.orderId) };
    case orderActionsTypes.SET_CONFIRMED_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.payload.orderId) {
            order.isConfirmed = action.payload.isConfirmed;
            return order;
          }
          return order;
        }),
      };
    default:
      return state;
  }
};
