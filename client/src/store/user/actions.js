import jwt_decode from 'jwt-decode';

export const userActionsTypes = {
  SET_USER: 'USER.SET_USER',
  SET_ALL_USERS: 'USER.SET_ALL_USERS',
  DELTE_USER_BY_ID: 'USER.DELTE_USER_BY_ID',
  UPDATE_USER_BY_ID: 'USER.UPDATE_USER_BY_ID',
  UPDATE_USER: 'USER.UPDATE_USER',
  LOGIN_USER: 'USER.LOGIN',
  LOGOUT_USER: 'USER.LOGOUT',
  SET_MESSAGE_ERROR: 'USER.MESSAGE_ERROR',
};

const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/user/authorization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        dispatch(userActions.setMessageError(data.message));
        return;
      }
      console.log('login user and redirect');

      window.localStorage.setItem('token', data.token);
      dispatch(userActions.setUser({ ...jwt_decode(data.token), token: data.token, isAuth: true }));
    } catch (e) {
      console.log(e);
      dispatch(userActions.setMessageError('login error'));
    }
  };
};

const registration = (form) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/user/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(userActions.setMessageError(data.message));
        return;
      }
      console.log('registration user and redirect');
      window.localStorage.setItem('token', data.token);
      dispatch(userActions.setUser({ ...jwt_decode(data.token), token: data.token, isAuth: true }));
    } catch (e) {
      console.log(e);
      dispatch(userActions.setMessageError('registration error'));
    }
  };
};

const auth = async () => {
  try {
    const token = window.localStorage.getItem('token');
    console.log(token);
    const response = await fetch('http://localhost:5000/user/auth', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.message);
      return false;
    }
    console.log(data.token);
    window.localStorage.setItem('token', data.token);
    return data;
  } catch (e) {
    console.log(e.message);
    window.localStorage.removeItem('token');
  }
};

const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/user/getAll', {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      dispatch(userActions.setAllUsers({ ...data }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5000/user/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }
      dispatch(userActions.deleteUserById({ id }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const updateUser = (fields) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5000/user/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      dispatch(userActions.updateUserById({ ...data }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const updateCurrentUser = (fields) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5000/user/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      dispatch(userActions.setUser({ ...data.user }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const userActions = {
  setUser: (payload) => ({ type: userActionsTypes.SET_USER, payload }),
  setAllUsers: (payload) => ({ type: userActionsTypes.SET_ALL_USERS, payload }),
  deleteUserById: (payload) => ({ type: userActionsTypes.DELTE_USER_BY_ID, payload }),
  updateUserById: (payload) => ({ type: userActionsTypes.UPDATE_USER_BY_ID, payload }),
  setMessageError: (payload) => ({ type: userActionsTypes.SET_MESSAGE_ERROR, payload }),
  logoutUser: () => ({ type: userActionsTypes.LOGOUT_USER }),
  deleteUserByIdService: deleteUser,
  updateUserByIdService: updateUser,
  authUser: auth,
  registrationUser: registration,
  loginUser: login,
  getAllUsers,
  updateCurrentUser,
};
