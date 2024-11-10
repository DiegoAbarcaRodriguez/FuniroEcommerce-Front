
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductComparisonComponent } from './pages/product-comparison/product-comparison.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'shop',
                component: ShopComponent
            },
            {
                path: 'product',
                component: ProductComponent
            },
            {
                path: 'about',
                component: AboutUsComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'comparison',
                component: ProductComparisonComponent
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'checkout',
                component: CheckoutComponent
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    }

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
