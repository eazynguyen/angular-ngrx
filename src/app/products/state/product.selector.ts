import {createFeatureSelector, createSelector} from '@ngrx/store';
import { State } from './product.state';


const getProductFeatureSelector = createFeatureSelector<State>('products');

export const getCurrentProductId = createSelector(
    getProductFeatureSelector,
    state => state.currentProductId
)

export const getCurrentProduct = createSelector(
    getProductFeatureSelector,
    getCurrentProductId,
    (state, currentId) => state.products.find(item => item.id === currentId)
)

export const getShowProductCode = createSelector(
    getProductFeatureSelector,
    state => state.showProductCode
)

export const getProducts = createSelector(
    getProductFeatureSelector,
    state => state.products
)

export const getLoadProductError = createSelector(
    getProductFeatureSelector,
    state => state.error
)
