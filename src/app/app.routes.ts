import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ProductCollectionComponent } from './features/products/product-collection/product-collection.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { CartDetailComponent } from './features/cart/cart-detail/cart-detail.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'products/:slug', component: ProductDetailComponent},
    {path:'collections/:category', component: ProductCollectionComponent},
    {path:'account/login', component: LoginComponent},
    {path:'account/register', component: RegisterComponent},
    {path:'cart', component: CartDetailComponent},
    {path:'**', component: NotFoundComponent, pathMatch: 'full'}
];
