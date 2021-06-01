import { combineReducers } from 'redux';

import { userReducer as user } from './user';
import { productReducer as product } from './product';
import { basketReducer as basket } from './basket';
import { orderReducer as order } from './order';
import { categoryReducer as category } from './category';

export const reducers = combineReducers({ user, product, basket, order, category });
