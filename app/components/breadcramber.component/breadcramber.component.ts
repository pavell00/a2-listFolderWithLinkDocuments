import { Component, OnInit } from '@angular/core';

import {AppService} from '../../services/app.service';
import { BreadCramber } from '../../model/breadcramber';

@Component({
    moduleId: module.id,
    selector: 'breadcramber',
    templateUrl: 'breadcramber.component.html'
})

export class BreadCramberComponent implements OnInit {

    bcrambList: BreadCramber[];

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.bcramberChange$.subscribe(
            (v) => {this.bcrambList = v}
        )
    }

    onSelectBCramb(event: any){
        console.log(event.data)
    }
}