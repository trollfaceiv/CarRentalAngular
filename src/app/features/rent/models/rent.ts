import { User } from "../../user/models/user";
import { Vehicle } from "../../vehicle/models/vehicle.model";

export class Rent{

    id!: number;
    startDate!: Date;
    endDate!: Date;
    car!: Vehicle;
    user!: User;
    approved!: boolean;

    constructor(id:number, startDate:Date, endDate:Date, car:Vehicle, user:User){
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.car = car;
        this.user = user;
        this.approved = false;
    }
}