import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../../model/document';
//import { EditDialogComponent } from '../edit.dialog.component/edit.dialog.component';
import {AppService} from '../../services/app.service';
import {Subject} from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'document',
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit {
    
    displayDialog: boolean;
    document: Document;
    documentIsNew: boolean;

    private documentSource: Subject<Document> = new Subject<Document>();
    documentSelect$ = this.documentSource.asObservable();

    private selectedRow: Document;
    //selectedDocument: Document;
    private docs: Document[];
    private error: any;
    private test: any
    
    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.getDocs().subscribe(
            (val) => {this.docs = val})
        /*let d = new Document();
        d.fldId = 0;
        d.id = 0;
        d.docName = "test";
        d.dateItem = "15.02.2017";
        this.document = d;*/
        this.documentSelect$.subscribe(
            (v) => {this.document = v;}
        )
    }

    onRowSelect(event: any){
      //this.selectedDocument = event.data;
      this.documentSource.next(this.selectedRow);
      this.appService.searchJournal(String(this.selectedRow.id))
    }

    onDeleteDoc(event: any){
        //this.docs.splice(this.findSelectedDocIndex(), 1);
        //console.log(JSON.stringify(this.selectedRow))
        if (this.selectedRow != undefined)
            this.appService.deleteDocPromise(String(this.selectedRow.id))
    }

    test_search(){
      this.appService
            .search2()
            .then(docs => this.docs = docs)
            .catch(error => this.error = error);
    }

    test_searchObservable(){
      this.appService
            .searchDocs2("1")
            .map(docs => this.test = JSON.stringify(docs))
            .catch(error => this.error = error);
      console.log(this.test);
    }
}