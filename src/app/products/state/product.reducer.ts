import { createReducer, on } from "@ngrx/store";
import * as ProductActions from "./product.action";
import { State } from "./product.state";

const initialState: State = {
  showProductCode: true,
  currentProductId: 0,
  products: [],
  error: "",
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.toggleProductAction, (state) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProductId, (state, action) => {
    return {
      ...state,
      currentProductId: action.productId,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state) => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.initialCurrentProduct, (state) => {
    return {
      ...state,
      currentProduct: {
        productName: "Add Product",
        productCode: "",
        starRating: 5,
        description: "",
        id: 0,
      },
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      error: "",
    };
  }),
  on(ProductActions.loadProductsFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      products: [],
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action) => {
    const updateProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );

    return {
      ...state,
      currentProductId: action.product.id,
      error: "",
      products: updateProducts,
    };
  }),
  on(ProductActions.updateProductFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
