import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, 
         URLSearchParams, RequestOptions, Jsonp } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
//import {} from 'rxjs';

import {Folder} from '../model/folder'
import {Document} from '../model/document'
import {Journal} from '../model/journal'
import {Entity} from '../model/entity'
import {BreadCramber} from '../model/breadcramber'
import {CalendarComponent} from '../components/calendar.component/calendar.component'
import {FolderComponent} from '../components/folder.component/forlder.component'

@Injectable()
export class AppService {

  //rootFolder: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  //todo_2: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([{id:1, name:'default Folder'}]);
  private currentFolderId: string;
  private currentFolder: string = "0";
  private docs = new Subject<Document[]>();
  private folders = new Subject<Folder[]>();
  private journals = new Subject<Journal[]>();
  private entities = new Subject<Entity[]>();
  private calendar = new BehaviorSubject('NAN');
  private curfld = new BehaviorSubject('0');

  private bcramberSource: Subject<BreadCramber[]> = new Subject<BreadCramber[]>();
  bcramberChange$ = this.bcramberSource.asObservable();

  //private currentFolderSource: BehaviorSubject<string> = new BehaviorSubject<string>("0");
  //currentFolderChange$ = this.currentFolderSource.asObservable();

  private foldersUrl = 'http://172.16.9.2:3004/folders';  // URL to web API
  private docmentsUrl = 'http://172.16.9.2:3004/documents';  // URL to web API
  private journalsUrl = 'http://172.16.9.2:3004/journals';  // URL to web API
  private entitiesUrl = 'http://172.16.9.2:3004/entities';  // URL to web API
  
  constructor(private http: Http, private jsonp: Jsonp) {}
  
  setFolder(s: string){this.currentFolderId = s;}
  //setCalendar(s: string){this.calendar = s;}
  getDocs()   {return this.docs;}

  getFolders(): Observable<any> {return this.folders.asObservable();}
  getJournals(){return this.journals;}

  getCalendar() : Observable<any> {return this.calendar.asObservable();}
  setCalendar(s: string){this.calendar.next(s);}

  setBCramberObserver(b: BreadCramber[]){this.bcramberSource.next(b);}
  
  //setBCramber(s: BreadCramber){this.bcramberSource.push(s);}
  getBCramber(){return this.bcramberSource;}

  saveDocPromise(d: Document){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.docmentsUrl, JSON.stringify(d), options)
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError)
    this.searchDocs4();
  }

  updateDocPromise(d: Document){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(`app/documents/${d['id']}`, JSON.stringify(d), options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError)
  }

  deleteDocPromise(id: string){
    /*this.docs.forEach(element => {
         console.log(element)
    });*/
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(`app/documents/${id}`);
    this.http.delete(`app/documents/${id}`, options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError)
     this.searchDocs4();
  }

  searchFolder () {
    //console.log(this.currentFolder);
    let params = new URLSearchParams();
    params.set('rootId', this.currentFolderId);
    let a = this.http
        .get(this.foldersUrl, { search: params })
        .map(response => <Folder[]> response.json().data)
            a.subscribe(
                (val) => {this.folders.next(val);
                },
                (err) => (this.handleError)
            )
    //return a;
  }

  searchDocs4 () {
     let term = this.currentFolderId;
     let currentDate = this.calendar.getValue();//this.calendar;
     let params = new URLSearchParams();
     params.set('fldId', term);
     params.set('dateItem', currentDate);
     let a = this.http
        .get(this.docmentsUrl, { search: params })
        .map(response => <Document[]> response.json().data)
            a.subscribe(
                (val) => {this.docs.next(val);//without filtering
                },
                (err) => (this.handleError)
            )
     return a;
  }

  searchJournal (term: string) {
    let params = new URLSearchParams();
    params.set('docId', term);
    let a = this.http
        .get(this.journalsUrl, { search: params })
        .map(response => <Journal[]> response.json().data)
            a.subscribe(
                (val) => {this.journals.next(val);},//without filtering
                (err) => (this.handleError)
            )
    return a;
  }

  searchEntity(term: string) {
    let params = new URLSearchParams();
    params.set('name', term);
    let a = this.http
        .get(this.entitiesUrl, { search: params })
        .map(response => <Entity[]> response.json().data)
            a.subscribe(
                (val) => {//this.entities.next(val);//without filtering
                    this.entities.next(
                        val.filter(val => val.name == term) //with filtering
                    );
                },
                (err) => (this.handleError)
            )
    return a;
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    //this.todo_2.next(body.data);
    return body.data || { };
    //return body.data || { };
  }

  private handleError(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

//------------------------ EXample --------------
  searchFolderObserver (f: string):Observable<Folder[]> {
      //console.log(this.currentFolder);
      let params = new URLSearchParams();
      params.set('rootId', f);
      return this.http
        .get(this.foldersUrl, { search: params })
        .map(response => <Folder[]> response.json().data)
  }

  saveFolderPromise(f: Folder){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.foldersUrl, JSON.stringify(f), options)
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError)
  }

  saveDocObs(d: Document): Observable<Document>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.docmentsUrl, JSON.stringify(d), options)
        .map(this.extractData)
        .catch(this.handleError);
    }

  // ??
  searchDocs2(term : string): Observable<Document[]>  {
    return this.http
        .get(`app/documents/?fldId=${1}`)
        .map(response => response.json().data)
        .catch(this.handleError);
      //this.http
      //  .get(`app/documents.json/?fldId=${1}`)
      //  .map((r: Response) => r.json().data as Document[])
  }

  searchDocs (term: string, currentDate: string) {
      let params = new URLSearchParams();
      params.set('fldId', term);
      let a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(response => <Document[]> response.json().data)
                a.subscribe(
                   (val) => {//this.docs.next(val);//without filtering
                             this.docs.next(
                               val.filter(val => val.dateItem == currentDate) //with filtering
                             );
                   },
                   (err) => (this.handleError)
                )
      return a;
  }

  searchDocs3 () {
      let term = (this.currentFolderId);
      let currentDate = this.calendar.getValue();
      let params = new URLSearchParams();
      params.set('fldId', term);

      let a = this.http
        .get(this.docmentsUrl, { search: params })
        .map(response => <Document[]> response.json().data)
            a.subscribe(
                (val) => {//this.docs.next(val);//without filtering
                    this.docs.next(
                    val.filter(val => val.dateItem == currentDate) //with filtering
                    );
                },
                (err) => (this.handleError)
            )
      return a;
  }

  search (term: string): Observable<Document[]> {
      let params = new URLSearchParams();
      params.set('fldId', term);
      let a = this.http
            .get(this.docmentsUrl, { search: params })
            .map(response => response.json().data)
      return a;
  }

  search2() : Promise<Document[]> {
      return this.http.get(this.docmentsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
  }

  search3() : Promise<Journal[]> {
      return this.http.get(this.journalsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
  }
}