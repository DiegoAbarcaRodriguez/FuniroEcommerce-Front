
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PaymentGuard } from './guards/payment.guard';
import { ThankyouGuard } from './guards/thank-you.guard';
import { CustomerSessionGuard } from './guards/customer-session.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                canActivate: [CustomerSessionGuard],
                loadChildren: () => import('../main/modules/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'shop',
                canActivate: [CustomerSessionGuard],
                loadChildren: () => import('../main/modules/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'product',
                canActivate: [CustomerSessionGuard],
                loadChildren: () => import('../main/modules/product/product.module').then(m => m.ProductModule)
            },
            {
                path: 'about',
                canActivate: [CustomerSessionGuard],
                loadChildren: () => import('../main/modules/about-us/about-us.module').then(m => m.AboutUsModule)
            },
            {
                path: 'contact',
                canActivate: [CustomerSessionGuard],
                loadChildren: () => import('../main/modules/contact/contact.module').then(m => m.ContactModule)
            },
            {
                path: 'comparison',
                canActivate: [CustomerSessionGuard],
                loadChildren: () => import('../main/modules/product-comparison/product-comparison.module').then(m => m.ProductComparisonModule)
            },
            {
                path: 'cart',
                canActivate: [PaymentGuard,CustomerSessionGuard],
                loadChildren: () => import('../main/modules/cart/cart.module').then(m => m.CartModule)
            },
            {
                path: 'checkout',
                canActivate: [PaymentGuard, CustomerSessionGuard],
                loadChildren: () => import('../main/modules/checkout/checkout.module').then(m => m.CheckoutModule)
            },
            {
                path: 'thank-you',
                canActivate: [ThankyouGuard,CustomerSessionGuard],
                loadChildren: () => import('../main/modules/thank-you/thank-you.module').then(m => m.ThankyouModule)
            },
            {
                path: 'recover-password',
                loadChildren: () => import('../main/modules/recover-password/recover-password.module').then(m => m.RecoverModule)
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
