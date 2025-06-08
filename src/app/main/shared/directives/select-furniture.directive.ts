import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Furniture } from 'src/app/shared/interfaces';
import { ComparisonService } from '../services/comparison.service';
import { ShoppingCarService } from '../services/shopping-car.service';
import { FurnitureService } from '../services/furniture.service';
import { FavoritesService } from '../services/favorites.service';
import { SnackbarService } from '../services/snackbar.service';

@Directive({ selector: '[select-furniture]' })
export class SelectFunitureDirective {

    private _elementHtml?: ElementRef<HTMLElement>;

    @Input()
    furniture?: Furniture;


    constructor(
        elementHtml: ElementRef<HTMLElement>,
        private _renderer2: Renderer2,
        private _comparisonService: ComparisonService,
        private _shoppingCartService: ShoppingCarService,
        private _furnitureService: FurnitureService,
        private _favoritesService: FavoritesService,
        private _snackBarService: SnackbarService
    ) {
        this._elementHtml = elementHtml;
    }


    @HostListener('mouseover', ['$event'])
    showOptionsBackground(event: any) {

        let furniture_id: string = this._elementHtml?.nativeElement.getAttribute('data-id')?.toString() || '';


        if (!this._elementHtml) {
            return;
        }

        if (event.target.classList.toString().includes('btn-white') || event.target.classList.toString().includes('text-white')) {
            return;
        }

        let index = event.target.getAttribute('data-index');
        let name = this._elementHtml.nativeElement.getAttribute('data-name');

        if (!event.srcElement.classList.toString().includes('show-options-background')) {
            const div: HTMLElement = this._renderer2.createElement('div');
            const button: HTMLElement = this._renderer2.createElement('button');
            const flex: HTMLElement = this._renderer2.createElement('div');

            this._renderer2.addClass(div, 'show-options-background');
            this._renderer2.addClass(div, 'd-flex');
            this._renderer2.addClass(div, 'flex-column');
            this._renderer2.addClass(div, 'justify-content-center');
            this._renderer2.addClass(div, 'align-items-center');



            this._renderer2.addClass(button, 'btn-white');
            this._renderer2.addClass(button, 'text-primary');
            this._renderer2.addClass(button, 'py-2');
            this._renderer2.addClass(button, 'px-5');
            this._renderer2.addClass(button, 'fw-bold');
            if (this.furniture?.stock === 0) {
                this._renderer2.setAttribute(button, 'disabled', 'true');
                this._renderer2.addClass(button, 'bg-gray');
                this._renderer2.addClass(button, 'no-pointer');
            }
            button.textContent = 'Add to cart';

            this._renderer2.addClass(flex, 'd-flex');
            this._renderer2.addClass(flex, 'align-items-center');
            this._renderer2.addClass(flex, 'gap-3');
            this._renderer2.addClass(flex, 'mt-4');
            this._renderer2.addClass(flex, 'text-white');
            flex.innerHTML = '<span class="text-white d-flex compare"><img src="../../../../assets/icons/compare.svg" class="me-1 text-white compare">Compare </span>';
            flex.innerHTML += '<span class="text-white d-flex view"><img src="../../../../assets/icons/eye.svg" class="me-1 text-white view"> View </span>';
            flex.innerHTML += '<span class="text-white d-flex like"><img src="../../../../assets/icons/heart-white.svg" class="me-1 text-white"> Like </span>';

            this._renderer2.setAttribute(div, 'data-index', index);

            this._renderer2.appendChild(div, button);
            this._renderer2.appendChild(div, flex);
            this._renderer2.appendChild(this._elementHtml?.nativeElement, div);

            this._renderer2.listen(button, 'click', (e) => {
                this._shoppingCartService.setFurnituresToBuy(this.furniture!, 1);
            });

            this._renderer2.listen(flex, 'click', (e) => {
                if (e.target.className.includes('view')) {
                    window.location.href = '/product/' + name;
                }

                if (e.target.className.includes('compare')) {
                    this._comparisonService.furnituresToCompare = this.furniture!;
                    window.location.href = '/comparison';
                }


                if (e.target.className.includes('like')) {
                    window.scroll(0, 0);
                    this._furnitureService.markFurnitureAsFavorite(furniture_id)
                        .subscribe({
                            next: () => {
                                if (this._favoritesService.mustSHowFavoritesListComponetValue) {
                                    this._furnitureService.mustReloadFavoriteFurniture = true;
                                    return;
                                }
                                this._favoritesService.mustShowFavoritesListComponent = true;
                                this._favoritesService.mustShowFavoritesListComponentValue = true;
                            },
                            error: ({ error }) => {
                                if (error.status !== 500) {
                                    this._snackBarService.message = 'Log in to add it to favorites list!';

                                } else {
                                    this._snackBarService.message = error.message;

                                }

                                this._snackBarService.mustShowSnackBar = true;


                            }
                        });

                }


            });

        }

    }

    @HostListener('document:mouseover', ['$event'])
    hideOptionsBackground(event: any) {


        if (!this._elementHtml) {
            return;
        }

        const background: HTMLElement = event.fromElement;
        const background2: HTMLElement = event.target;

        if (!background || !background2) {
            return;
        }

        const wasClickedOnButtonAdd: boolean = event.target.classList.toString().includes('btn-white');
        const wasClickedOnOptionBackground: boolean = event.target.classList.toString().includes('text-white');

        const wasClickedOnElementBackground = wasClickedOnButtonAdd || wasClickedOnOptionBackground;

        if (wasClickedOnElementBackground) {
            return;
        }


        const wasClickedOnListTag: boolean = event.target.classList.toString().includes('list-unstyled');
        const wasClickedOnContainer: boolean = event.target.classList.toString().includes('container-xxl');
        const wasClickedOnMainTittle: boolean = event.target.classList.toString().includes('main-title');
        const areDifferentBackgrounds: boolean = background.getAttribute('data-index') != background2.getAttribute('data-index');

        const wasClickedOutFromCard: boolean = wasClickedOnListTag || wasClickedOnContainer || wasClickedOnMainTittle;

        if (!this._elementHtml.nativeElement.querySelector('.show-options-background')) {
            return;
        }


        if ((wasClickedOutFromCard) || areDifferentBackgrounds) {

            this._renderer2.removeChild(this._elementHtml!.nativeElement, this._elementHtml.nativeElement.querySelector('.show-options-background'));

        }


    }

}