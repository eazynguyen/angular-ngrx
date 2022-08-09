import { Component, OnDestroy, OnInit } from "@angular/core";

import {Observable, Subscription} from 'rxjs';

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store } from "@ngrx/store";
import * as ProductActions from "../state/product.action";
import {
  getCurrentProduct, getLoadProductError,
  getProducts,
  getShowProductCode,
} from '../state/product.selector';
import { initialCurrentProduct } from "../state/product.action";
import { State } from "../state/product.state";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  pageTitle = "Products";

  displayCode: boolean;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  product$: Observable<Product[]>;
  messStr$: Observable<string>;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());

    this.product$ = this.store.select(getProducts);

    this.messStr$ = this.store.select(getLoadProductError);

    // TODO : unsubscribe
    this.store.select(getShowProductCode).subscribe((productCode) => {
      this.displayCode = productCode;
    });

    // TODO : unsubscribe
    this.store.select(getCurrentProduct).subscribe((currentProduct) => {
      if (currentProduct) {
        this.selectedProduct = currentProduct;
      }
    });
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductAction());
  }

  newProduct(): void {
    this.store.dispatch(initialCurrentProduct());
  }

  productSelected(productId: number): void {
    this.store.dispatch(ProductActions.setCurrentProductId({ productId }));
  }
}
