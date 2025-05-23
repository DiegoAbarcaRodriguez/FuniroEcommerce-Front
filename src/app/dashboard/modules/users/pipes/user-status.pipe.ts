import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userStatus'
})

export class UserStatusPipe implements PipeTransform {
    transform(value: boolean): 'Admin' | 'No Admin' {
        return value ? 'Admin' : 'No Admin';
    }
}