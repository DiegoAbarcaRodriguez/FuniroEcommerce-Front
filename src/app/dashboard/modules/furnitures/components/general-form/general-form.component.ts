import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { distinctUntilChanged } from 'rxjs';
import { FurnitureService } from '../../services/furniture.service';
import { ModelNumberValidator } from '../../validators/model-number.validator';


@Component({
    selector: 'dashboard-furnitures-general-form-component',
    templateUrl: 'general-form.component.html'
})

export class GeneralFormComponent implements OnInit {

    @Output()
    isValidTheForm: EventEmitter<{ value: boolean, form: FormGroup }> = new EventEmitter();

    form = this._fb.group({
        model_number: ['', [Validators.required, Validators.minLength(6)], [this._modelNumberValidator]],
        sales_package: ['', Validators.required],
        upholstery_color: ['', Validators.required],
        upholstery_material: [''],
        secondary_material: [''],
    });


    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _furnitureService: FurnitureService,
        private _modelNumberValidator: ModelNumberValidator,
    ) {

    }

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
        this._furnitureService.loadedFurniture.subscribe((furniture: any) => {
            this.form.reset({ ...furniture });
        });
    }

}