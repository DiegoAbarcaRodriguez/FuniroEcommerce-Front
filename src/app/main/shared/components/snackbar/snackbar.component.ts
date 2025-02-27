import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


@Component({
    selector: 'main-snackbar-component',
    templateUrl: 'snackbar.component.html',
    styleUrls: ['snackbar.component.scss']
})

export class SnackbarComponent implements OnInit {

    message: string = '';

    constructor(private _snackbarService: SnackbarService) { }

    ngOnInit() {
        this.message = this._snackbarService.message;
        this.closeSnackBar();

    }



    closeSnackBar() {

        setTimeout(() => {
            this._snackbarService.mustShowSnackBar = false;
            this._snackbarService.message = '';
        }, 3000);

    }


}