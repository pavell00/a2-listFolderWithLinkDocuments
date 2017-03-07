import { InMemoryDbService } from 'angular-in-memory-web-api';

export class AppData implements InMemoryDbService {
  createDb() {
      let entities = [
          {"entId":1, "name":"entity milk 2.5 envelope"},
          {"entId":2, "name":"entity 2"},
          {"entId":3, "name":"entity 3"},
          {"entId":4, "name":"entity 4"},
          {"entId":5, "name":"entity 5"},
          {"entId":6, "name":"entity 6"},
          {"entId":7, "name":"entity 7"},
          {"entId":8, "name":"entity 8"}
    ];
    let journals = [
          {"docId":1, "jid":1, "entName":"entity 1", "qty": 1, "prc": 1.2, "sum": 1.2},
          {"docId":1, "jid":2, "entName":"entity 5", "qty": 2, "prc": 2.2, "sum": 2.2},
          {"docId":1, "jid":3, "entName":"entity 6", "qty": 3, "prc": 2.4, "sum": 2.4},
          {"docId":2, "jid":4, "entName":"entity 2", "qty": 4, "prc": 5, "sum": 1.2},
          {"docId":2, "jid":5, "entName":"entity 7", "qty": 5, "prc": 3.3, "sum": 1.2},
          {"docId":3, "jid":6, "entName":"entity 3", "qty": 6, "prc": 5.32, "sum": 1.2},
          {"docId":3, "jid":7, "entName":"entity 8", "qty": 7, "prc": 0.25, "sum": 1.2},
          {"docId":4, "jid":8, "entName":"entity 4", "qty": 8, "prc": 1.3, "sum": 1.2},
          {"docId":4, "jid":9, "entName":"entity 04", "qty": 4, "prc": 8.3, "sum": 51.2},
          {"docId":5, "jid":10, "entName":"entity 10", "qty": 9, "prc": 2.45, "sum": 1.2},
          {"docId":6, "jid":11, "entName":"entity 5", "qty": 8, "prc": 3, "sum": 1.2},
          {"docId":6, "jid":12, "entName":"entity 7", "qty": 7, "prc": 5.5, "sum": 1.2},
          {"docId":7, "jid":13, "entName":"entity 2", "qty": 6, "prc": 6.1, "sum": 3.2},
          {"docId":7, "jid":14, "entName":"entity 8", "qty": 5, "prc": 3.8, "sum": 8.2},
          {"docId":8, "jid":15, "entName":"entity 7", "qty": 7, "prc": 5.5, "sum": 2.2},
          {"docId":8, "jid":16, "entName":"entity 2", "qty": 6, "prc": 6.1, "sum": 6.2},
          {"docId":8, "jid":17, "entName":"entity 8", "qty": 5, "prc": 3.8, "sum": 7.2}
    ];
    let documents = [
          {"fldId":1, "id":1, "docName":"document 1", "dateItem": "07.03.2017"},
          {"fldId":1, "id":5, "docName":"document 5", "dateItem": "07.03.2017"},
          {"fldId":1, "id":6, "docName":"document 6", "dateItem": "07.03.2017"},
          {"fldId":2, "id":2, "docName":"document 2", "dateItem": "07.03.2017"},
          {"fldId":2, "id":7, "docName":"document 7", "dateItem": "07.03.2017"},
          {"fldId":3, "id":3, "docName":"document 3", "dateItem": "03.03.2017"},
          {"fldId":3, "id":8, "docName":"document 8", "dateItem": "20.03.2017"},
          {"fldId":4, "id":4, "docName":"document 4", "dateItem": "07.03.2017"},
          {"fldId":7, "id":9, "docName":"document 9", "dateItem": "07.03.2017"}
    ];
    let folders = [
          {"id": 1, "name": "folder 1", "isChildren": true, "rootId":0},
          {"id": 2, "name": "folder 2", "isChildren": false, "rootId":0},
          {"id": 3, "name": "folder 3", "isChildren": true, "rootId":0},
          {"id": 4, "name": "folder 1_1", "isChildren": false, "rootId":1},
          {"id": 5, "name": "folder 1_2", "isChildren": false, "rootId":1},
          {"id": 6, "name": "folder 3_1", "isChildren": false, "rootId":3},
          {"id": 7, "name": "folder 3_2", "isChildren": false, "rootId":3},
          {"id": 8, "name": "folder 4", "isChildren": false, "rootId":0}
    ];
    return {documents, folders, journals, entities};
  }
/*
    let documents = [
          {"fldId":1, "id":1, "name":"document 1", "dateItem": new Date(2017, 0, 1)},
          {"fldId":1, "id":5, "name":"document 5", "dateItem": new Date(2017, 0, 1)},
          {"fldId":1, "id":6, "name":"document 6", "dateItem": new Date(2017, 0, 11)},
          {"fldId":2, "id":2, "name":"document 2", "dateItem": new Date(2017, 0, 3)},
          {"fldId":2, "id":7, "name":"document 7", "dateItem": new Date(2017, 0, 21)},
          {"fldId":3, "id":3, "name":"document 3", "dateItem": new Date(2017, 0, 4)},
          {"fldId":3, "id":8, "name":"document 8", "dateItem": new Date(2017, 0, 31)},
          {"fldId":4, "id":4, "name":"document 4", "dateItem": new Date(2017, 1, 3)}
    ];
*/
}