import { Coupon } from "./coupon";

export class Donor {
    _id!:string;
    name!: string;
    email!: string;
    password!: string;
    pointsEarned!: number;
    role!: 'donor';
    coupons!: Coupon[];

    constructor(email:string, password:string, name:string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.pointsEarned = 0;
        this.role = 'donor';
        this.coupons = [];
    }
}
