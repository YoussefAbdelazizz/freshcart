import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-layout/auth/auth.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuardGuard } from './core/guard/auth-guard.guard';

export const routes: Routes = [
        {path:"",component:AuthComponent,children:[
            {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent),title:"login"},
        {path:"register",loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:"register"},
        {path:"forgot-password",loadComponent:()=>import('./pages/forgot-password/forgot-password.component').then((c)=>c.ForgotPasswordComponent),title:'ForgotPassword'},
        {path:"verify-reset-code",loadComponent:()=>import('./pages/verify-reset-code/verify-reset-code.component').then((c)=>c.VerifyResetCodeComponent),title:'Reset Code'},
        {path:"reset-password",loadComponent:()=>import('./pages/reset-password/reset-password.component').then((c)=>c.ResetPasswordComponent),title:'Reset Password'}
    ]},
    {path:"",component:MainComponent,canActivate:[authGuardGuard],children:[
        {path:"home",component:HomeComponent,title:'home'},
        {path:"products",loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:'products'},
        {path:"cart",loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent),title:'cart'},
        {path:"categories",loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent),title:'categories'},
        {path:"product-details/:p_id",loadComponent:()=>import('./pages/productdetails/productdetails.component').then((c)=>c.ProductdetailsComponent),title:'productdetails'},
        {path:"Brands",loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:'brands'},
        {path:"checkout/:c_id",loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent),title:'checkout'},
        {path:"allorders",loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent),title:'allorders'},
        {path:"wishlist",loadComponent:()=>import('./pages/wishlist/wishlist/wishlist.component').then((c)=>c.WishlistComponent),title:'wishlist'}
       

    ]},
    {path:"**",component:NotfoundComponent,title:"error 404"}
];
