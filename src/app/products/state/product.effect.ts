import { Injectable } from "@angular/core";
import { ProductService } from "../product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from "./product.action";
import { catchError, map, switchMap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error: HttpErrorResponse) =>
            of(
              ProductActions.loadProductsFail({ error: "Load products Error!" })
            )
          )
        )
      )
    );
  });

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductActions.updateProductSuccess({ product })),
          catchError(() =>
            of(ProductActions.updateProductFail({ error: "Update failure!" }))
          )
        )
      )
    )
  );
}
