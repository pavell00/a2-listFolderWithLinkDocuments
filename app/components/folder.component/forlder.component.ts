import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Folder, BreadCramber, Document } from '../../model/index';
import { CalendarComponent }  from '../calendar.component/calendar.component';
import { AppService } from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'folder',
    templateUrl: 'folder.component.html'
})
export class FolderComponent implements OnInit {

    private selectedFolder: Folder;
    private folders: Folder[];
    private error: any;
    private bcrambFolders: BreadCramber[] = [];
    documentsOfFooler : Document[];

    @Output() myEvent: EventEmitter<Folder> = new EventEmitter();

    constructor(private appService: AppService) { }

    ngOnInit() {
        //Initilize start folder ???
        this.appService.setCurrentFolder(new Folder(0, "", false, 0));
        /*this.appService.searchFolderObserver("0").subscribe((val) => {this.folders = val});*/
        this.appService.searchFolder();
        this.appService.getFolders()
            .subscribe((val) => {this.folders = val});
        //this.appService.getCurfld().subscribe((val) => {this.error = val});
        this.appService.searchDocs2().subscribe(
            (v) => {this.documentsOfFooler = v}
        )        
    }

    onSelectFolder(folder :Folder){
      this.selectedFolder = folder;
      //this.appService.searchDocs(String(folder.id), String(this.dateValue.toLocaleDateString()))
      this.appService.setCurrentFolder(folder);
      this.appService.searchDocs2().subscribe(
          (v) => {this.documentsOfFooler = v}
      )
      this.myEvent.emit(this.selectedFolder);
      //this.appService.searchDocs4();
    }

    onDblClick(folder :Folder){
        if (folder.isChildren) {
            this.appService.setCurrentFolder(folder);
            this.appService.searchFolder();
            //this.appService.searchFolderObserver(String(folder.id)).subscribe((val) => {this.folders = val});
            //add items to BreadCramber Array
            this.bcrambFolders.push(new BreadCramber(folder.rootId, folder.name));
            this.appService.setBCramberObserver(this.bcrambFolders);
        }
    }

    backFolder(){
        //this.appService.searchFolder();
        //this.appService.searchFolderObserver("0").subscribe((val) => {this.folders = val});
    }
}