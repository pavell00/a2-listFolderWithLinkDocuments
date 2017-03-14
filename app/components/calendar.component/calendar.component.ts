import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls:  ['calendar.component.css'],
})
export class CalendarComponent implements OnInit {
    
    private dateValue: Date;

    constructor(private appService: AppService) {
        this.dateValue = new Date();
    }

    ngOnInit() {
        //this.dateValue = new Date();
        this.appService.setCalendar(String(this.dateValue.toLocaleDateString()));
    }

    onSelectDate(value: Date){
        //this.appService.searchDocs(String(this.selectedFolder.id | 0), String(this.dateValue.toLocaleDateString()))
        this.appService.setCalendar(String(this.dateValue.toLocaleDateString()));
        this.appService.searchDocs4();

    }
}