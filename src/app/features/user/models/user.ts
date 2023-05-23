export class User{
    [key: string]: any;
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    role!: string;
    dateOfBirth!: Date;

    constructor(){
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.role = "";
        this.dateOfBirth = new Date();
    }

    public get Id(): number {
        return this.id;
    }
    public set Id(value: number) {
        this.id = value;
    }
    public get FirstName(): string {
        return this.firstName;
    }
    public set FirstName(value: string) {
        this.firstName = value;
    }
    public get LastName(): string {
        return this.lastName;
    }
    public set LastName(value: string) {
        this.lastName = value;
    }
    public get Email(): string {
        return this.email;
    }
    public set Email(value: string) {
        this.email = value;
    }
    public get Password(): string {
        return this.password;
    }
    public set Password(value: string) {
        this.password = value;
    }
    public get Role(): string {

        return this.role;
    }
    public set Role(value: string) {
        this.role = value;
    }
    public get DateOfBirth(): Date {
        return this.dateOfBirth;
    }
    public set DateOfBirth(value: Date) {
        this.dateOfBirth = value;
    }
    





}