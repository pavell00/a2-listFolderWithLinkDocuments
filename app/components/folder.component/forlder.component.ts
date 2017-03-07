import { Component, OnInit } from '@angular/core';

import { Folder } from '../../model/folder';
import { CalendarComponent }  from '../calendar.component/calendar.component';
import {AppService} from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'folder',
    templateUrl: 'folder.component.html'
})
export class FolderComponent implements OnInit {

    private dateValue: Date;
    private selectedFolder: Folder;
    private folders: Folder[];
    private error: any;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.dateValue = new Date();
        //this.appService.setCurrentFolderObserver("0");
        /*let a = this.appService
            .getFolders()
            .then(folders => this.folders = folders)
            .catch(error => this.error = error);
        */
        //Initilize start folder ???
       this.appService.searchFolderObserver("0").subscribe((val) => {this.folders = val});
       /*this.onSelectFolder({"id": 1, "name": "folder 1", "isChildren": true, rootId:0});
       this.appService.setFolder("1");
       this.appService.getFolders().subscribe(
            (val) => {this.folders = val})
       this.appService.searchFolder();*/
    }

    onSelectFolder(folder :Folder){
      this.selectedFolder = folder;
      //this.appService.searchDocs(String(folder.id), String(this.dateValue.toLocaleDateString()))
      this.appService.setFolder(String(folder.id));
      this.appService.searchDocs4();
    }

    onDblClick(folder :Folder){
        //this.appService.setCurrentFolderObserver(String(folder.id));
        //this.appService.setCurrentFolderObserver(String(folder.id));
        //this.appService.searchFolder();
        //this.appService.setFolder(String(folder.id));
        if (folder.isChildren) {
            //this.appService.setCurrentFolderObserver(String(folder.id));
            //this.appService.searchFolder();
            this.appService.searchFolderObserver(String(folder.id)).subscribe((val) => {this.folders = val});
        }
    }

    backFolder(){
        //this.appService.setCurrentFolderObserver("0");
        //this.appService.searchFolder();
        this.appService.searchFolderObserver("0").subscribe((val) => {this.folders = val});
    }
}