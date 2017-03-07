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

    addFolder(){
        let f = new Folder();
        f.id = 100;
        f.name = "addedFolder";
        f.isChildren = false;
        f.rootId = 0;
        this.appService.saveFolderPromise(f);
        this.appService.searchFolder();
        //console.log(JSON.stringify(this.appService.getFolders()));
    }
}