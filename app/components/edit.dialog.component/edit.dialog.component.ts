import { Component, OnInit, Input } from '@angular/core';

import { Document, Folder } from '../../model/index';
import {AppService} from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'editDialog',
    templateUrl: 'edit.dialog.component.html'
})
export class EditDialogComponent implements OnInit {

    @Input() document: Document;

    displayDialog: boolean;
    private docIsNew: boolean;
    i:number = 0;

    constructor(private appService: AppService) { }

    ngOnInit() { }

    test(){
        this.i++;
        this.appService.setCounter(this.i);
    }

    getAll2(){
        this.appService.searchDocs2().subscribe(
            (val) => {console.log(JSON.stringify(val))})
    }

    onOpenDlg(){
        this.docIsNew = false;
        this.displayDialog = true;
    }

    onOpenDlgNew(){
        this.docIsNew = true;
        this.document = new Document(1, "test", new Date().toLocaleDateString());
        this.displayDialog = true;
    }

    close(){this.displayDialog = false}

    save(){
        if (this.docIsNew) {
            //let d = new Document(1, "test", "27.03.2017");
            let a = this.appService.saveDoc(this.document).subscribe(
                v => {this.getAll2();},
                err => {console.log('error')}
                )
            let f = new Folder(1, "", false, 0);
            this.appService.setCurrentFolder(f);
            this.appService.searchDocs4();
            //this.appService.saveDoc(d);
            /*a.subscribe(
                (v) =>  {this.test = v}
            )*/
            /*this.appService.getDocs().subscribe(
                (val) => {console.log(JSON.stringify(val))})*/
        } else {
            let a = this.appService.updateDocPromise(this.document);
        }
        this.displayDialog = false
    }
}