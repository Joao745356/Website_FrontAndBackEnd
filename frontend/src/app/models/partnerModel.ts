export class Partner {
    _id!:string;
    name!: string;
    password!: string;
    email!: string;
    description!: string;
    dateOfRegistry!: Date;
    numberOfDonations: number;
    imageName?: string | null | undefined;
    accepted!: boolean

    constructor(name:string, password:string, email:string, description:string, imagename:string | null | undefined) {
        this.dateOfRegistry = new Date();
        this.numberOfDonations = 0;
        this.description = description;
        this.email = email;
        this.name = name;
        this.password = password;
        this.imageName = imagename;
        this.accepted = false
    }
}
