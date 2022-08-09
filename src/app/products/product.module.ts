import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { ProductShellComponent } from "./product-shell/product-shell.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { StoreModule } from "@ngrx/store";
import { productReducer } from "./state/product.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ProductEffect } from "./state/product.effect";

const productRoutes: Routes = [{ path: "", component: ProductShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature("products", productReducer),
    EffectsModule.forFeature([ProductEffect]),
    RouterModule.forChild(productRoutes),
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent,
  ],
})
export class ProductModule {}
