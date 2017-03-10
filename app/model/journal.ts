export class Journal{
    docId: number;
    jid: number;
    entName: string;
    qty: number;
    prc: number;
    sum: number;

    constructor(docId: number, jid: number,
                entName: string, qty: number,
                prc: number, sum: number){
        this.docId = docId;
        this.jid = jid;
        this.entName = entName;
        this.qty = qty;
        this.prc = prc;
        this.sum = sum;
    }    
}