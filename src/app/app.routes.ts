import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ProductCollectionComponent } from './features/products/product-collection/product-collection.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { CartDetailComponent } from './features/cart/cart-detail/cart-detail.component';
import { adminGuard } from './core/guards/admin.guard';
import { AccountDetailComponent } from './features/account/account-detail/account-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { PaymentResultComponent } from './features/payment-result/payment-result.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { OrderDetailComponent } from './features/account/order-detail/order-detail.component';
import { checkoutGuard } from './core/guards/checkout.guard';
import { SearchProductComponent } from './features/products/search-product/search-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:slug', component: ProductDetailComponent },
  { path: 'collections/:category', component: ProductCollectionComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'cart', component: CartDetailComponent },
  { path: 'search', component: SearchProductComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [checkoutGuard]},
  { path: 'checkout/payment-result', component: PaymentResultComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'account', component: AccountDetailComponent},
      { path: 'order/:id', component: OrderDetailComponent },
      {
        path: 'admin',
        runGuardsAndResolvers: 'always',
        canActivate: [adminGuard],
        loadChildren:  () => import('./admin/routes')
          .then(m => m.adminRoutes)
      }
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
