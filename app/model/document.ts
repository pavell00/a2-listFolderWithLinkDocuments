export class Document{
    fldId: number;
    id?: number;
    docName: string;
    dateItem: string;

    constructor(fldId: number, 
                docName: string, dateItem: string, id?: number){
        this.fldId = fldId;
        this.id = id;
        this.docName = docName;
        this.dateItem = dateItem;
    }
}