import { Component, OnInit, Input } from '@angular/core';

import { Document } from '../../model/document';
import {AppService} from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'editDialog',
    templateUrl: 'edit.dialog.component.html'
})
export class EditDialogComponent implements OnInit {

    @Input() document: Document;
    @Input() documentIsNew: boolean;
    displayDialog: boolean;
    private docIsNew: boolean;
    test: any;

    constructor(private appService: AppService) { }

    ngOnInit() { }

    onOpenDlg(){
        this.docIsNew = false;
        this.displayDialog = true;
    }

    onOpenDlgNew(){
        this.docIsNew = true;
        this.document = new Document(1, 0, "test", new Date().toLocaleDateString());
        this.displayDialog = true;
    }

    close(){this.displayDialog = false}

    save(){
        if (this.docIsNew) {
            let a = this.appService.saveDoc(this.document);
            /*a.subscribe(
                (v) =>  {this.test = v}
            )*/
        } else {
            let a = this.appService.updateDocPromise(this.document);
        }
        this.displayDialog = false
    }
}