import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
    constructor() { }

    telefonoRegx = /^(?:\+1\s?|1\s?)?(?:\(?[2-9][0-9]{2}\)?)[\s.-]?[2-9][0-9]{2}[\s.-]?[0-9]{4}$|^(?:\+52\s?|52\s?)?(?:\(?1?\d{2}\)?)[\s.-]?\d{4}[\s.-]?\d{4}$/

    isValidField(fieldName: string, form: FormGroup): boolean {
        return form.controls[fieldName].touched && form.controls[fieldName].invalid;
    }

    getErrorsField(fieldName: string, form: FormGroup): string[] {
        const errors: string[] = [];
        const errorObject = form.controls[fieldName].errors || {};
        console.log(errorObject)


        const errorsFromField = Object.keys(errorObject);


        errorsFromField.forEach(error => {
            switch (error) {
                case 'required':
                    errors.push(`The ${fieldName} is required`);
                    break;
                case 'minlength':
                    errors.push(`The ${fieldName} must have at least ${errorObject['minlength']['requiredLength']} characters`);
                    break;
                case 'min':
                    errors.push(`The ${fieldName} must be greater than ${errorObject['min']['min']}`);
                    break;
                case 'notEqual':
                    errors.push(`The passwords are differents`);
                    break;
                case 'notGreater':
                    errors.push(`The ${fieldName} is not valid in comparison to the discount`);
                    break;
                case 'hasTaken':
                    errors.push(`This ${fieldName} has already been taken`);
                    break;
                case 'hasError':
                    errors.push('It has been an error about the service');
                    break;
                case 'email':
                    errors.push('The email is not valid');
                    break;
                case 'maxExtension':
                    errors.push(`The ${fieldName} must have a extension equal to 5`);
                    break;
                case 'pattern':
                    errors.push(`The ${fieldName} doesn't have the appropiate format`);
                    break;
                default:
                    throw new Error(`The error: ${error} is not handled`);
            }

        });

        return errors;

    }

    compareFieldsFromFormGroup(fieldName: string, fieldName2: string) {
        return (form: FormGroup): ValidationErrors | undefined => {
            const password = form.get(fieldName)?.value || '';
            const password2 = form.get(fieldName2)?.value || '';
            if (password !== password2) {
                form.get(fieldName2)?.setErrors({ notEqual: true });
                return {
                    notEqual: true
                }
            }

            return undefined;
        }
    }

    mustBeGreaterFirstFieldThanSecondField(fieldName: string, fieldName2: string) {
        return (form: FormGroup): ValidationErrors | undefined => {
            const field = form.get(fieldName)?.value || 0;
            const field2 = form.get(fieldName2)?.value || 0;

            if (field <= field2) {
                form.get(fieldName)?.setErrors({
                    notGreater: true
                });
                return {
                    notGreater: true
                }
            }

            form.get(fieldName)?.setErrors(null);
            return undefined;
        }
    }


    validateMaxExtensionZipCodeInput(formControl: FormControl): ValidationErrors | null {
        const value: string = (formControl.value as number)?.toString();

        if (value?.length !== 5) return ({ maxExtension: true });



        return null;
    }
}