import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-component-footer',
    templateUrl: 'footer.component.html',
    styles: [
        `
            .address {
                width:auto;
                @media(min-width:992px){
                    width:300px;
                }
                
            }

            li{
                cursor:pointer;
            }

            input,
            button{
                border:none;
                border-bottom:2px solid #000;
                background-color: transparent;
            }

            input:focus{
                outline:none;
            }

            input::placeholder {
                font-size:14px;
            }




        `
    ]
})

export class FooterComponent implements OnInit {
    year = new Date().getFullYear();

    constructor() { }

    ngOnInit() { }
}