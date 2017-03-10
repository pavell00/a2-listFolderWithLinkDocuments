export class Document{
    fldId: number;
    id: number;
    docName: string;
    dateItem: string;

    constructor(fldId: number, id: number,
                docName: string, dateItem: string){
        this.fldId = fldId;
        this.id = id;
        this.docName = docName;
        this.dateItem = dateItem;
    }
}