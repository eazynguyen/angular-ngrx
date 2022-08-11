import { Component, OnDestroy, OnInit } from "@angular/core";

import { Observable, Subscription } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store } from "@ngrx/store";
import * as ProductActions from "../state/product.action";
import {
  getCurrentProduct,
  getLoadProductError,
  getProducts,
  getShowProductCode,
} from "../state/product.selector";
import { initialCurrentProduct } from "../state/product.action";
import { State } from "../state/product.state";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  pageTitle = "Products";

  product$: Observable<Product[]>;
  messStr$: Observable<string>;
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());

    this.product$ = this.store.select(getProducts);

    this.messStr$ = this.store.select(getLoadProductError);

    this.displayCode$ = this.store.select(getShowProductCode);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
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
