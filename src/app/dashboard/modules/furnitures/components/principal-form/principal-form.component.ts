import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { ImageService } from '../../services/image.service';
import { FurnitureService } from '../../services/furniture.service';
import { FurnitureNameValidator } from '../../validators/name.validator';
import { Furniture } from '../../../../../shared/interfaces/furniture.interface';
import { Environment } from 'src/environments/environment';

@Component({
    selector: 'dashborad-furnitures-principal-form',
    templateUrl: 'principal-form.component.html',
    styleUrls: ['principal-form.component.scss']
})

export class PrincipalFormComponent implements OnInit {

    @Output()
    isValidTheForm: EventEmitter<{ value: boolean, form: FormGroup }> = new EventEmitter();

    temporalImages: any[] = [undefined, undefined, undefined];
    hasInputImageTouched: boolean = false;
    private _urlImageServer: string = Environment.imagesUrl;

    form = this._fb.group({
        name: ['', [Validators.required], [this._furnitureNameValidator]],
        price: ['', [Validators.required, Validators.min(0)]],
        stock: ['', [Validators.required, Validators.min(0)]],
        discount: ['', [Validators.required, Validators.min(0)]],
        category: ['', [Validators.required]],
        description: ['', [Validators.required]],
        image: ['', [Validators.required]],
    }, {
        validators: [
            this._validationService.mustBeGreaterFirstFieldThanSecondField('price', 'discount')
        ]
    });

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _imageService: ImageService,
        private _furnitureService: FurnitureService,
        private _furnitureNameValidator: FurnitureNameValidator

    ) { }

    ngOnInit() {
        this.onChangeStatusForm();
        this.onChangeValuesForm();
        this.onLoadForm();
    }

    uploadImage(image: File, index: number) {


        if (!image) {

            if (index === 0) {
                this.hasInputImageTouched = true;
                this.form.controls['image'].setValue('');
            }

            this.temporalImages?.splice(index, 1, undefined);
            this._imageService.formDataImage(undefined, index);
            return;
        };



        const fileReader = new FileReader();

        fileReader.readAsDataURL(image);
        fileReader.onloadend = ({ srcElement }: any) => {
            const { result } = srcElement;

            this.temporalImages!.splice(index, 1, result);

            this._imageService.formDataImage(image, index);
            if (index === 0) this.form.controls['image'].setValue('true');
        };


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
        this.form.valueChanges.subscribe(() => {
            this._furnitureService.furniturePayload = this.form;
        });


    }

    onLoadForm() {
        this._furnitureService.loadedFurniture.subscribe((furniture: Furniture) => {
            const { images } = furniture;

            this.form.reset({ ...furniture });
            this.form.get('image')?.setValue(images[0]);
            images.forEach((image, index) => {
                if (image !== '') {
                    this.temporalImages?.splice(index, 1, `${this._urlImageServer}/${image}`);
                    this._imageService.formDataImage(`${this._urlImageServer}/${image}`, index);
                }

            });
            console.log(this.temporalImages)

        });
    }

}