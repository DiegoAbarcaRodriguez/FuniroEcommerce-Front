import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'contact.component.html',
    styles:[`
        input,
        textarea{
            font-size:14px
        }

        input[value="Submit"]{
            width:100%;

            @media(min-width:768px){
                width:50%
            }
        }
    `]
})

export class ContactComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}