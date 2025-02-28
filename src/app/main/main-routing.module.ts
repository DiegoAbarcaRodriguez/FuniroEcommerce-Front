
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PaymentGuard } from './guards/payment.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../main/modules/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'shop',
                loadChildren: () => import('../main/modules/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'product',
                loadChildren: () => import('../main/modules/product/product.module').then(m => m.ProductModule)
            },
            {
                path: 'about',
                loadChildren: () => import('../main/modules/about-us/about-us.module').then(m => m.AboutUsModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('../main/modules/contact/contact.module').then(m => m.ContactModule)
            },
            {
                path: 'comparison',
                loadChildren: () => import('../main/modules/product-comparison/product-comparison.module').then(m => m.ProductComparisonModule)
            },
            {
                path: 'cart',
                canActivate: [PaymentGuard],
                loadChildren: () => import('../main/modules/cart/cart.module').then(m => m.CartModule)
            },
            {
                path: 'checkout',
                canActivate: [PaymentGuard],
                loadChildren: () => import('../main/modules/checkout/checkout.module').then(m => m.CheckoutModule)
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
