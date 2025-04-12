import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Customer } from 'src/app/shared/interfaces';
import { Environment } from 'src/environments/environment';
import { CustomerService } from '../shared/services/customer.service';

export const CustomerSessionGuard: CanActivateFn = () => {
    const baseUrl = Environment.url;

    const _http = inject(HttpClient);
    const _customerService = inject(CustomerService);


    _http.get<{ customer: Customer, token: string, ok: boolean }>(`${baseUrl}/customer/check-status`, { headers: { 'Authorization': `Bearer ${_customerService.token}` } })
        .subscribe({
            next: ({ token, customer }) => {
                _customerService.token = token;
                _customerService.customer = customer;
            },
            error: () => {
                _customerService.token = '';
                _customerService.customer = undefined;
            }
        });

    return true;
};