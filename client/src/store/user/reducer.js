import { userActionsTypes } from './actions';

const InitialState = {
  token: null,
  isAuth: false,
  messageError: false,
};

export const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case userActionsTypes.SET_USER:
      return { ...state, messageError: false, ...action.payload };
    case userActionsTypes.SET_ALL_USERS:
      return { ...state, allUsers: [...action.payload.users] };
    case userActionsTypes.DELTE_USER_BY_ID:
      return { ...state, allUsers: state.allUsers.filter((user) => user.id !== action.payload.id) };
    case userActionsTypes.UPDATE_USER_BY_ID:
      return {
        ...state,
        allUsers: state.allUsers.map((user) => {
          if (user.id === action.payload.user.id) {
            return action.payload.user;
          }
          return user;
        }),
      };
    case userActionsTypes.LOGOUT_USER:
      window.localStorage.removeItem('token');
      return { token: null, isAuth: false, messageError: false, };
    case userActionsTypes.SET_MESSAGE_ERROR:
      return { ...state, messageError: action.payload };
    default:
      return state;
  }
};
