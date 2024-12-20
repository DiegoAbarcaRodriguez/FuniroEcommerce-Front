import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
    constructor() { }

    isValidField(fieldName: string, form: FormGroup): boolean {
        return form.controls[fieldName].touched && form.controls[fieldName].invalid;
    }

    getErrorsField(fieldName: string, form: FormGroup): string[] {
        const errors: string[] = [];
        const errorObject = form.controls[fieldName].errors || {};
       

        const errorsFromField = Object.keys(errorObject);

        errorsFromField.forEach(error => {
            switch (error) {
                case 'required':
                    errors.push(`The ${fieldName} is required`);
                    break;
                case 'minlength':
                    errors.push(`The ${fieldName} must have at least ${errorObject['minlength']['requiredLength']} characters`);
                    break;
                case 'notEqual':
                    errors.push(`The passwords are differents`);
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


}