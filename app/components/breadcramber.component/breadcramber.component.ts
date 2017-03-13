import { Component, OnInit } from '@angular/core';

import {AppService} from '../../services/app.service';
import { BreadCramber } from '../../model/breadcramber';

@Component({
    moduleId: module.id,
    selector: 'breadcramber',
    templateUrl: 'breadcramber.component.html',
    styleUrls:  ['breadcramber.component.css'],

})

export class BreadCramberComponent implements OnInit {

    bcrambList: BreadCramber[];

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.bcramberChange$.subscribe(
            (v) => {this.bcrambList = v}
        )
    }

    onClickBCramb(bcramb: BreadCramber){
        //removing selected item from bcramb array
        let index: number = this.bcrambList.indexOf(bcramb, 0);
        let size: number = this.bcrambList.length;
        if (index > -1) {
            this.bcrambList.splice(index, size);
        }
        //this.appService.setBCramberObserver(this.bcrambFolders);
        this.appService.searchFolderObserver(String(bcramb.id));
    }
}