import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'cart.component.html',
    styles: [
        `
            th
            ,td{
                border:none;
            }
            
            .img-product{
                width:108px;
                height:105px;
                border-radius:5%;
            }

            td{
                vertical-align:middle;
            }
        
            input[type=number]{
                width:45px;
                height:45px;
                text-align:center;
            }

            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
               -webkit-appearance: none;
                margin: 0;
            }
            input[type=number] {
                 -moz-appearance:textfield;
            }

            .fs-small{

                font-size:16px;

                @media(min-width:480px){
                    font-size:18px;
                }

                @media(min-width:992px){
                    font-size:13px;
                }
               
            }

        `
    ]
})

export class CartComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}