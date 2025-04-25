import { Directive, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({ selector: '[select-star]' })
export class SelectStarDirective {

    @Output()
    onEmitIdStar: EventEmitter<number> = new EventEmitter();

    constructor(
        private _renderer2: Renderer2
    ) { }


    private _resetStars() {
        const arrayDisabledStars = [];
        for (let index = 1; index <= 5; index++) {
            arrayDisabledStars.push(document.getElementById(`${index}`));
        }

        arrayDisabledStars.forEach(star => {
            this._renderer2.setAttribute(star, 'src', '../../../../../../assets/icons/star-disable.svg');
        });

    }

    private _validateStars(id: number) {
        const arrayStarsToValidate = [];
        for (let index = 1; index <= id; index++) {
            arrayStarsToValidate.push(document.getElementById(`${index}`));
        }


        arrayStarsToValidate.forEach(star => {
            this._renderer2.setAttribute(star, 'src', '../../../../../../assets/icons/star.svg');
        });
    }

    @HostListener('mouseover', ['$event'])
    mouseOnStar(event: any) {
        const id = event.target.getAttribute('id');

        this._resetStars();
        this._validateStars(id);

        this.onEmitIdStar.emit(id);


    }

}