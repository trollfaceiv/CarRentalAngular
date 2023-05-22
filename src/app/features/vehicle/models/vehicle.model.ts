export class Vehicle{
    [key: string]: any;

    id!: number;
    factory!: string;
    model!: string;
    plateDate!: string;
    plateNumber!:string;

    //generate all getters and setter
    public get Id(): number {
        return this.id;
    }
    public set Id(value: number) {
        this.id = value;
    }
    public get Factory(): string {
        return this.factory;
    }
    public set Factory(value: string) {
        this.factory = value;
    }
    public get Model(): string {
        return this.model;
    }
    public set Model(value: string) {
        this.model = value;
    }
    public get PlateDate(): string {
        return this.plateDate;
    }
    public set PlateDate(value: string) {
        this.plateDate = value;

    }
    public get PlateNumber(): string {
        return this.plateNumber;
    }
    public set PlateNumber(value: string) {
        this.plateNumber = value;
    }

    constructor(id:number, factory:string, model:string, plateDate:string, plateNumber:string){
        this.id = id;
        this.factory = factory;
        this.model = model;
        this.plateDate = plateDate;
        this.plateNumber = plateNumber;
    }
}