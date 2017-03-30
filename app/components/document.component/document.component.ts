import { Component, OnInit, Input } from '@angular/core';

import { Document, Folder } from '../../model/index';
//import { EditDialogComponent } from '../edit.dialog.component/edit.dialog.component';
//import { FolderComponent } from '../folder.component/forlder.component';
import {AppService} from '../../services/app.service';
import {Subject} from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'document',
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit {

    //@Input() documents: FolderComponent;

    displayDialog: boolean;
    document: Document;
    documentIsNew: boolean;

    private documentSource: Subject<Document> = new Subject<Document>();
    documentSelect$ = this.documentSource.asObservable();

    private selectedRow: Document;
    //selectedDocument: Document;
    private docs: Document[];
    private error: any;
    counter:number;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.getAll();
        //this.getAll2();
    }

    getAll(){
        this.appService.getDocs().subscribe(
            (val) => {this.docs = val})

        this.documentSelect$.subscribe(
            (v) => {this.document = v;}
        )
    }

    getAll2(){
        this.appService.searchDocs2().subscribe(
            (val) => {console.log(JSON.stringify(val))})
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
                      return true}
            )
        }
    }

    onGetDocs(a: any){
        //console.log(this.documents.documentsOfFooler);
        //this.docs = this.documents.documentsOfFooler;
        //console.log(a);
        this.getAll();
    }
}