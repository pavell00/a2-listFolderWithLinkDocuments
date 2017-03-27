import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document, Folder } from '../../model/index';
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
    
    constructor(private appService: AppService) { }

    ngOnInit() {
        this.getAll();
    }

    getAll(){
        this.appService.getDocs().subscribe(
            (val) => {this.docs = val})

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
        if (this.selectedRow != undefined) {
            this.appService.delDoc(String(this.selectedRow.id)).subscribe(
                v => {this.getAll();
                      console.log(JSON.stringify(this.docs));
                        return true;},
                err => {console.log('error')}
                )                
        }
    }

    test_search(){
      this.appService
            .search2()
            .then(docs => this.docs = docs)
            .catch(error => this.error = error);
    }

    /*test_searchObservable(){
      this.appService
            .searchDocs2("1")
            .map(docs => this.test = JSON.stringify(docs))
            .catch(error => this.error = error);
      console.log(this.test);
    }*/
}