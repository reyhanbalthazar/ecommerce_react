import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer'
import { productsReducer } from './productsReducer'

export const rootReducers = combineReducers({
    userReducer,
    productReducer,
    productsReducer
})