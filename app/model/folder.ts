export class Folder {
    id: number;
    name: string;
    isChildren: boolean = false;
    rootId: number;
     
    constructor(id: number, name: string,
                isChildren: boolean = false, rootId: number){
        this.id = id;
        this.name = name;
        this.isChildren = isChildren;
        this.rootId = rootId;
    }
}
