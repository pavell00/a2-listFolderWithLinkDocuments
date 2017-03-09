import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {BreadCramber} from '../../model/breadcramber'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'root.component.html'
})

export class RootComponent implements OnInit { 

    name = 'Angular'; 
    sDate: string;
    checked: boolean = true;
    error: any;
    bCramb: BreadCramber[];

    constructor(private appService: AppService){ }

    ngOnInit(){
        this.appService.calendarChange$.subscribe(
            (v) => {this.sDate = v}
        )
        
        this.appService.bcramberChange$.subscribe(
            (v) => {this.error = v}
        )
    }

    addValue(){
        let a = new BreadCramber(0, "cramber_1");
        let b = new BreadCramber(1, "cramber_2");
        this.bCramb.push(a);
        //this.bCramb.push(b);
        this.appService.setBCramberObserver(this.bCramb);
    }
}