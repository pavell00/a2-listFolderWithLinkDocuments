import { Component, OnInit } from '@angular/core';

import { Journal } from '../../model/journal';
import {AppService} from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'journal',
    templateUrl: 'journal.component.html'
})
export class JournalComponent implements OnInit {
    
    private journals: Journal[];
    private selectedRow: Journal;
    private error: any;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getJournals().subscribe(
            (val) => {this.journals = val})
    }

    onRowSelect(row: Journal){
        //this.selectedRow = row;
    }
}