import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { FurnitureService } from '../../services/furniture.service';

@Component({
    selector: 'dashboard-furnitures-warranty-form-component',
    templateUrl: 'warranty-form.component.html'
})

export class WarrantyFormComponent implements OnInit {

    @Output()
    isValidTheForm: EventEmitter<{ value: boolean, form: FormGroup }> = new EventEmitter();

    form: FormGroup = this._fb.group({
        warranty_domestic: ['', [Validators.min(0), Validators.required]],
        warranty_general: ['', [Validators.min(0), Validators.required]]
    });

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _furnitureService: FurnitureService,
    ) { }


    ngOnInit() {
        this.onChangeStatusForm();
        this.onChangeValuesForm();
    }



    isValidField(fieldName: string): boolean {
        return this._validationService.isValidField(fieldName, this.form);
    }


    getErrors(fieldName: string): string[] {
        return this._validationService.getErrorsField(fieldName, this.form);
    }

    onChangeStatusForm() {
        this.form?.statusChanges.
            pipe(distinctUntilChanged()).
            subscribe(value => this.isValidTheForm.emit({ value: value === 'VALID', form: this.form }));
    }

    onChangeValuesForm() {
        this.form.valueChanges.subscribe(() => this._furnitureService.furniturePayload = this.form);
    }
}