import {createAction, props} from '@ngrx/store';
import {Product} from '../product';

export const toggleProductAction = createAction(
  "[Product] Toggle Product Code"
);
export const setCurrentProductId = createAction("[Product] Set Current Product",props<{productId: number}>());

export const clearCurrentProduct = createAction(
  "[Product] clearCurrentProduct"
);
export const initialCurrentProduct = createAction(
  "[Product] initialCurrentProduct"
);

export const loadProducts = createAction(
    "[Product] loadProducts"
);

export const loadProductsSuccess = createAction(
    "[Product] loadProductsSuccess",
    props<{products: Product[]}>()
);

export const loadProductsFail = createAction(
    "[Product] loadProductsFail",
    props<{error: string}>()
);

export const updateProduct = createAction(
    "[Product] updateProduct",
    props<{product: Product}>()
);

export const updateProductSuccess = createAction(
    "[Product] updateProductSuccess",
    props<{product: Product}>()
);

export const updateProductFail = createAction(
    "[Product] updateProductFail",
    props<{error: string}>()
);
