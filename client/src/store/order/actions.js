export const orderActionsTypes = {
  SET_ORDERS: 'ORDER.SET_ORDERS',
  SET_CONFIRMED_ORDER: 'ORDER.SET_CONFIRMED_ORDER',
  DELETE_ORDER: 'ORDER.DELETE_ORDER',
};

const getAllOders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/order/getAll', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      dispatch(orderActions.setOrders(data.orders));
    } catch (e) {
      console.log(e);
    }
  };
};

const createOrder = (fields) => {
  return async (dispatch) => {
    console.log(fields);
    try {
      const response = await fetch('http://localhost:5000/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const updateOrder = (fields) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/order/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      dispatch(orderActions.setConfirmedOrder(fields));
    } catch (e) {
      console.log(e);
    }
  };
};

const deleteOneOrder = (fields) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/order/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      dispatch(orderActions.deleteOrder(fields));
    } catch (e) {
      console.log(e);
    }
  };
};

export const orderActions = {
  setOrders: (payload) => ({ type: orderActionsTypes.SET_ORDERS, payload }),
  setConfirmedOrder: (payload) => ({ type: orderActionsTypes.SET_CONFIRMED_ORDER, payload }),
  deleteOrder: (payload) => ({ type: orderActionsTypes.DELETE_ORDER, payload }),
  createOrder,
  getAllOders,
  updateOrder,
  deleteOneOrder,
};
