import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../../../../shared/interfaces/furniture.interface';

@Component({
    selector: 'dashboard-furnitures-dimension-form-component',
    templateUrl: 'dimension-form.component.html'
})

export class DimensionFormComponent implements OnInit {

    @Output()
    isValidTheForm: EventEmitter<{ value: boolean, form: FormGroup }> = new EventEmitter();

    form: FormGroup = this._fb.group({
        height: ['', [Validators.required, Validators.min(0)]],
        width: ['', [Validators.required, Validators.min(0)]],
        depth: ['', Validators.min(0)],
        weight: ['', [Validators.required, Validators.min(0)]],
    });

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _furnitureService: FurnitureService
    ) { }

    ngOnInit() {
        this.onChangeStatusForm();
        this.onChangeValuesForm();
        this.onLoadForm();

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

    onLoadForm() {
        this._furnitureService.loadedFurniture.subscribe((furniture: Furniture) => {
            this.form.reset({ ...furniture });
        });
    }
}