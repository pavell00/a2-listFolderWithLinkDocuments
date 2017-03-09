import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {Folder} from '../../model/folder'

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

    constructor(private appService: AppService){ }

    ngOnInit(){
        this.appService.calendarChange$.subscribe(
            (v) => {this.sDate = v}
        )

        this.appService.getFolders().subscribe(
            (val) => {this.error = JSON.stringify(val)})
    }
}