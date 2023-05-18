export class Vehicle{

    id!: number;
    factory!: string;
    model!: string;
    plateDate!: string;
    plateNumber!:string;


    constructor(id:number, factory:string, model:string, plateDate:string, plateNumber:string){
        this.id = id;
        this.factory = factory;
        this.model = model;
        this.plateDate = plateDate;
        this.plateNumber = plateNumber;
    }
}